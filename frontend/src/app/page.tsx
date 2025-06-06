'use client';

import { useState, useEffect } from 'react';
import { getPosts } from '@/services/post.service';
import { Post } from '@/types/api';
import PostComposer from '@/components/PostComposer';
import PostCard from '@/components/PostCard';
import { useAccount } from 'wagmi';
import { useAuthContext } from '@/context/AuthContext';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { address = '' } = useAccount();
  const { isAuthenticated } = useAuthContext();

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError('Failed to load posts. Please refresh the page.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = () => {
    fetchPosts();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Home</h1>
        {isAuthenticated && (
          <div className="mb-8">
            <PostComposer onPostCreated={handlePostCreated} />
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded">
            No posts yet. Be the first to post!
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onAction={fetchPosts} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
