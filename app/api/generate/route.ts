import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { IGenerateRequest, IGenerateResponse, ERROR_CODES } from "@/types/generate";
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { images, STYLE_TYPES, StyleType } from '@/db/schema';
import { uploadImageToStorage } from '@/utils/storage';
import { createAuthClient } from '@/lib/supabase';

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

// styleOptions.artStyle 값을 데이터베이스 스키마에 맞는 값으로 변환하는 함수
function convertArtStyleToDbStyle(artStyle: string | undefined): StyleType {
  // 기본값은 digital_art
  if (!artStyle) return STYLE_TYPES.DIGITAL_ART;

  // artStyle을 데이터베이스 스키마 값으로 매핑
  const styleMap: Record<string, StyleType> = {
    'digital-art': STYLE_TYPES.DIGITAL_ART,
    'watercolor': STYLE_TYPES.DIGITAL_ART, // 워터컬러는 digital_art로 매핑
    'oil-painting': STYLE_TYPES.DIGITAL_ART, // 오일 페인팅은 digital_art로 매핑
    'pen-drawing': STYLE_TYPES.DIGITAL_ART, // 펜 드로잉은 digital_art로 매핑
    'pencil-sketch': STYLE_TYPES.DIGITAL_ART, // 펜슬 스케치는 digital_art로 매핑
    // 필요시 다른 매핑 추가
  };

  return styleMap[artStyle] || STYLE_TYPES.DIGITAL_ART;
}

export async function POST(req: NextRequest) {
  try {
    // 사용자 인증 확인
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }
    
    // JWT를 사용한 Supabase 클라이언트 생성
    const supabase = await createAuthClient();

    const body = await req.json();
    const { prompt, negativePrompt, styleOptions, width, height, seed } = body;
    
    // styleOptions.artStyle을 데이터베이스 스키마 값으로 변환
    const dbStyle = convertArtStyleToDbStyle(styleOptions?.artStyle);
    
    // AI 서비스를 통해 이미지 생성
    // API 토큰 확인
    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error('REPLICATE_API_TOKEN이 설정되지 않았습니다.');
    }

    // 요청 데이터 파싱
    const requestData: IGenerateRequest = {
      prompt,
      negativePrompt,
      width,
      height,
      seed,
      styleOptions,
      style: dbStyle // 데이터베이스와 호환되는 스타일 값 사용
    };

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
    const finalPrompt = `${stylePrompt} ${requestData.prompt}`;

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

    try {
      // Supabase Storage에 이미지 업로드
      console.log('Supabase Storage에 이미지 업로드 시작...');
      const { path: imagePath, url: storedImageUrl } = await uploadImageToStorage(
        imageUrl,
        userId
      );
      console.log('이미지 업로드 완료. 저장 경로:', imagePath);
      console.log('저장된 이미지 URL:', storedImageUrl);
      
      // 데이터베이스에 이미지 메타데이터 저장
      console.log('데이터베이스에 메타데이터 저장 시작...');
      const [newImage] = await db.insert(images).values({
        imageUrl: storedImageUrl,
        prompt,
        negativePrompt,
        style: dbStyle, // 데이터베이스와 호환되는 스타일 값 사용
        width: width || 512,
        height: height || 512,
        seed: seed ? seed.toString() : null, // seed가 정수형이 아닐 경우 문자열로 변환
        userId,
        storagePath: imagePath
      }).returning();
      console.log('메타데이터 저장 완료. 이미지 ID:', newImage.id);
      
      // 성공 응답 반환
      return NextResponse.json({
        success: true,
        data: {
          imageId: newImage.id,
          imageUrl: storedImageUrl,
          filePath: imagePath  // 파일 경로 추가 (userId/uuid.webp)
        }
      });
    } catch (storageError: any) {
      console.error('이미지 저장 오류:', storageError);
      // 이미지 저장에 실패하더라도 원본 이미지 URL을 반환
      return NextResponse.json({
        success: true,
        data: {
          imageId: Date.now(), // 임시 ID
          imageUrl: imageUrl,  // 원본 이미지 URL
          filePath: null,
          storageError: storageError.message
        }
      });
    }

  } catch (error: any) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: '이미지 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 