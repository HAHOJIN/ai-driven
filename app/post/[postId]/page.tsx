'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPosts, mockComments } from '@/utils/mockData';
import { IPost, IComment } from '@/types';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function PostDetail({ params }: { params: { postId: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // 목업 데이터에서 해당 포스트 찾기
    const foundPost = mockPosts.find(p => p.postId === params.postId);
    if (foundPost) {
      setPost(foundPost);
      // 해당 포스트의 댓글들 필터링
      const postComments = mockComments.filter(c => c.postId === params.postId);
      setComments(postComments);
    }
  }, [params.postId]);

  if (!post) return null;

  const handleLikeToggle = () => {
    setPost(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        isLiked: !prev.isLiked,
        likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
      };
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: IComment = {
      id: Date.now().toString(),
      postId: post.postId,
      userName: '현재 사용자',
      content: newComment,
      createdAt: new Date().toISOString(),
      userProfile: 'https://api.dicebear.com/1.x/avataaars/svg?seed=user'
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* 뒤로가기 버튼 */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          돌아가기
        </Button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 이미지 섹션 */}
            <div className="relative aspect-square">
              <Image
                src={post.imageURL}
                alt={post.prompt}
                fill
                className="object-cover"
              />
            </div>

            {/* 상세 정보 섹션 */}
            <div className="p-6 flex flex-col">
              {/* 작성자 정보 */}
              <div className="flex items-center space-x-3 mb-6">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.userProfile || undefined} alt={post.userName} />
                  <AvatarFallback className="bg-primary/10">
                    {post.userName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{post.userName}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* 프롬프트 */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">프롬프트</h3>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                  {post.prompt}
                </p>
              </div>

              {/* 상호작용 버튼 */}
              <div className="flex items-center space-x-4 mb-6">
                <button
                  onClick={handleLikeToggle}
                  className="flex items-center space-x-1"
                  aria-label="좋아요"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      post.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'
                    }`}
                  />
                  <span>{post.likes}</span>
                </button>
                <button 
                  className="flex items-center space-x-1"
                  aria-label="댓글"
                >
                  <MessageCircle className="w-6 h-6 text-gray-500" />
                  <span>{comments.length}</span>
                </button>
                <button 
                  className="flex items-center space-x-1"
                  aria-label="공유하기"
                >
                  <Share2 className="w-6 h-6 text-gray-500" />
                  <span>공유</span>
                </button>
              </div>

              {/* 댓글 섹션 */}
              <div className="flex-1 overflow-hidden">
                <h3 className="font-medium mb-4">댓글</h3>
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요"
                    className="flex-1 px-3 py-2 border rounded-md"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  />
                  <Button onClick={handleAddComment}>작성</Button>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-[300px]">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.userProfile || undefined} alt={comment.userName} />
                        <AvatarFallback className="bg-primary/10">
                          {comment.userName.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{comment.userName}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 