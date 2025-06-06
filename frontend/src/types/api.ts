// User types
export interface User {
  wallet_address: string;
  username?: string;
  bio?: string;
  profilePicUrl?: string;
}

export interface UpdateUserInput {
  username?: string;
  bio?: string;
  profilePicUrl?: string;
}

// Post types
export interface Post {
  id: string;
  wallet_address: string;
  content: string;
  timestamp: string;
  username?: string;
  profilePicUrl?: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
}

export interface CreatePostInput {
  content: string;
}

// Comment types
export interface Comment {
  id: string;
  post_id: string;
  wallet_address: string;
  content: string;
  timestamp: string;
  username?: string;
  profilePicUrl?: string;
}

export interface CreateCommentInput {
  content: string;
}

// Auth types
export interface AuthVerifyInput {
  walletAddress: string;
  signature: string;
  message: string;
}

export interface AuthVerifyResponse {
  success: boolean;
  walletAddress: string;
}

// API Response type
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
