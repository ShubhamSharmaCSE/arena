import { apiRequest } from '@/utils/api';
import { User, UpdateUserInput } from '@/types/api';

// Get user by wallet address
export async function getUser(walletAddress: string): Promise<User | null> {
  const response = await apiRequest<User>(`/users/${walletAddress}`, 'GET');
  return response.data || null;
}

// Update user profile
export async function updateUser(updateUserInput: UpdateUserInput): Promise<User | null> {
  const response = await apiRequest<User>('/users', 'POST', updateUserInput);
  return response.data || null;
}
