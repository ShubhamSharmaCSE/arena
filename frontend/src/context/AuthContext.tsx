"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types/api';
import { apiRequest } from '@/utils/api';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
  signIn: () => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading: authLoading, error, signIn, signOut } = useAuth();
  const { address } = useAccount();
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch user data when authenticated
  useEffect(() => {
    async function fetchUserData() {
      if (isAuthenticated && address) {
        setIsLoading(true);
        
        try {
          const userData = await apiRequest<User>(`/users/${address}`, 'GET');
          if (!userData.error) {
            setUser(userData.data || null);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setUser(null);
      }
    }

    fetchUserData();
  }, [isAuthenticated, address]);

  const value = {
    isAuthenticated,
    isLoading: isLoading || authLoading,
    error,
    user,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
