'use client';

import { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { getPosts } from '@/services/post.service';
import { getUser } from '@/services/user.service';
import { Post, User } from '@/types/api';
import PostCard from '@/components/PostCard';
import ProfileEditForm from '@/components/ProfileEditForm';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuthContext();
  const router = useRouter();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  // Fetch user data and their posts
  const fetchUserData = async () => {
    if (!isAuthenticated || !user?.wallet_address) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch user details
      const userData = await getUser(user.wallet_address);
      setProfileUser(userData);
      
      // Fetch all posts
      const allPosts = await getPosts();
      
      // Filter for user's posts only
      const userPosts = allPosts.filter(
        (post) => post.wallet_address.toLowerCase() === user.wallet_address.toLowerCase()
      );
      
      setPosts(userPosts);
    } catch (err) {
      setError('Failed to load profile data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Sign in required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please connect your wallet and sign in to view your profile
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-4">
            {profileUser?.profilePicUrl ? (
              <img 
                src={profileUser.profilePicUrl} 
                alt={profileUser.username || 'Profile'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl">
                {profileUser?.username?.charAt(0).toUpperCase() || '?'}
              </div>
            )}
          </div>
          
          <div>
            <h1 className="text-2xl font-bold">
              {profileUser?.username || 'Anonymous User'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              {profileUser?.wallet_address}
            </p>
            {profileUser?.bio && (
              <p className="text-gray-700 dark:text-gray-300">{profileUser.bio}</p>
            )}
          </div>
        </div>
        
        <ProfileEditForm onProfileUpdated={fetchUserData} />
      </div>
      
      {/* User Posts */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Your Posts</h2>
      </div>
      
      {posts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your posts will appear here once you start posting.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onAction={fetchUserData} />
          ))}
        </div>
      )}
    </div>
  );
}
