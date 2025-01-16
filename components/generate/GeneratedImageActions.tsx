import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Share2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { IGeneratedImage, IGeneratedImageActionsProps } from "@/types";

export function GeneratedImageActions({
  imageUrl,
  prompt,
  styleOptions
}: IGeneratedImageActionsProps) {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "다운로드 완료",
        description: "이미지가 성공적으로 다운로드되었습니다.",
      });
    } catch (error) {
      toast({
        title: "다운로드 실패",
        description: "이미지 다운로드 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleSaveToGallery = async () => {
    try {
      // 실제 API 연동 시 여기에 갤러리 저장 API 호출
      toast({
        title: "갤러리 저장 완료",
        description: "이미지가 갤러리에 저장되었습니다.",
      });
    } catch (error) {
      toast({
        title: "저장 실패",
        description: "갤러리 저장 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={prompt}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold">생성된 이미지 정보</h3>
        <p className="text-sm text-gray-600">{prompt}</p>
        <div className="flex gap-2 text-sm text-gray-500">
          <span>스타일: {styleOptions.artStyle}</span>
          <span>•</span>
          <span>색조: {styleOptions.colorTone}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleSaveToGallery} variant="default">
          <Save className="mr-2 h-4 w-4" />
          갤러리에 저장
        </Button>
        <Button onClick={handleDownload} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          다운로드
        </Button>
        <Button variant="outline" onClick={() => toast({ description: "준비 중인 기능입니다." })}>
          <Share2 className="mr-2 h-4 w-4" />
          공유하기
        </Button>
      </div>
    </div>
  );
} 