"use client";

import React, { useState } from 'react';
import { createComment } from '@/services/comment.service';
import { useAuthContext } from '@/context/AuthContext';

interface CommentComposerProps {
  postId: string;
  onCommentCreated: () => void;
}

const CommentComposer: React.FC<CommentComposerProps> = ({
  postId,
  onCommentCreated,
}) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }
    
    if (content.length > 280) {
      setError('Comment cannot exceed 280 characters');
      return;
    }
    
    if (!isAuthenticated) {
      setError('You must be signed in to comment');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await createComment(postId, { content });
      
      if (result) {
        setContent('');
        onCommentCreated();
      } else {
        setError('Failed to create comment');
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 text-center">
        Sign in to comment
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 mb-4">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-white"
          placeholder="Write a comment..."
          rows={2}
          maxLength={280}
        />
        
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {content.length}/280
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !content.trim()}
            className={`px-4 py-1 rounded-full font-medium text-white ${
              isLoading || !content.trim()
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Posting...' : 'Comment'}
          </button>
        </div>
        
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </form>
    </div>
  );
};

export default CommentComposer;
