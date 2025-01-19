import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { IShareModalProps } from '@/types'

export function ShareModal({ isOpen, onClose, image }: IShareModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState(image.tags.join(', '))
  const [isPublic, setIsPublic] = useState(true)

  const handleShare = () => {
    // 공유 로직 구현 예정
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>커뮤니티에 공유하기</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">제목</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              placeholder="제목을 입력하세요"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">설명</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              placeholder="이미지에 대한 설명을 입력하세요"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">태그</label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="태그를 콤마(,)로 구분하여 입력하세요"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">공개 설정</span>
            <Switch
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>

          <Button onClick={handleShare} className="w-full">
            공유하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 