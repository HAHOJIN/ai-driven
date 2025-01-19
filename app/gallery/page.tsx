'use client'

import { useState } from 'react'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { ImageDetailModal } from '@/components/gallery/ImageDetailModal'
import { ShareModal } from '@/components/gallery/ShareModal'
import { EditImageModal } from '@/components/gallery/EditImageModal'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Search, SortDesc, X, Calendar as CalendarIcon } from 'lucide-react'
import { IGalleryImage } from '@/types'
import { mockGalleryImages } from '@/utils/mockData'
import { format, isWithinInterval, startOfDay, endOfDay, subDays } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ko } from 'date-fns/locale'
import { DateRange } from "react-day-picker"
import { DeleteConfirmModal } from '@/components/gallery/DeleteConfirmModal'
import { useToast } from "@/hooks/use-toast"

export default function GalleryPage() {
  const { toast } = useToast()

  // 초기 상태값 정의
  const initialState = {
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'newest',
    publicFilter: 'all',
    dateRange: {
      from: undefined,
      to: undefined
    }
  }

  // 상태 관리
  const [selectedImage, setSelectedImage] = useState<IGalleryImage | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(initialState.searchQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialState.selectedCategory)
  const [sortBy, setSortBy] = useState(initialState.sortBy)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [publicFilter, setPublicFilter] = useState(initialState.publicFilter)
  const [images, setImages] = useState(mockGalleryImages)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [imageToDelete, setImageToDelete] = useState<IGalleryImage | null>(null)

  // 필터 초기화 함수
  const resetFilters = () => {
    setSearchQuery(initialState.searchQuery)
    setSelectedCategory(initialState.selectedCategory)
    setSortBy(initialState.sortBy)
    setPublicFilter(initialState.publicFilter)
    setDateRange(initialState.dateRange)
  }

  // 날짜 필터링 함수
  const isWithinDateRange = (date: Date) => {
    if (!dateRange?.from && !dateRange?.to) return true
    
    const targetDate = startOfDay(date)
    if (dateRange?.from && dateRange?.to) {
      return isWithinInterval(targetDate, {
        start: startOfDay(dateRange.from),
        end: endOfDay(dateRange.to)
      })
    }
    
    if (dateRange?.from) {
      return targetDate >= startOfDay(dateRange.from)
    }
    
    if (dateRange?.to) {
      return targetDate <= endOfDay(dateRange.to)
    }

    return true
  }

  // 이미지 필터링 및 정렬 로직
  const filteredImages = images.filter(image => {
    // 카테고리 필터
    if (selectedCategory !== 'all' && image.category !== selectedCategory) return false
    // 검색어 필터
    if (searchQuery && !image.prompt.toLowerCase().includes(searchQuery.toLowerCase())) return false
    // 날짜 필터
    if (!isWithinDateRange(new Date(image.createdAt))) return false
    // 공개 상태 필터
    if (publicFilter !== 'all' && image.isPublic !== (publicFilter === 'public')) return false
    return true
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })

  // 필터가 적용되었는지 확인
  const isFiltersApplied = 
    searchQuery !== initialState.searchQuery ||
    selectedCategory !== initialState.selectedCategory ||
    sortBy !== initialState.sortBy ||
    publicFilter !== initialState.publicFilter ||
    (dateRange?.from !== initialState.dateRange.from || dateRange?.to !== initialState.dateRange.to)

  const handleDownload = (image: IGalleryImage) => {
    // 다운로드 로직 구현
  }

  const handleImageClick = (image: IGalleryImage) => {
    setSelectedImage(image)
    setIsDetailModalOpen(true)
  }

  const handleEdit = (image: IGalleryImage) => {
    setSelectedImage(image)
    setIsEditModalOpen(true)
  }

  const handleDelete = (image: IGalleryImage) => {
    setImageToDelete(image)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (imageToDelete) {
      setImages(prevImages => prevImages.filter(img => img.id !== imageToDelete.id))
      setIsDeleteModalOpen(false)
      setImageToDelete(null)
      
      // 삭제 완료 토스트 추가
      toast({
        description: "이미지가 삭제되었습니다.",
        duration: 3000,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
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

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[250px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange?.to ? (
                  <>
                    {format(dateRange.from, 'yyyy. MM. dd', { locale: ko })} -{' '}
                    {format(dateRange.to, 'yyyy. MM. dd', { locale: ko })}
                  </>
                ) : (
                  format(dateRange.from, 'yyyy. MM. dd', { locale: ko })
                )
              ) : (
                "날짜 선택"
              )}
              {(dateRange?.from || dateRange?.to) && (
                <X 
                  className="ml-auto h-4 w-4 hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    setDateRange(undefined)
                  }}
                />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              locale={ko}
            />
          </PopoverContent>
        </Popover>

        <Select value={publicFilter} onValueChange={setPublicFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="공개 상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="public">공개</SelectItem>
            <SelectItem value="private">비공개</SelectItem>
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

        {isFiltersApplied && (
          <Button
            variant="outline"
            onClick={resetFilters}
            className="shrink-0"
            size="sm"
          >
            <X className="w-4 h-4 mr-2" />
            필터 초기화
          </Button>
        )}
      </div>

      {/* 검색 결과 카운트 */}
      <div className="text-sm text-gray-500 mb-4">
        총 {filteredImages.length}개의 이미지
      </div>

      {/* 갤러리 그리드 */}
      <GalleryGrid
        images={filteredImages}
        onImageClick={handleImageClick}
        onShare={(image) => {
          setSelectedImage(image)
          setIsShareModalOpen(true)
        }}
        onDownload={handleDownload}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
            onDelete={() => {
              setIsDetailModalOpen(false)
              setImageToDelete(selectedImage)
              setIsDeleteModalOpen(true)
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

      {/* 삭제 확인 모달 추가 */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  )
} 