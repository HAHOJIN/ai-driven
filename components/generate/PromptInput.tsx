import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IPromptInputProps } from "@/types";

export function PromptInput({ value, onChange, error }: IPromptInputProps) {
  const maxLength = 500;

  return (
    <div className="space-y-2">
      <Label htmlFor="prompt">프롬프트</Label>
      <Textarea
        id="prompt"
        placeholder="생성하고 싶은 이미지를 자세히 설명해주세요..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        className="h-32"
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span className="text-red-500">{error}</span>
        <span>{value.length}/{maxLength}</span>
      </div>
    </div>
  );
} 