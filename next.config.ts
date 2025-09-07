import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dorahacks.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        port: '',
        hostname: 'blockchain-hq.s3.ap-south-1.amazonaws.com',
        pathname: '/hackathon-thumbnails/**',
        search: '',
      },
      {
        protocol: 'https',
        port: '',
        hostname: 'blockchain-hq.s3.ap-south-1.amazonaws.com',
        pathname: '/jobs-company-logos/**',
        search: '',
      },
      {
        protocol: 'https',
        port: '',
        hostname: 'blockchain-hq.s3.ap-south-1.amazonaws.com',
        pathname: '/learning-resources/**',
        search: '',
      },
      {
        protocol: 'https',
        port: '',
        hostname: 'd112y698adiu2z.cloudfront.net',
        pathname: '/photos/**',
        search: '',
      }
    ],
    minimumCacheTTL: 86400, // Cache images for 1 day
    dangerouslyAllowSVG: true, // Allow SVGs if needed
    contentSecurityPolicy: "default-src 'self'; img-src * data: blob:;",
  },
  output: 'standalone',
};

export default nextConfig;
