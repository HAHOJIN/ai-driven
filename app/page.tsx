import PromptInput from '@/components/PromptInput';
import CommunityFeed from '@/components/CommunityFeed';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 space-y-12">
        {/* 프롬프트 입력 섹션 */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold">AI 이미지 생성</h1>
          <p className="text-gray-600">
            원하는 이미지를 설명해주세요. AI가 당신의 상상을 현실로 만들어드립니다.
          </p>
          <PromptInput />
        </section>

        {/* 커뮤니티 피드 섹션 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-center">커뮤니티 갤러리</h2>
          <CommunityFeed />
        </section>
      </div>
    </main>
  );
}
