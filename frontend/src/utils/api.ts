"use client";

import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse, AuthVerifyResponse } from '@/types/api';

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  const walletAddress = localStorage.getItem('walletAddress');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  if (walletAddress) {
    config.headers['x-wallet-address'] = walletAddress;
  }
  
  return config;
});

// Generic request method with type safety
export async function apiRequest<T = any, R = ApiResponse<T>>(
  url: string,
  method: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<R> {
  try {
    const response = await api.request({
      url,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    // Format error response consistently
    if (error.response?.data) {
      return error.response.data as R;
    }
    
    return {
      error: error.message || 'An unexpected error occurred',
    } as unknown as R;
  }
}

// Authentication methods
export async function verifySignature(walletAddress: string, signature: string, message: string): Promise<AuthVerifyResponse> {
  const response = await apiRequest<AuthVerifyResponse>('/auth/verify', 'POST', {
    walletAddress,
    signature,
    message
  });
  return response.data as AuthVerifyResponse;
}

export function setAuthData(walletAddress: string, signature: string) {
  localStorage.setItem('walletAddress', walletAddress);
  localStorage.setItem('authToken', signature);
}

export function clearAuthData() {
  localStorage.removeItem('walletAddress');
  localStorage.removeItem('authToken');
}
