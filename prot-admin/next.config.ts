import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
    ],
    // Add these settings to increase timeout and memory
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
  },
  // Increase serverless function timeout
  experimental: {
    serverComponentsExternalPackages: [],
    // This might help with timeouts in development
    optimizeFonts: true,
  },
};

export default nextConfig;