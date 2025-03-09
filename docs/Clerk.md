# Next.js와 Clerk 인증 시스템 연동하기

## 1. Clerk 패키지 설치

  ```bash
  npm install @clerk/nextjs
  ```

## 2. 환경 변수 설정
`.env.local` 파일을 생성하고 Clerk 대시보드에서 발급받은 키를 추가합니다.

  ```env
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
  CLERK_SECRET_KEY=your_secret_key
  ```

## 3. Middleware 설정
프로젝트 루트에 `middleware.ts` 파일을 생성하여 인증 미들웨어를 설정합니다.

  ```typescript
  import { clerkMiddleware } from '@clerk/nextjs/server'

  export default clerkMiddleware()

  export const config = {
    matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
    ],
  }
  ```

## 4. ClerkProvider 설정
`app/layout.tsx` 파일에 ClerkProvider를 추가합니다.

  ```typescript
  import { ClerkProvider } from '@clerk/nextjs'

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <ClerkProvider afterSignOutUrl="/">
        <html lang="en">
          <body>{children}</body>
        </html>
      </ClerkProvider>
    )
  }
  ```

## 5. 인증 컴포넌트 사용 예시
페이지에서 Clerk 컴포넌트와 훅을 사용하는 예시입니다.

  ```typescript
  import { auth, currentUser } from "@clerk/nextjs/server";
  import { UserButton, SignInButton } from "@clerk/nextjs";

  export default async function Home() {
    const { userId } = await auth();
    const user = await currentUser();
    
    return (
      <div>
        {/* 유저 프로필 버튼 */}
        <UserButton />
        
        {userId ? (
          <div>
            <h1>환영합니다, {user?.firstName}님!</h1>
          </div>
        ) : (
          <div>
            <SignInButton mode="modal">
              <button>로그인하기</button>
            </SignInButton>
          </div>
        )}
      </div>
    );
  }
  ```

## 6. 주요 Clerk 컴포넌트

- `UserButton`: 사용자 프로필 및 로그아웃 버튼
- `SignInButton`: 로그인 버튼
- `SignUpButton`: 회원가입 버튼
- `SignedIn`: 로그인된 사용자에게만 보이는 컨텐츠 래퍼
- `SignedOut`: 로그인하지 않은 사용자에게만 보이는 컨텐츠 래퍼

## 7. 서버 컴포넌트에서 사용자 정보 가져오기

  ```typescript
  import { auth, currentUser } from "@clerk/nextjs/server";

  export default async function ServerComponent() {
    const { userId } = await auth();
    const user = await currentUser();
    // ...
  }
  ```

## 8. 클라이언트 컴포넌트에서 사용자 정보 가져오기

  ```typescript
  'use client';
  import { useUser } from "@clerk/nextjs";

  export default function ClientComponent() {
    const { user } = useUser();
    // ...
  }
  ```

## 주의사항

1. 환경 변수는 반드시 `.gitignore`에 포함시켜 보안을 유지해야 합니다.
2. 서버 컴포넌트와 클라이언트 컴포넌트에서 사용하는 import 경로가 다릅니다.
3. 보호가 필요한 API 라우트는 반드시 미들웨어를 통해 보호해야 합니다. 