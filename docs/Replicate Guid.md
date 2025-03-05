# Replicate Flux 모델 연동 가이드

이 가이드는 Next.js 프로젝트에서 Replicate의 Flux 모델을 사용하는 방법을 설명합니다.

## 목차

1. [사전 준비사항](#사전-준비사항)
2. [프로젝트 설정](#프로젝트-설정)
3. [타입 정의](#타입-정의)
4. [API 엔드포인트 구현](#api-엔드포인트-구현)
5. [프론트엔드 구현](#프론트엔드-구현)
6. [환경 변수 설정](#환경-변수-설정)
7. [사용 예제](#사용-예제)

## 사전 준비사항

- Node.js 설치 (18.x 이상 권장)
- Replicate 계정 및 API 토큰
- TypeScript 기반의 Next.js 프로젝트

## 프로젝트 설정

1. Next.js 프로젝트 생성:
```bash
npx create-next-app@latest my-app --typescript --eslint
cd my-app
```

2. 필요한 패키지 설치:
```bash
npm install replicate
```

3. tsconfig.json 설정:
```json
{
  "compilerOptions": {
    // ... 기존 설정 ...
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "@/*": ["./*"]
    },
    "baseUrl": "."
  }
}
```

4. next.config.ts 설정:
    ```json
    import type { NextConfig } from "next";

    const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: "https",
            hostname: "replicate.com",
        },
        {
            protocol: "https",
            hostname: "replicate.delivery",
        },
        ],
    },
    };

    export default nextConfig;
```

## 타입 정의

`types/flux.ts` 파일 생성:

```typescript
export interface FluxModelInput {
  // 필수 파라미터
  prompt: string;

  // 선택적 파라미터
  seed?: number;
  go_fast?: boolean;
  megapixels?: "1" | "0.25";
  num_outputs?: number;
  aspect_ratio?: "1:1" | "16:9" | "21:9" | "3:2" | "2:3" | "4:5" | "5:4" | "3:4" | "4:3" | "9:16" | "9:21";
  output_format?: "webp" | "jpg" | "png";
  output_quality?: number;
  num_inference_steps?: number;
  disable_safety_checker?: boolean;
}

export const DEFAULT_FLUX_OPTIONS: Partial<FluxModelInput> = {
  go_fast: true,
  megapixels: "1",
  num_outputs: 1,
  aspect_ratio: "1:1",
  output_format: "webp",
  output_quality: 80,
  num_inference_steps: 4,
  disable_safety_checker: false
} as const;
```

## API 엔드포인트 구현

`app/api/predictions/route.ts` 파일 생성:

```typescript
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { FluxModelInput, DEFAULT_FLUX_OPTIONS } from "@/types/flux";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: Request) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error('REPLICATE_API_TOKEN 환경 변수가 설정되지 않았습니다.');
  }

  const requestData: FluxModelInput = await request.json();

  try {
    const modelInput = {
      ...DEFAULT_FLUX_OPTIONS,
      ...requestData
    };

    const prediction = await replicate.predictions.create({
      model: "black-forest-labs/flux-schnell",
      input: modelInput
    });
    
    return NextResponse.json(prediction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다." }, 
      { status: 500 }
    );
  }
}
```

## 환경 변수 설정

1. `.env.local` 파일 생성:
```
REPLICATE_API_TOKEN=your_token_here
```

2. `types/env.d.ts` 파일 생성:
```typescript
declare namespace NodeJS {
  interface ProcessEnv {
    REPLICATE_API_TOKEN: string;
  }
}
```

## 사용 예제

```typescript
// 기본적인 이미지 생성 요청
const response = await fetch("/api/predictions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: "A beautiful sunset over the ocean",
  }),
});

// 상세 옵션을 포함한 요청
const response = await fetch("/api/predictions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: "A beautiful sunset over the ocean",
    aspect_ratio: "16:9",
    num_outputs: 2,
    output_format: "png",
    num_inference_steps: 4,
  }),
});
```

## Flux 모델 파라미터 설명

- `prompt` (필수): 생성할 이미지에 대한 설명
- `seed`: 이미지 생성을 위한 랜덤 시드 값
- `go_fast`: 빠른 생성을 위한 최적화 모드 (기본값: true)
- `megapixels`: 생성될 이미지의 메가픽셀 ("1" 또는 "0.25")
- `num_outputs`: 생성할 이미지 수 (1-4)
- `aspect_ratio`: 이미지 비율 (예: "1:1", "16:9" 등)
- `output_format`: 출력 이미지 형식 ("webp", "jpg", "png")
- `output_quality`: 이미지 품질 (0-100)
- `num_inference_steps`: 추론 단계 수 (1-4)
- `disable_safety_checker`: 안전성 검사 비활성화 여부

## 주의사항

1. API 토큰 보안:
   - `.env.local` 파일을 `.gitignore`에 추가
   - 프로덕션 환경에서 적절한 환경 변수 관리

2. 에러 처리:
   - API 요청 실패에 대한 적절한 에러 처리
   - 사용자에게 친숙한 에러 메시지 제공

3. 성능 최적화:
   - 이미지 생성 중 로딩 상태 표시
   - 적절한 캐싱 전략 수립

## 참고 자료

- [Replicate 공식 문서](https://replicate.com/docs)
- [Flux Schnell 모델](https://replicate.com/black-forest-labs/flux-schnell)
- [Next.js 공식 문서](https://nextjs.org/docs)
