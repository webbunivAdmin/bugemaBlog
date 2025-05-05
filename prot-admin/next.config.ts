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
    // Other image config...
    
    // Add a custom loader for Appwrite
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
  },
  
  serverExternalPackages: [],
};

export default nextConfig;