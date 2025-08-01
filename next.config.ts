import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd3a8v8aky7.ufs.sh',
      },
    ],
  },
};

export default nextConfig;
