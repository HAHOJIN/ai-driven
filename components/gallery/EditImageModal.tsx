import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { IEditImageModalProps } from '@/types'

export function EditImageModal({ isOpen, onClose, image }: IEditImageModalProps) {
  const [prompt, setPrompt] = useState(image.prompt)
  const [category, setCategory] = useState(image.category)
  const [tags, setTags] = useState(image.tags.join(', '))

  const handleSave = () => {
    // 수정 로직 구현 예정
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>이미지 정보 수정</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">프롬프트</label>
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="프롬프트를 입력하세요"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">카테고리</label>
            <Select
              value={category}
              onValueChange={setCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="동물">동물</SelectItem>
                <SelectItem value="풍경">풍경</SelectItem>
                <SelectItem value="인물">인물</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">태그</label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="태그를 콤마(,)로 구분하여 입력하세요"
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            저장하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 