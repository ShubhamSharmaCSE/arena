"use client";

"use client";

import React, { useState } from 'react';
import { createPost } from '@/services/post.service';
import { useAuthContext } from '@/context/AuthContext';

interface PostComposerProps {
  onPostCreated: () => void;
}

const PostComposer: React.FC<PostComposerProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }
    
    if (content.length > 280) {
      setError('Post content cannot exceed 280 characters');
      return;
    }
    
    if (!isAuthenticated) {
      setError('You must be signed in to post');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await createPost({ content });
      
      if (result) {
        setContent('');
        onPostCreated();
      } else {
        setError('Failed to create post');
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
        Sign in to create posts
      </div>
    );
  }
  
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            {user?.profilePicUrl ? (
              <img 
                src={user.profilePicUrl} 
                alt={user.username || user.wallet_address} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                {user?.username?.charAt(0).toUpperCase() || '?'}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-white"
              placeholder="What's happening?"
              rows={3}
              maxLength={280}
            />
            
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {content.length}/280
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !content.trim()}
                className={`px-4 py-2 rounded-full font-medium text-white ${
                  isLoading || !content.trim()
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isLoading ? 'Posting...' : 'Post'}
              </button>
            </div>
            
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostComposer;
