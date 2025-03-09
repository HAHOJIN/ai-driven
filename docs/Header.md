## 헤더 컴포넌트 기능명세서

---

### 프론트엔드 기능명세서

#### 1. 컴포넌트 레이아웃 및 디자인 명세

- **파일 위치**: `components/layout/Header.tsx`

1. **로고 섹션**
   - **UI 구성**: 좌측에 배치된 브랜드 로고
   - **로고 이미지**:
     - Next.js의 `Image` 컴포넌트 사용
     - 크기: 높이 32px, 너비는 비율에 맞게 자동 조정
     - 마진: 우측 마진 auto로 설정하여 네비게이션 메뉴와 간격 유지
   - **상호작용**:
     - 클릭 시 메인 페이지(`/`)로 이동
     - 호버 시 커서 스타일: pointer

2. **네비게이션 메뉴 섹션**
   - **UI 구성**: 우측에 배치된 메뉴 링크
   - **메뉴 항목**:
     - '내 갤러리', '이미지 생성' 순서로 배치
     - 각 항목은 Next.js의 `Link` 컴포넌트 사용
     - 폰트: 16px, Semi-Bold
     - 메뉴 간격: 32px
   - **상호작용**:
     - 호버 시 하단에 2px 두께의 메인 색상(#4A90E2) 언더라인 표시
     - 현재 활성화된 메뉴는 메인 색상(#4A90E2)으로 표시
     - 클릭 시 해당 페이지로 이동 ('내 갤러리' → `/gallery`, '이미지 생성' → `/generate`)

3. **전체 레이아웃**
   - **컨테이너**:
     - 높이: 64px
     - 배경색: 흰색(#FFFFFF)
     - 하단 보더: 1px solid #E5E7EB
     - 최대 너비: 1200px
     - 좌우 패딩: 24px
     - position: fixed로 설정하여 스크롤 시에도 상단에 고정
     - z-index: 50으로 설정하여 다른 요소 위에 표시
     - display: flex, justify-content: space-between, align-items: center
   - **반응형 디자인**:
     - 모바일 화면(768px 이하): 로고 크기 축소(24px), 네비게이션 메뉴 아이콘으로 변경
     - 태블릿 화면(768px~1024px): 기본 레이아웃 유지, 좌우 패딩 16px로 축소
     - 데스크탑 화면(1024px 이상): 기본 레이아웃 유지

#### 2. 기능 명세

1. **페이지 내비게이션**
   - **메인 페이지 이동**: 로고 클릭 시 메인 페이지(`/`)로 이동
   - **갤러리 페이지 이동**: '내 갤러리' 메뉴 클릭 시 갤러리 페이지(`/gallery`)로 이동
   - **이미지 생성 페이지 이동**: '이미지 생성' 메뉴 클릭 시 이미지 생성 페이지(`/generate`)로 이동

2. **현재 페이지 표시**
   - **활성화 상태 관리**:
     - 현재 페이지에 해당하는 메뉴 항목을 메인 색상(#4A90E2)으로 표시
     - `usePathname` 훅을 사용하여 현재 경로 확인
     - 현재 경로와 메뉴 항목의 경로가 일치할 경우 활성화 스타일 적용

3. **모바일 반응형 기능**
   - **모바일 메뉴 토글**:
     - 768px 이하 화면에서 햄버거 아이콘 표시
     - 아이콘 클릭 시 모바일 메뉴 표시/숨김 토글
     - 모바일 메뉴는 슬라이드 애니메이션으로 표시

#### 3. 접근성 고려사항

1. **키보드 내비게이션**
   - 모든 메뉴 항목은 탭 키로 접근 가능
   - 포커스 상태 시 시각적 표시 (아웃라인 또는 배경색 변경)

2. **스크린 리더 지원**
   - 모든 네비게이션 링크에 aria-label 속성 추가
   - 현재 페이지 표시를 위한 aria-current 속성 사용
   - 모바일 메뉴 토글 버튼에 aria-expanded 속성 추가

3. **색상 대비**
   - 텍스트와 배경 간 충분한 대비 제공 (WCAG 2.1 AA 기준 준수)
   - 활성화 상태와 비활성화 상태의 명확한 시각적 구분

---

### 인터페이스 정의

```typescript
// 헤더 컴포넌트 Props 인터페이스
export interface IHeaderProps {
  className?: string;
}

// 네비게이션 항목 인터페이스
export interface INavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}
```

---

### 구현 예시 코드

```typescript
// 기본 구조 예시 (실제 구현은 다를 수 있음)
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { IHeaderProps, INavItem } from "@/types";

const navItems: INavItem[] = [
  { label: "내 갤러리", href: "/gallery" },
  { label: "이미지 생성", href: "/generate" }
];

export function Header({ className }: IHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // 모바일 메뉴 토글 함수
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };
  
  // 현재 경로에 따른 활성화 상태 확인 함수
  const isActive = (href: string) => {
    return pathname === href;
  };
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50",
      className
    )}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.svg" 
            alt="Artify 로고" 
            width={32} 
            height={32} 
            className="h-8 w-auto"
          />
        </Link>
        
        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "text-base font-semibold transition-colors hover:text-blue-500 hover:border-b-2 hover:border-blue-500 py-1",
                isActive(item.href) ? "text-blue-500" : "text-gray-700"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* 모바일 메뉴 토글 버튼 */}
        <button
          type="button"
          className="md:hidden p-2"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="메뉴 열기"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden">
            <nav className="flex flex-col p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "py-3 px-4 text-base font-semibold",
                    isActive(item.href) ? "text-blue-500" : "text-gray-700"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 