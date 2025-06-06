"use client";

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuthContext } from '@/context/AuthContext';

const Header = () => {
  const { isAuthenticated, signIn, signOut } = useAuthContext();

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">DecentSocial</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <ConnectButton 
            showBalance={false}
            chainStatus="icon"
          />
          
          {isAuthenticated ? (
            <button 
              onClick={signOut}
              className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <button 
              onClick={signIn}
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
