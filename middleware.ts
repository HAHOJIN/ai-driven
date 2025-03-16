import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// 공개 접근 가능한 경로 정의
const isPublicRoute = createRouteMatcher([
  '/',                   // 메인 페이지
  '/sign-in(.*)',        // 로그인 페이지
  '/sign-up(.*)',        // 회원가입 페이지
  '/_next/(.*)',         // Next.js 내부 경로
  '/favicon.ico',        // 파비콘
  '/fonts(.*)',
  '/images(.*)',
  '/api/webhook(.*)',
  
  
  
  
])

export default clerkMiddleware(async (auth, req) => {
  // 공개 경로가 아닌 경우 인증 필요
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Next.js 내부 파일과 정적 파일 제외
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // API 라우트는 항상 실행
    '/(api|trpc)(.*)',
  ],
}; 