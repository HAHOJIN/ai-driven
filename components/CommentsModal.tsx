'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IPost, IComment, CommentsModalProps } from '@/types';
import { mockComments } from '@/utils/mockData';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


export function CommentsModal({ post, onClose }: CommentsModalProps) {
  const [comments, setComments] = useState<IComment[]>(mockComments);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: IComment = {
      id: Date.now().toString(),
      postId: post.postId,
      userName: '현재 사용자', // 실제 구현시 로그인된 사용자 정보 사용
      content: newComment,
      createdAt: new Date().toISOString(),
      userProfile: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>댓글</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <Button onClick={handleAddComment}>작성</Button>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.userProfile || undefined} alt={comment.userName} />
                  <AvatarFallback className="bg-primary/10">
                    {comment.userName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{comment.userName}</p>
                  <p className="text-sm text-gray-600">{comment.content}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 