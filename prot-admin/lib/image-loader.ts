// app/lib/image-loader.ts
export default function appwriteLoader({ src, width, quality }: {
    src: string;
    width: number;
    quality?: number;
  }) {
    // If it's an Appwrite URL, return it directly
    if (src.includes('cloud.appwrite.io')) {
      return src;
    }
    
    // Otherwise use default Next.js image optimization
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
  }