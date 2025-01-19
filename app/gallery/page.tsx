'use client'

import { useState } from 'react'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { ImageDetailModal } from '@/components/gallery/ImageDetailModal'
import { ShareModal } from '@/components/gallery/ShareModal'
import { EditImageModal } from '@/components/gallery/EditImageModal'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Search, SortDesc } from 'lucide-react'
import { IGalleryImage } from '@/types'
import { mockGalleryImages } from '@/utils/mockData'

export default function GalleryPage() {
  // 상태 관리
  const [selectedImage, setSelectedImage] = useState<IGalleryImage | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // 이미지 필터링 및 정렬 로직
  const filteredImages = mockGalleryImages.filter(image => {
    if (selectedCategory !== 'all' && image.category !== selectedCategory) return false
    if (searchQuery && !image.prompt.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    return 0
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 제목 추가 */}
      <h1 className="text-2xl font-bold mb-8">내 갤러리</h1>

      {/* 필터 및 검색 섹션 */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[200px] relative">
          <Input
            placeholder="프롬프트로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="동물">동물</SelectItem>
            <SelectItem value="풍경">풍경</SelectItem>
            <SelectItem value="인물">인물</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="정렬" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">최신순</SelectItem>
            <SelectItem value="oldest">오래된순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 갤러리 그리드 */}
      <GalleryGrid
        images={filteredImages}
        onImageClick={(image) => {
          setSelectedImage(image)
          setIsDetailModalOpen(true)
        }}
      />

      {/* 모달 컴포넌트들 */}
      {selectedImage && (
        <>
          <ImageDetailModal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            image={selectedImage}
            onShare={() => {
              setIsDetailModalOpen(false)
              setIsShareModalOpen(true)
            }}
            onEdit={() => {
              setIsDetailModalOpen(false)
              setIsEditModalOpen(true)
            }}
          />
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            image={selectedImage}
          />
          <EditImageModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            image={selectedImage}
          />
        </>
      )}
    </div>
  )
} 