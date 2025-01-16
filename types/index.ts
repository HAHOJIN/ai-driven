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