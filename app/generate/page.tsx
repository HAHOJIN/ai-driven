import { ImageGeneration } from '@/components/generate/ImageGeneration';

export default function GeneratePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">이미지 생성</h1>
        <ImageGeneration />
      </div>
    </main>
  );
} 