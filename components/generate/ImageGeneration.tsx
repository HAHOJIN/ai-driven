"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PromptInput } from "./PromptInput";
import { StyleOptions } from "./StyleOptions";
import { GeneratedImageActions } from "./GeneratedImageActions";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { IGeneratedImage, IStyleOptions } from "@/types";

interface ImageGenerationProps {
  initialPrompt: string;
}

export function ImageGeneration({ initialPrompt }: ImageGenerationProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [styleOptions, setStyleOptions] = useState<IStyleOptions>({
    artStyle: "digital-art",
    colorTone: "bright",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<IGeneratedImage | null>(null);
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
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          styleOptions
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "이미지 생성에 실패했습니다.");
      }

      if (data.success && data.data) {
        setGeneratedImage({
          imageUrl: data.data.imageUrl,
          prompt,
          styleOptions
        });
        toast({
          title: "이미지 생성 완료",
          description: "이미지가 성공적으로 생성되었습니다.",
        });
      } else {
        throw new Error("이미지 URL을 받지 못했습니다.");
      }
    } catch (error) {
      toast({
        title: "이미지 생성 실패",
        description: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
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
        <GeneratedImageActions
          imageUrl={generatedImage.imageUrl}
          prompt={generatedImage.prompt}
          styleOptions={generatedImage.styleOptions}
        />
      )}
    </div>
  );
} 