"use client";

import React from 'react';
import { Comment } from '@/types/api';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="border-b dark:border-gray-700 p-4">
      <div className="flex space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          {comment.profilePicUrl ? (
            <img 
              src={comment.profilePicUrl} 
              alt={comment.username || 'User'} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              {comment.username?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          {/* Comment Header */}
          <div className="flex items-baseline space-x-1">
            <span className="font-medium text-gray-900 dark:text-white">
              {comment.username || `Anonymous (${comment.wallet_address.substring(0, 6)}...)`}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              · {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
            </span>
          </div>
          
          {/* Comment Content */}
          <div className="mt-1 text-gray-900 dark:text-gray-100">
            {comment.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
