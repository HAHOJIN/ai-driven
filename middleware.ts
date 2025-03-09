import { authMiddleware } from "@clerk/nextjs";

// 인증이 필요한 경로 설정
export default authMiddleware({
  // 인증이 필요한 경로 패턴
  publicRoutes: [
    "/",
    "/generate",
    "/api/generate"
  ],
  // 인증이 필요한 API 경로 패턴
  ignoredRoutes: [
    "/api/webhook"
  ]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 