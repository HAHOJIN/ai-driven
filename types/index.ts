export interface IPost {
  postId: string;
  imageURL: string;
  userName: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  prompt: string;
  createdAt: string;
  userProfile: string | null;
}

export interface IComment {
  id: string;
  postId: string;
  userName: string;
  content: string;
  createdAt: string;
  userProfile: string | null;
}

export interface CommentsModalProps {
  post: IPost;
  onClose: () => void;
}

// generate.ts에서 이동된 인터페이스들
export interface IStyleOption {
  value: string;
  label: string;
}

export interface IStyleOptions {
  artStyle: string;
  colorTone: string;
}

export interface IGenerateFormData {
  prompt: string;
  styleOptions: IStyleOptions;
}

export interface IGeneratedImage {
  imageUrl: string;
  prompt: string;
  styleOptions: IStyleOptions;
}

// GeneratedImageActions 인터페이스
export interface IGeneratedImageActionsProps {
  imageUrl: string;
  prompt: string;
  styleOptions: IGeneratedImage['styleOptions'];
}

// PromptInput 인터페이스
export interface IPromptInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

// StyleOptions 인터페이스
export interface IStyleOptionsProps {
  value: IStyleOptions;
  onChange: (field: 'artStyle' | 'colorTone', value: string) => void;
}

// 갤러리 이미지 관련 인터페이스
export interface IGalleryImage {
  id: string;
  imageUrl: string;
  prompt: string;
  styleOptions: IStyleOptions;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  userId?: string;
  isPublic?: boolean;
}

// 갤러리 컴포넌트 Props 인터페이스
export interface IGalleryGridProps {
  images: IGalleryImage[];
  onImageClick: (image: IGalleryImage) => void;
}

export interface IImageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: IGalleryImage;
  onShare: () => void;
  onEdit: () => void;
}

export interface IShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: IGalleryImage;
}

export interface IEditImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: IGalleryImage;
}

// API 응답 인터페이스
export interface IGalleryResponse {
  images: IGalleryImage[];
  totalCount: number;
}

export interface IUpdateImageRequest {
  id: string;
  prompt?: string;
  category?: string;
  tags?: string[];
}

export interface IShareRequest {
  imageId: string;
  title: string;
  description: string;
  tags: string[];
  isPublic: boolean;
}

export interface IShareResponse {
  success: boolean;
  postId?: string;
  error?: string;
}

export interface IErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  }
}