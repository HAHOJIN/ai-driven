import { NextResponse } from "next/server";
import Replicate from "replicate";
import { IGenerateRequest, IGenerateResponse, ERROR_CODES } from "@/types/generate";

// Replicate 클라이언트 초기화
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// 스타일 옵션을 Flux 모델 프롬프트로 변환
function convertStyleToFluxPrompt(styleOptions: IGenerateRequest['styleOptions']): string {
  // 스타일 옵션이 없는 경우 기본값 설정
  const options = styleOptions || { artStyle: 'digital-art', colorTone: 'bright' };
  
  const stylePrompts = {
    artStyle: {
      'digital-art': 'digital art style, highly detailed digital painting',
      'watercolor': 'watercolor art style, soft watercolor painting technique',
      'oil-painting': 'oil painting style, textured oil painting technique',
      'pen-drawing': 'pen and ink drawing style, detailed line art',
      'pencil-sketch': 'pencil sketch style, detailed graphite drawing'
    },
    colorTone: {
      'bright': 'bright and vibrant colors, high contrast',
      'dark': 'dark and moody atmosphere, low key lighting',
      'pastel': 'soft pastel colors, gentle tones',
      'black-and-white': 'black and white, monochromatic',
      'colorful': 'rich and colorful palette, vivid colors'
    }
  };

  // 유효한 스타일 값인지 확인하고, 유효하지 않으면 기본값 사용
  const artStyleKey = (options.artStyle && options.artStyle in stylePrompts.artStyle) 
    ? options.artStyle as keyof typeof stylePrompts.artStyle
    : 'digital-art';
  
  const colorToneKey = (options.colorTone && options.colorTone in stylePrompts.colorTone)
    ? options.colorTone as keyof typeof stylePrompts.colorTone
    : 'bright';

  const artStyle = stylePrompts.artStyle[artStyleKey];
  const colorTone = stylePrompts.colorTone[colorToneKey];
  
  return `${artStyle}, ${colorTone}`;
}

export async function POST(request: Request) {
  try {
    // API 토큰 확인
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error('REPLICATE_API_TOKEN이 설정되지 않았습니다.');
    }

    // 요청 데이터 파싱
    const requestData: IGenerateRequest = await request.json();

    // 프롬프트 유효성 검사
    if (!requestData.prompt || requestData.prompt.length > 500) {
      return NextResponse.json({
        success: false,
        error: {
          code: ERROR_CODES.INVALID_PROMPT,
          message: '프롬프트가 누락되었거나 길이가 초과되었습니다.'
        }
      } as IGenerateResponse, { status: 400 });
    }

    // 스타일 옵션 확인 및 기본값 설정
    if (!requestData.styleOptions) {
      requestData.styleOptions = {
        artStyle: 'digital-art',
        colorTone: 'bright'
      };
    }

    // 스타일 프롬프트 생성 및 결합
    const stylePrompt = convertStyleToFluxPrompt(requestData.styleOptions);
    const finalPrompt = `${requestData.prompt}, ${stylePrompt}`;

    console.log('생성 프롬프트:', finalPrompt);
    console.log('스타일 옵션:', requestData.styleOptions);

    // Flux 모델 설정
    const modelSettings = {
      prompt: finalPrompt,
      go_fast: true,
      megapixels: "1",
      num_outputs: 1,
      aspect_ratio: "16:9",
      output_format: "webp",
      output_quality: 80,
      num_inference_steps: 4,
      disable_safety_checker: false
    };

    console.log('API 요청 설정:', modelSettings);

    // Replicate API 호출 및 prediction 생성
    let prediction = await replicate.predictions.create({
      model: "black-forest-labs/flux-schnell",
      input: modelSettings,
    });

    console.log('초기 prediction:', prediction);

    // prediction이 완료될 때까지 대기
    while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
      prediction = await replicate.predictions.get(prediction.id);
      console.log('prediction 상태:', prediction.status);
    }

    console.log('최종 prediction:', prediction);

    // 실패 상태 확인
    if (prediction.status === 'failed') {
      throw new Error(typeof prediction.error === 'string' ? prediction.error : '이미지 생성에 실패했습니다.');
    }

    // 이미지 URL 확인 및 응답
    if (!prediction.output) {
      console.error('API 응답에 output이 없음:', prediction);
      throw new Error('이미지 생성에 실패했습니다.');
    }

    const imageUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
    console.log('생성된 이미지 URL:', imageUrl);

    return NextResponse.json({
      success: true,
      imageUrl
    } as IGenerateResponse, { status: 201 });

  } catch (error) {
    console.error('이미지 생성 에러:', error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: ERROR_CODES.GENERATION_FAILED,
        message: error instanceof Error ? error.message : '이미지 생성에 실패했습니다.'
      }
    } as IGenerateResponse, { status: 500 });
  }
} 