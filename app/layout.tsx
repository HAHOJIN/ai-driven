import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/layout/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Artify - AI 이미지 생성 플랫폼",
  description: "AI를 활용한 이미지 생성 및 갤러리 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="ko">
        <body
          className={`${geistSans.variable} antialiased`}
        >
          <Header />
          <main className="pt-16">
            {children}
          </main>
        
        </body>
      </html>
    </ClerkProvider>
  );
}
