import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '/128/10412/**',
      },
    ],
    domains: ['cdn-icons-png.flaticon.com'], // <- por compatibilidad
  },
};

export default nextConfig;
