"use client";

import React from 'react';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '@/types/api';
import { likePost } from '@/services/post.service';
import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
  onAction?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onAction }) => {
  const { isAuthenticated } = useAuthContext();
  const [isLiked, setIsLiked] = React.useState(post.isLiked || false);
  const [likesCount, setLikesCount] = React.useState(post.likesCount);
  const [isLiking, setIsLiking] = React.useState(false);

  const handleLike = async () => {
    if (!isAuthenticated || isLiking) return;
    
    try {
      setIsLiking(true);
      const success = await likePost(post.id);
      
      if (success) {
        // Toggle like state locally for immediate feedback
        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
        
        // Notify parent component for potential refetch
        if (onAction) onAction();
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="border-b dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          {post.profilePicUrl ? (
            <img 
              src={post.profilePicUrl} 
              alt={post.username || 'User'} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              {post.username?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          {/* Post Header */}
          <div className="flex items-baseline space-x-1">
            <span className="font-medium text-gray-900 dark:text-white">
              {post.username || `Anonymous (${post.wallet_address.substring(0, 6)}...)`}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              · {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </span>
          </div>
          
          {/* Post Content */}
          <Link href={`/post/${post.id}`}>
            <div className="mt-1 text-gray-900 dark:text-gray-100">
              {post.content}
            </div>
          </Link>
          
          {/* Post Actions */}
          <div className="mt-3 flex space-x-8">
            {/* Like Button */}
            <button 
              className={`flex items-center space-x-1 text-gray-500 hover:text-pink-600 dark:text-gray-400 ${
                isLiked ? 'text-pink-600 dark:text-pink-400' : ''
              }`}
              onClick={handleLike}
              disabled={!isAuthenticated || isLiking}
            >
              {isLiked ? (
                <HeartIconSolid className="w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span>{likesCount}</span>
            </button>
            
            {/* Comment Button */}
            <Link 
              href={`/post/${post.id}`} 
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 dark:text-gray-400"
            >
              <ChatBubbleLeftIcon className="w-5 h-5" />
              <span>{post.commentsCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
