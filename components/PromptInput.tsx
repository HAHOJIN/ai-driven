'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function PromptInput() {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!prompt.trim()) {
      setError('프롬프트를 입력해 주세요');
      return;
    }
    
    // URL 인코딩하여 프롬프트를 쿼리 파라미터로 전달
    const encodedPrompt = encodeURIComponent(prompt.trim());
    router.push(`/generate?prompt=${encodedPrompt}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <Input
        placeholder="원하는 이미지를 설명해주세요"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
          setError('');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        className="h-12"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button 
        onClick={handleSubmit}
        disabled={!prompt.trim()}
        className="w-full"
      >
        이미지 생성하기
      </Button>
    </div>
  );
} 