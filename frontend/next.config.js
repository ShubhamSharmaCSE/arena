// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Optimize for Docker
  images: {
    domains: ['ipfs.io', 'ipfs.infura.io', 'cloudflare-ipfs.com'],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
