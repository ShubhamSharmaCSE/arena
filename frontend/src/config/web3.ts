"use client";

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import { http } from 'wagmi';

// Define available chains - use a constant array for better TypeScript support
const chains = [sepolia, mainnet] as const;

// Create wagmi config using getDefaultConfig
const config = getDefaultConfig({
  appName: 'Decentralized Social Media',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'decentralized-social-media',
  chains,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL 
      ? http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL)
      : http(),
  },
  ssr: true, // Enable server-side rendering support
});

export { chains, config };
