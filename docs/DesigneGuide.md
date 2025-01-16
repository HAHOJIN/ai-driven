## Artify 디자인 가이드

---

### 1. 디자인 컨셉 및 원칙

**디자인 철학**  
Artify는 누구나 쉽게 창작하고 커뮤니티와 소통할 수 있는 AI 기반 이미지 생성 플랫폼입니다. 사용자들이 복잡한 과정 없이 간단히 이미지를 생성하고 공유할 수 있도록 직관적이고 접근성 높은 UI를 제공하며, 창의적이고 세련된 느낌을 주도록 디자인합니다.

**사용자 경험 목표**  
1. **간편한 접근성**: 메인 화면에서 간단한 프롬프트로 이미지 생성 가능.
2. **창의적 표현 지원**: 이미지 생성 시 세부 스타일 옵션 제공으로 다양한 시각적 표현 가능.
3. **커뮤니티 상호작용 강화**: 커뮤니티 피드를 통해 사용자 간의 피드백과 소통을 원활하게 지원.

**접근성 고려사항**  
- **명확한 대비와 직관적인 네비게이션**: 버튼과 텍스트의 색상 대비를 명확히 하여 접근성을 강화.
- **키보드 내비게이션 지원**: 모든 주요 기능을 키보드로 탐색 가능하도록 설정.

---

### 2. 사용자 흐름 및 화면 구성

#### 사용자 흐름

1. **메인 화면**: 간단한 프롬프트 입력으로 이미지 생성 가능, 하단에 커뮤니티 피드 표시.
2. **이미지 생성 화면**: 스타일 옵션 선택 후 이미지 생성.
3. **갤러리 관리 및 커뮤니티 공유**: 생성된 이미지를 갤러리에 저장하거나 커뮤니티에 게시.

#### 화면별 구성

**1. 메인 화면**
- **프롬프트 입력 섹션**: 화면 상단 중앙에 간단한 프롬프트 입력 필드를 배치해 사용자들이 쉽게 접근할 수 있도록 합니다.
- **이미지 생성 버튼**: 프롬프트 필드 바로 아래에 '이미지 생성' 버튼을 배치해 한 번의 클릭으로 생성 과정을 시작할 수 있게 합니다.
- **커뮤니티 피드**: 프롬프트 섹션 하단에는 최신 커뮤니티 이미지와 인기 게시물을 볼 수 있는 카드형 레이아웃의 피드를 배치해 타 사용자와 소통을 촉진합니다.
  - 각 피드 카드는 클릭 가능하며, 클릭 시 해당 게시물의 상세 화면으로 이동합니다.

**2. 피드 상세 화면**
- **이미지 섹션**: 상단에 생성된 이미지를 큰 크기로 표시합니다.
- **작성자 정보**: 이미지 아래에 프로필 이미지, 사용자명, 작성 시간을 표시합니다.
- **상호작용 섹션**: 좋아요, 댓글, 스크랩 버튼과 각각의 카운트를 표시합니다.
- **프롬프트 정보**: 이미지 생성에 사용된 프롬프트와 스타일 옵션을 확인할 수 있습니다.
- **댓글 섹션**: 하단에 댓글 목록과 댓글 작성 입력 필드를 배치합니다.
  - 댓글은 시간순으로 정렬되며, 답글 기능을 지원합니다.
  - 댓글 작성자는 자신의 댓글을 수정하거나 삭제할 수 있습니다.

**3. 이미지 생성 화면**
- **프롬프트 입력 필드 및 스타일 옵션 선택**: 프롬프트 입력 필드 아래에 스타일(예: 색감, 텍스처, 분위기 등) 옵션을 선택할 수 있는 드롭다운 메뉴와 슬라이더를 추가해 사용자가 원하는 시각적 결과를 상세하게 조정할 수 있도록 합니다.
- **생성 버튼**: 세부 옵션을 설정한 후 ‘생성’ 버튼을 눌러 이미지를 생성할 수 있습니다.
- **로딩 애니메이션**: 이미지 생성 중간에 로딩 애니메이션(회전하는 로딩 아이콘)을 배치해 진행 상태를 직관적으로 제공합니다.

**3. 갤러리 관리 및 커뮤니티 공유 화면**
- **갤러리 관리**: 생성한 이미지를 정리할 수 있는 개인 갤러리로, 카테고리와 태그를 추가하여 정리 가능.
- **커뮤니티 공유 기능**: 갤러리에서 이미지 선택 후 ‘공유하기’ 버튼을 통해 게시물 작성 화면으로 이동해, 제목과 설명을 추가하고 게시물로 업로드.

---

### 3. UI 컴포넌트 가이드

**1. 헤더**
   - **로고**: 좌측에 배치하며, 브랜드 아이덴티티를 반영한 로고 이미지 사용
     - 크기: 높이 32px, 너비는 비율에 맞게 자동 조정
     - 클릭 시 메인 페이지로 이동
   - **네비게이션 메뉴**: 우측에 배치
     - '이미지 생성', '내 갤러리' 순서로 배치
     - 폰트: 16px, Semi-Bold
     - 메뉴 간격: 32px
     - 호버 시 하단에 2px 두께의 메인 색상(#4A90E2) 언더라인 표시
   - **전체 레이아웃**
     - 높이: 64px
     - 배경색: 흰색(#FFFFFF)
     - 하단 보더: 1px solid #E5E7EB
     - 최대 너비: 1200px
     - 좌우 패딩: 24px
     - position: fixed로 설정하여 스크롤 시에도 상단에 고정

**2. 버튼**
   - **이미지 생성 버튼 (메인 화면)**: 원형 또는 직사각형으로 디자인해 메인 화면의 시각적 중심이 되도록 함. 브랜드 메인 색상(#4A90E2)으로 설정하고, 텍스트는 흰색.
   - **상태별 디자인**: 기본(파란색), 호버(짙은 파란색), 비활성화(회색).
   - **생성 버튼 (이미지 생성 화면)**: 스타일 설정 후 생성 가능하도록 표시하며, 메인 버튼과 같은 스타일 사용.

**3. 입력 필드**
   - **프롬프트 입력 필드**: 간결하고 직관적인 디자인으로, 회색 배경에 테두리를 없애 사용자가 쉽게 입력할 수 있도록 함.
   - **스타일 옵션 필드**: 드롭다운과 슬라이더 형식으로 옵션 선택. 간단한 아이콘과 함께 사용하여 시각적 피드백 제공.

**4. 카드 컴포넌트**
   - **커뮤니티 피드 이미지 카드**: 이미지 썸네일, 사용자명, 좋아요/댓글/스크랩 아이콘을 포함한 카드형 레이아웃.
   - **상태별 디자인**: 호버 시 그림자와 확대 효과로 인터랙션을 강조하여 클릭 유도를 높임.

---

### 4. 인터랙션 및 애니메이션

**1. 프롬프트 입력 및 이미지 생성**  
   - **메인 화면**에서 프롬프트 입력과 이미지 생성이 직관적이고 간편하게 수행될 수 있도록 버튼에 클릭 애니메이션을 추가하여 시각적 피드백 제공.
   - **로딩 애니메이션**: 이미지 생성 시 회전 아이콘으로 진행 상황을 알려 사용자 경험 개선.

**2. 커뮤니티 상호작용**  
   - **좋아요, 스크랩**: 아이콘 클릭 시 짧은 확대 및 축소 애니메이션으로 사용자 상호작용에 대한 피드백 제공.
   - **페이지 전환 애니메이션**: 페이드 효과로 페이지 전환의 자연스러움 향상.

---

### 5. 비주얼 스타일 가이드

**색상 팔레트**
   - **메인 색상**: 브랜드 메인 색상(#4A90E2) - 주요 버튼, 액션 강조.
   - **보조 색상**: 회색(#F0F0F0) - 배경 및 보조 텍스트.
   - **알림 색상**: 빨간색(#FF5A5A) - 오류 메시지, 초록색(#5AC18E) - 성공 알림.

**타이포그래피**
   - **폰트**: 현대적이고 깔끔한 Sans-serif 폰트.
   - **텍스트 계층 구조**: 
     - 제목(24pt, Bold) - 메인 화면 프롬프트와 같은 주요 요소.
     - 부제목(18pt, Semi-Bold) - 설명과 보조 텍스트.
     - 본문(14pt, Regular) - 일반 텍스트와 피드 설명.

**아이콘 및 이미지 스타일**
   - **아이콘 세트**: 간결한 두께와 라인의 아이콘 사용으로 일관성 유지.
   - **이미지 스타일**: 커뮤니티 피드와 갤러리 이미지는 1:1 비율 썸네일로 표시.

--- 

### 6. 알림 및 오류 메시지

- **성공 알림**: 이미지 생성 및 저장 완료 시 “갤러리에 저장되었습니다” 알림.
- **오류 메시지**: 이미지 생성 실패 시 “다시 시도해 주세요” 빨간색 강조 표시.