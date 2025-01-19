# 갤러리 & 공유 기능 명세서

## 1. 개요
사용자가 생성한 이미지를 관리하고 공유할 수 있는 갤러리 기능을 구현합니다.

## 2. 사용자 흐름 및 상호작용

### 갤러리 화면
1. 사용자는 자신이 생성한 모든 이미지를 그리드 형태로 볼 수 있습니다.
2. 각 이미지 카드에는 다음 정보가 표시됩니다:
   - 생성 날짜 (YYYY. M. D. 형식)
   - 공개/비공개 상태 (색상으로 구분)
   - 태그 목록 (최대 3개)
3. 이미지 카드 호버 시 다음 액션 버튼이 표시됩니다:
   - 공유하기
   - 다운로드
   - 수정하기
   - 삭제하기
4. 이미지 카드 클릭 시 상세 모달이 열립니다.

### 필터링 및 정렬
1. 다음 기준으로 이미지를 필터링할 수 있습니다:
   - 프롬프트 검색 (실시간 필터링)
   - 카테고리 선택 (전체/동물/풍경/인물)
   - 날짜 범위 선택 (2개월 달력)
   - 공개/비공개 상태 (전체/공개/비공개)
2. 정렬 옵션:
   - 최신순 (기본값)
   - 오래된순
3. 필터 초기화 버튼으로 모든 필터를 리셋할 수 있습니다.
4. 현재 검색 결과 개수가 표시됩니다.

### 상세 모달
1. 이미지와 함께 다음 정보를 표시합니다:
   - 프롬프트
   - 스타일 옵션 (아트 스타일, 색조)
   - 태그 목록 (전체)
2. 액션 버튼:
   - 공유하기 (모달 전환)
   - 수정하기 (모달 전환)
   - 삭제하기 (확인 모달)

### 수정 모달
1. 다음 정보를 수정할 수 있습니다:
   - 프롬프트
   - 카테고리
   - 태그 (개별 추가/삭제)
   - 공개/비공개 설정 (토글)
2. 취소/저장 버튼으로 변경사항을 관리합니다.

### 삭제 기능
1. 삭제 버튼 클릭 시 확인 모달이 표시됩니다.
2. 삭제 완료 시 토스트 메시지로 알림을 표시합니다. (3초)
3. 삭제 후 목록이 자동으로 업데이트됩니다.

## 3. 프론트엔드 기술 명세

### 컴포넌트 구조
```
components/gallery/
├── GalleryGrid.tsx        # 이미지 그리드 컴포넌트
├── ImageDetailModal.tsx   # 상세 정보 모달
├── EditImageModal.tsx     # 수정 모달
├── ShareModal.tsx         # 공유 모달
└── DeleteConfirmModal.tsx # 삭제 확인 모달
```

### 상태 관리
1. 필터 상태:
   - searchQuery: string
   - selectedCategory: string
   - dateRange: DateRange | undefined
   - publicFilter: string
   - sortBy: string

2. 모달 상태:
   - isDetailModalOpen: boolean
   - isEditModalOpen: boolean
   - isShareModalOpen: boolean
   - isDeleteModalOpen: boolean

3. 데이터 상태:
   - selectedImage: IGalleryImage | null
   - imageToDelete: IGalleryImage | null
   - images: IGalleryImage[]

### UI/UX 요구사항
1. 반응형 그리드 레이아웃:
   - 모바일: 1열
   - 태블릿: 2열
   - 데스크톱: 3열
   - 와이드: 4열
2. 호버 효과:
   - 이미지 스케일 업 (1.05)
   - 액션 버튼 오버레이 (fade in)
3. 모달:
   - 중앙 정렬
   - 백드롭 클릭으로 닫기
   - 최대 너비 제한
4. 알림:
   - 토스트 메시지 (3초 후 자동 사라짐)
   - 하단 중앙 위치

## 4. 백엔드 API 명세

### 이미지 목록 조회
```typescript
GET /api/gallery
Query Parameters: {
  search?: string
  category?: string
  startDate?: string
  endDate?: string
  isPublic?: boolean
  sortBy?: 'newest' | 'oldest'
  page?: number
  limit?: number
}
Response: IGalleryResponse
```

### 이미지 수정
```typescript
PATCH /api/gallery/:imageId
Request Body: {
  prompt?: string
  category?: string
  tags?: string[]
  isPublic?: boolean
}
Response: IGalleryImage
```

### 이미지 삭제
```typescript
DELETE /api/gallery/:imageId
Response: {
  success: boolean
  message?: string
}
```

### 이미지 공유
```typescript
POST /api/gallery/share
Request Body: {
  imageId: string
  title: string
  description: string
  tags: string[]
  isPublic: boolean
}
Response: {
  success: boolean
  postId?: string
  error?: string
}
```

## 5. 데이터 모델
```typescript
interface IGalleryImage {
  id: string
  imageUrl: string
  prompt: string
  styleOptions: {
    artStyle: string
    colorTone: string
  }
  category: string
  tags: string[]
  createdAt: string
  updatedAt?: string
  userId?: string
  isPublic?: boolean
}

interface IGalleryResponse {
  images: IGalleryImage[]
  totalCount: number
}
```

## 6. 에러 처리
```typescript
interface IErrorResponse {
  success: false
  error: {
    code: string
    message: string
  }
}

// 에러 코드
const ERROR_CODES = {
  NOT_FOUND: '이미지를 찾을 수 없습니다.',
  UNAUTHORIZED: '권한이 없습니다.',
  INVALID_REQUEST: '잘못된 요청입니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다.'
}
```

## 7. 보안
1. 인증:
   - 모든 API 요청에 인증 토큰 필요
   - 비인증 사용자는 갤러리 접근 불가
2. 권한:
   - 자신의 이미지만 수정/삭제 가능
   - 공개 설정된 이미지만 공유 가능
3. 입력 검증:
   - XSS 방지를 위한 입력값 sanitize
   - 파일 크기 및 형식 제한 

## 갤러리 관리 및 커뮤니티 공유 화면 기능명세서

### 프론트엔드 기능명세서

#### 1. 화면 레이아웃 및 디자인 명세

##### 갤러리 페이지
**파일 위치**: `app/gallery/page.tsx`
**화면 구성**:
- 상단: 필터링 및 검색 섹션
- 중앙: 이미지 그리드
- 하단: 검색 결과 카운트

##### 이미지 그리드 컴포넌트
**파일 위치**: `components/gallery/GalleryGrid.tsx`
**주요 기능**:
- 반응형 그리드 레이아웃 (1~4열)
- 이미지 카드 호버 효과
- 액션 버튼 오버레이

##### 이미지 상세 모달
**파일 위치**: `components/gallery/ImageDetailModal.tsx`
**주요 기능**:
- 이미지 상세 정보 표시
- 공유/수정/삭제 액션 버튼
- 모달 닫기

##### 이미지 수정 모달
**파일 위치**: `components/gallery/EditImageModal.tsx`
**주요 기능**:
- 프롬프트 수정
- 카테고리 선택
- 태그 관리
- 공개 설정

##### 삭제 확인 모달
**파일 위치**: `components/gallery/DeleteConfirmModal.tsx`
**주요 기능**:
- 삭제 확인 메시지
- 취소/확인 버튼
- 토스트 알림

#### 2. 사용자 흐름 및 상호작용

##### 이미지 필터링 프로세스
**구현 위치**: `app/gallery/page.tsx`
**주요 기능**:
1. 프롬프트 검색
2. 카테고리 필터링
3. 날짜 범위 선택
4. 공개 상태 필터링
5. 정렬 옵션 적용
6. 필터 초기화

##### 이미지 관리 프로세스
**구현 위치**: `components/gallery/GalleryGrid.tsx`
**주요 기능**:
1. 이미지 카드 표시
2. 호버 액션 버튼
3. 상세 모달 열기
4. 수정/삭제 기능

##### 이미지 삭제 프로세스
**구현 위치**: `components/gallery/DeleteConfirmModal.tsx`
**주요 기능**:
1. 삭제 확인
2. 토스트 알림
3. 목록 업데이트

### 백엔드 기능명세서

#### 1. API 엔드포인트

##### 이미지 목록 조회 API
**파일 위치**: `app/api/gallery/route.ts`
**HTTP Method**: GET
**응답 데이터**: IGalleryResponse

##### 이미지 수정 API
**파일 위치**: `app/api/gallery/[imageId]/route.ts`
**HTTP Method**: PATCH
**요청 데이터**: IUpdateImageRequest

##### 이미지 삭제 API
**파일 위치**: `app/api/gallery/[imageId]/route.ts`
**HTTP Method**: DELETE
**응답 데이터**: { success: boolean }

#### 2. 데이터베이스 스키마

##### GalleryImage 테이블
**파일 위치**: `db/schema.ts`
**스키마 정의**:
```typescript
interface IGalleryImage {
  id: string
  imageUrl: string
  prompt: string
  styleOptions: {
    artStyle: string
    colorTone: string
  }
  category: string
  tags: string[]
  createdAt: string
  updatedAt?: string
  userId?: string
  isPublic?: boolean
}
```

#### 3. 보안 및 권한 관리

##### 인증 미들웨어
**파일 위치**: `middleware.ts`
**주요 기능**:
1. 토큰 검증
2. 권한 확인
3. API 요청 보호

##### 에러 처리
**파일 위치**: `utils/error.ts`
**주요 기능**:
1. 에러 코드 정의
2. 에러 응답 포맷
3. 예외 처리 