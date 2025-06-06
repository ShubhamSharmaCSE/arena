import { apiRequest } from '@/utils/api';
import { Post, CreatePostInput } from '@/types/api';

// Get all posts
export async function getPosts(): Promise<Post[]> {
  const response = await apiRequest<Post[]>('/posts', 'GET');
  return response.data || [];
}

// Get a specific post by ID
export async function getPost(postId: string): Promise<Post | null> {
  const response = await apiRequest<Post>(`/posts/${postId}`, 'GET');
  return response.data || null;
}

// Create a new post
export async function createPost(createPostInput: CreatePostInput): Promise<Post | null> {
  const response = await apiRequest<Post>('/posts', 'POST', createPostInput);
  return response.data || null;
}

// Like or unlike a post
export async function likePost(postId: string): Promise<boolean> {
  const response = await apiRequest<{success: boolean}>(`/posts/${postId}/like`, 'POST');
  return response.data?.success || false;
}
