## 갤러리 관리 및 커뮤니티 공유 화면 기능명세서

---

### 프론트엔드 기능명세서

#### 1. 화면 레이아웃 및 디자인 명세

- **파일 위치**: `app/gallery/page.tsx`

1. **갤러리 관리 섹션**
   - **파일 위치**: `components/gallery/GalleryGrid.tsx`
   - **UI 구성**: 
     - 그리드 형태의 이미지 레이아웃 (반응형)
     - 각 이미지 카드는 1:1 비율 유지
     - 이미지 호버 시 액션 버튼 오버레이 표시
   - **이미지 카드 구성**:
     - 썸네일 이미지 (Next.js Image 컴포넌트)
     - 호버 시 표시되는 액션 버튼들:
       - 공유하기 (Share2 아이콘)
       - 다운로드 (Download 아이콘)
       - 삭제 (Trash2 아이콘)
       - 수정 (Pencil 아이콘)
   - **필터링 및 정렬**:
     - 카테고리별 필터 (ShadcN의 `Select` 컴포넌트)
     - 날짜/좋아요 수 기준 정렬 옵션
     - 검색 기능 (프롬프트 기준)

2. **이미지 상세 모달**
   - **파일 위치**: `components/gallery/ImageDetailModal.tsx`
   - **UI 구성**:
     - 큰 이미지 프리뷰
     - 프롬프트 정보
     - 생성 날짜
     - 스타일 옵션 정보
     - 액션 버튼들 (공유, 다운로드, 삭제)
   - **상호작용**:
     - ESC 키 또는 외부 영역 클릭으로 모달 닫기
     - 이미지 확대/축소 가능
     - 이미지 다운로드
     - 공개 설정 변경
     - 카테고리 및 태그 수정
     - 삭제 확인 다이얼로그

3. **커뮤니티 공유 모달**
   - **파일 위치**: `components/gallery/ShareModal.tsx`
   - **UI 구성**:
     - 이미지 프리뷰
     - 제목 입력 필드 (ShadcN의 `Input` 컴포넌트)
     - 설명 입력 필드 (ShadcN의 `Textarea` 컴포넌트)
     - 태그 입력 필드 (ShadcN의 `Input` 컴포넌트, 콤마로 구분)
     - 공개 여부 토글 (ShadcN의 `Switch` 컴포넌트)
     - 공유하기 버튼
   - **입력 필드 제한**:
     - 제목: 최대 100자
     - 설명: 최대 500자
     - 태그: 최대 10개

4. **이미지 편집 모달**
   - **파일 위치**: `components/gallery/EditImageModal.tsx`
   - **UI 구성**:
     - 프롬프트 수정 필드
     - 카테고리 수정 (Select)
     - 태그 수정
     - 저장 버튼

#### 2. 사용자 흐름 및 상호작용

1. **갤러리 관리 프로세스**
   ```
   갤러리 진입 → 이미지 그리드 표시 → 필터/정렬 적용 
   → 이미지 선택 → 상세 모달 표시 → 액션 수행
   ```

2. **커뮤니티 공유 프로세스**
   ```
   이미지 선택 → 공유 버튼 클릭 → 공유 모달 표시 
   → 정보 입력 → 공유하기 → 완료 토스트 메시지
   ```

---

### 백엔드 기능명세서

#### 1. 갤러리 이미지 관리 API

- **파일 위치**: `app/api/gallery/route.ts`
- **HTTP 메서드**: 
  - `GET`: 갤러리 이미지 목록 조회
  - `DELETE`: 이미지 삭제
  - `PATCH`: 이미지 정보 수정
- **요청/응답 데이터**:
  ```typescript
  // GET 응답
  interface IGalleryResponse {
    images: {
      id: string;
      imageUrl: string;
      prompt: string;
      styleOptions: {
        artStyle: string;
        colorTone: string;
      };
      category: string;
      tags: string[];
      createdAt: string;
    }[];
    totalCount: number;
  }

  // PATCH 요청
  interface IUpdateImageRequest {
    id: string;
    prompt?: string;
    category?: string;
    tags?: string[];
  }

  // DELETE 요청
  interface IDeleteImageRequest {
    id: string;
  }
  ```

#### 2. 커뮤니티 공유 API

- **파일 위치**: `app/api/community/share/route.ts`
- **HTTP 메서드**: `POST`
- **요청 데이터**:
  ```typescript
  interface IShareRequest {
    imageId: string;
    title: string;
    description: string;
    tags: string[];
    isPublic: boolean;
  }
  ```
- **응답 데이터**:
  ```typescript
  interface IShareResponse {
    success: boolean;
    postId?: string;
    error?: string;
  }
  ```

#### 3. 데이터베이스 스키마

```typescript
// GalleryImage 테이블
{
  id: string;
  userId: string;
  imageUrl: string;
  prompt: string;
  styleOptions: {
    artStyle: string;
    colorTone: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// CommunityPost 테이블
{
  id: string;
  imageId: string;
  userId: string;
  title: string;
  description: string;
  tags: string[];
  isPublic: boolean;
  likes: number;
  comments: number;
  createdAt: string;
}
```

#### 4. 에러 처리

- **에러 코드**:
  - `IMAGE_NOT_FOUND`: 이미지를 찾을 수 없음
  - `UNAUTHORIZED`: 권한 없음
  - `INVALID_INPUT`: 잘못된 입력값
  - `SHARE_FAILED`: 공유 실패
  - `UPDATE_FAILED`: 수정 실패
  - `DELETE_FAILED`: 삭제 실패

- **에러 응답 형식**:
  ```typescript
  interface IErrorResponse {
    success: false;
    error: {
      code: string;
      message: string;
    }
  }
  ``` 