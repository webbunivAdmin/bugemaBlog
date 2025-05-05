// app/lib/image-loader.ts
export default function appwriteLoader({ src, width, quality }: {
    src: string;
    width: number;
    quality?: number;
  }) {

    if (src.includes('cloud.appwrite.io')) {
      return src;
    }

    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
  }