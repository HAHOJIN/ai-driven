import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Share2, Download, Pencil, Trash2 } from 'lucide-react'
import { IImageDetailModalProps } from '@/types'

export function ImageDetailModal({
  isOpen,
  onClose,
  image,
  onShare,
  onEdit,
  onDelete
}: IImageDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>이미지 상세</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-4">
          {/* 이미지 섹션 */}
          <div className="relative aspect-square">
            <Image
              src={image.imageUrl}
              alt={image.prompt}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* 정보 섹션 */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">프롬프트</h3>
              <p className="text-gray-600">{image.prompt}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">스타일 옵션</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>아트 스타일: {image.styleOptions.artStyle}</div>
                <div>색조: {image.styleOptions.colorTone}</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">태그</h3>
              <div className="flex flex-wrap gap-2">
                {image.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={onShare}>
                <Share2 className="w-4 h-4 mr-2" />
                공유하기
              </Button>
              <Button variant="outline" onClick={onEdit}>
                <Pencil className="w-4 h-4 mr-2" />
                수정하기
              </Button>
              <Button 
                variant="outline" 
                onClick={onDelete}
                className="bg-destructive hover:bg-destructive/90"
              >
                <Trash2 className="w-4 h-4 text-white" />
                
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 