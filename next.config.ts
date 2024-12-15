import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    // domains: ['192.168.15.15'], para testar no celular
  },
  reactStrictMode: true, // Ativa o modo estrito do React
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
