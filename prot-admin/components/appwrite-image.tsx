// components/appwrite-image.tsx
"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"

interface AppwriteImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string
}

export function AppwriteImage({ 
  src, 
  alt, 
  fallbackSrc = "/placeholder.svg",
  ...props 
}: AppwriteImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative ${isLoading ? 'bg-muted animate-pulse' : ''}`}>
      <Image
        {...props}
        src={hasError ? fallbackSrc : imgSrc}
        alt={alt}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
          setImgSrc(fallbackSrc)
        }}
      />
    </div>
  )
}