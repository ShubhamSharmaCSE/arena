import { apiRequest } from '@/utils/api';
import { Comment, CreateCommentInput } from '@/types/api';

// Get all comments for a specific post
export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  const response = await apiRequest<Comment[]>(`/posts/${postId}/comments`, 'GET');
  return response.data || [];
}

// Create a new comment on a post
export async function createComment(postId: string, commentInput: CreateCommentInput): Promise<Comment | null> {
  const response = await apiRequest<Comment>(`/posts/${postId}/comment`, 'POST', commentInput);
  return response.data || null;
}
