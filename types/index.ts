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