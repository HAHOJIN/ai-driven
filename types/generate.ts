// 이미지 생성 요청 인터페이스
export interface IGenerateRequest {
  prompt: string;
  styleOptions: {
    artStyle: string;  // digital-art, watercolor, oil-painting, pen-drawing, pencil-sketch
    colorTone: string; // bright, dark, pastel, black-and-white, colorful
  }
}

// 이미지 생성 응답 인터페이스
export interface IGenerateResponse {
  success: boolean;
  imageUrl?: string;
  error?: {
    code: string;
    message: string;
  }
}

// 에러 코드 상수
export const ERROR_CODES = {
  INVALID_PROMPT: 'INVALID_PROMPT',
  GENERATION_FAILED: 'GENERATION_FAILED',
  SAVE_FAILED: 'SAVE_FAILED',
  DOWNLOAD_FAILED: 'DOWNLOAD_FAILED'
} as const;

// Flux 모델 기본 설정
export const DEFAULT_FLUX_OPTIONS = {
  go_fast: true,
  megapixels: "1",
  num_outputs: 1,
  aspect_ratio: "1:1",
  output_format: "webp",
  output_quality: 80,
  num_inference_steps: 4,
  disable_safety_checker: false
} as const; 