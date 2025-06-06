"use client";

import { useCallback, useEffect, useState } from 'react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { verifySignature, setAuthData, clearAuthData } from '@/utils/api';

const AUTH_MESSAGE = 'Login to Decentralized Social Media';

export function useAuth() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated
  useEffect(() => {
    const walletAddress = localStorage.getItem('walletAddress');
    const authToken = localStorage.getItem('authToken');
    
    if (isConnected && address && walletAddress === address && authToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // Clear auth data if wallet is disconnected or changed
      if (isConnected && address && walletAddress !== address) {
        clearAuthData();
      }
    }
  }, [address, isConnected]);

  // Handle sign in with wallet
  const signIn = useCallback(async () => {
    if (!isConnected || !address) {
      setError('Wallet not connected');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Request signature from wallet
      const signature = await signMessageAsync({ 
        message: AUTH_MESSAGE
      });

      // Verify signature on the backend
      const response = await verifySignature(address, signature, AUTH_MESSAGE);

      if (response.success) {
        // Store auth data in localStorage
        setAuthData(address, signature);
        setIsAuthenticated(true);
        return true;
      } else {
        setError('Authentication failed');
        return false;
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to sign in');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, isConnected, signMessageAsync]);

  // Handle sign out
  const signOut = useCallback(() => {
    clearAuthData();
    setIsAuthenticated(false);
    disconnect();
  }, [disconnect]);

  return {
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signOut,
  };
}
