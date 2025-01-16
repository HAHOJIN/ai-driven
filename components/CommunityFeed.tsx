'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle } from 'lucide-react';
import { mockPosts } from '@/utils/mockData';
import { IPost } from '@/types';
import { CommentsModal } from '@/components/CommentsModal';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function CommunityFeed() {
  const [posts, setPosts] = useState<IPost[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const router = useRouter();

  // 좋아요 토글 처리
  const handleLikeToggle = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.postId === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts.map((post) => (
        <div 
          key={post.postId}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          <div 
            className="relative aspect-square cursor-pointer"
            onClick={() => router.push(`/post/${post.postId}`)}
          >
            <Image
              src={post.imageURL}
              alt={post.prompt}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.userProfile || undefined} alt={post.userName} />
                  <AvatarFallback className="bg-primary/10">
                    {post.userName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{post.userName}</span>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleLikeToggle(post.postId)}
                  className="flex items-center space-x-1"
                >
                  <Heart 
                    className={`w-5 h-5 ${post.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
                  />
                  <span>{post.likes}</span>
                </button>
                <button 
                  onClick={() => setSelectedPost(post)}
                  className="flex items-center space-x-1"
                >
                  <MessageCircle className="w-5 h-5 text-gray-500" />
                  <span>{post.comments}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {selectedPost && (
        <CommentsModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
} 