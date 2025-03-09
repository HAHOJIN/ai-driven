"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { IHeaderProps, INavItem } from "@/types";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

/**
 * 네비게이션 메뉴 항목 정의
 */
const navItems: INavItem[] = [
  { label: "내 갤러리", href: "/gallery", requireAuth: true },
  { label: "이미지 생성", href: "/generate" }
];

/**
 * 헤더 컴포넌트
 * 로고와 네비게이션 메뉴를 포함하는 상단 고정 헤더
 */
export function Header({ className }: IHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  
  /**
   * 모바일 메뉴 토글 함수
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };
  
  /**
   * 현재 경로에 따른 활성화 상태 확인 함수
   */
  const isActive = (href: string) => {
    return pathname === href;
  };

  /**
   * 모바일 메뉴가 열려있을 때 외부 클릭 시 메뉴 닫기
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('nav') && !target.closest('button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);
  
  /**
   * 페이지 이동 시 모바일 메뉴 닫기
   */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /**
   * 네비게이션 링크 렌더링 함수
   */
  const renderNavLink = (item: INavItem) => {
    // 인증이 필요한 항목이고 로그인하지 않은 경우 로그인 버튼 표시
    if (item.requireAuth && !isSignedIn) {
      return (
        <SignInButton mode="modal">
          <Button variant="ghost" className="text-base font-semibold">
            로그인하여 {item.label} 이용하기
          </Button>
        </SignInButton>
      );
    }

    return (
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
    );
  };
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50",
      className
    )}>
      <div className="max-w-7xl mx-auto px-6 md:px-6 h-full flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/HJLogo.png" 
            alt="Artify 로고" 
            width={64} 
            height={64} 
            className="h-16 w-16"
            priority
          />
        </Link>
        
        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.href}>
              {renderNavLink(item)}
            </div>
          ))}
          <div className="pl-4 border-l border-gray-200">
            {isSignedIn ? (
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <Button variant="default" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  로그인
                </Button>
              </SignInButton>
            )}
          </div>
        </nav>
        
        {/* 모바일 메뉴 토글 버튼 */}
        <button
          type="button"
          className="md:hidden p-2"
          onClick={toggleMobileMenu}
          aria-controls="mobile-menu"
          aria-label="메뉴 열기"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden animate-in slide-in-from-top-5 duration-200">
            <nav className="flex flex-col p-4">
              {navItems.map((item) => (
                <div key={item.href} className="py-2">
                  {renderNavLink(item)}
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200">
                {isSignedIn ? (
                  <div className="flex items-center gap-3">
                    <UserButton  />
                    <span className="text-sm text-gray-600">{user?.fullName || user?.username}</span>
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <Button variant="default" className="w-full">
                      <User className="w-4 h-4 mr-2" />
                      로그인
                    </Button>
                  </SignInButton>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 