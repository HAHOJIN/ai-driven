"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PromptInput } from "./PromptInput";
import { StyleOptions } from "./StyleOptions";
import { GeneratedImagePreview } from "./GeneratedImagePreview";
import { mockGeneratedImage } from "@/utils/mockData";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ImageGeneration() {
  const [prompt, setPrompt] = useState("");
  const [styleOptions, setStyleOptions] = useState({
    artStyle: "digital-art",
    colorTone: "bright",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<typeof mockGeneratedImage | null>(null);
  const [promptError, setPromptError] = useState<string>("");
  const { toast } = useToast();

  const handleStyleOptionChange = (field: 'artStyle' | 'colorTone', value: string) => {
    setStyleOptions(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setPromptError("프롬프트를 입력해 주세요");
      return;
    }
    
    setPromptError("");
    setIsGenerating(true);
    
    // 목업 데이터로 2초 후 이미지 생성 시뮬레이션
    setTimeout(() => {
      setGeneratedImage({
        ...mockGeneratedImage,
        prompt,
        styleOptions
      });
      setIsGenerating(false);
      toast({
        title: "이미지 생성 완료",
        description: "이미지가 성공적으로 생성되었습니다.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <PromptInput
        value={prompt}
        onChange={setPrompt}
        error={promptError}
      />
      
      <StyleOptions
        value={styleOptions}
        onChange={handleStyleOptionChange}
      />
      
      <Button
        onClick={handleGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            생성 중...
          </>
        ) : (
          "이미지 생성"
        )}
      </Button>

      {generatedImage && (
        <GeneratedImagePreview
          imageUrl={generatedImage.imageUrl}
          prompt={generatedImage.prompt}
          styleOptions={generatedImage.styleOptions}
        />
      )}
    </div>
  );
} 