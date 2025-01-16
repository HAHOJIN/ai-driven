import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { mockStyleOptions } from "@/utils/mockData";

interface StyleOptionsProps {
  value: {
    artStyle: string;
    colorTone: string;
  };
  onChange: (field: 'artStyle' | 'colorTone', value: string) => void;
}

export function StyleOptions({ value, onChange }: StyleOptionsProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="artStyle">아트 스타일</Label>
        <Select
          value={value.artStyle}
          onValueChange={(value) => onChange('artStyle', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="스타일 선택" />
          </SelectTrigger>
          <SelectContent>
            {mockStyleOptions.artStyles.map((style) => (
              <SelectItem key={style.value} value={style.value}>
                {style.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="colorTone">색조</Label>
        <Select
          value={value.colorTone}
          onValueChange={(value) => onChange('colorTone', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="색조 선택" />
          </SelectTrigger>
          <SelectContent>
            {mockStyleOptions.colorTones.map((tone) => (
              <SelectItem key={tone.value} value={tone.value}>
                {tone.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 