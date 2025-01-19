import Image from 'next/image'
import { Share2, Download, Trash2, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IGalleryGridProps } from '@/types'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export function GalleryGrid({ 
  images, 
  onImageClick, 
  onShare,
  onDownload,
  onEdit,
  onDelete 
}: IGalleryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => (
        <div 
          key={image.id} 
          className="flex flex-col bg-white rounded-lg shadow-sm cursor-pointer"
          onClick={() => onImageClick(image)}
        >
          {/* 이미지 컨테이너 */}
          <div className="relative aspect-square rounded-t-lg overflow-hidden group">
            <Image
              src={image.imageUrl}
              alt={image.prompt}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            
            {/* 호버 시 나타나는 액션 오버레이 */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(image);
                }}
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload(image);
                }}
              >
                <Download className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(image);
                }}
              >
                <Pencil className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(image);
                }}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* 상태 정보 */}
          <div className="p-3 space-y-2">
            {/* 날짜와 공개 상태 */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                {format(new Date(image.createdAt), 'yyyy. M. d.', { locale: ko })}
              </span>
              <span className={`
                px-2 py-0.5 rounded-full text-xs
                ${image.isPublic 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-gray-100 text-gray-700'
                }
              `}>
                {image.isPublic ? '공개' : '비공개'}
              </span>
            </div>

            {/* 태그 목록 */}
            <div className="flex flex-wrap gap-1">
              {image.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 