'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPost } from '@/services/post.service';
import { getCommentsByPostId } from '@/services/comment.service';
import { Post, Comment } from '@/types/api';
import PostCard from '@/components/PostCard';
import CommentItem from '@/components/CommentItem';
import CommentComposer from '@/components/CommentComposer';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function PostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPostAndComments = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [postData, commentsData] = await Promise.all([
        getPost(postId),
        getCommentsByPostId(postId),
      ]);

      setPost(postData);
      setComments(commentsData);
    } catch (err) {
      setError('Failed to load post data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostAndComments();
    }
  }, [postId]);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg text-red-700 dark:text-red-400">
          {error || 'Post not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-1" />
        <span>Back</span>
      </button>

      {/* Post */}
      <div className="mb-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <PostCard post={post} onAction={fetchPostAndComments} />
        </div>
      </div>

      {/* Comments */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-4">
          Comments {comments.length > 0 ? `(${comments.length})` : ''}
        </h2>
        
        <CommentComposer 
          postId={postId} 
          onCommentCreated={fetchPostAndComments} 
        />
        
        {comments.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-lg text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No comments yet. Be the first to comment!
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
