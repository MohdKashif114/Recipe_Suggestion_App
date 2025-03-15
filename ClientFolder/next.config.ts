import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spoonacular.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'img.spoonacular.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        search: '',
      },

    ],
  },
};

export default nextConfig;
