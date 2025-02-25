"use client"

import * as React from "react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"
import { ImageIcon, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { uploadFile } from "@/lib/upload"

interface ImageUploadProps {
  value?: string
  onChange?: (value: string) => void
  onError?: (error: Error) => void
  className?: string
}

export function ImageUpload({ value, onChange, onError, className, ...props }: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const [preview, setPreview] = React.useState<string | undefined>(value)

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setIsUploading(true)
        const file = acceptedFiles[0]
        const downloadURL = await uploadFile(file)
        onChange?.(downloadURL)
        setPreview(downloadURL)
      } catch (error) {
        onError?.(error as Error)
      } finally {
        setIsUploading(false)
      }
    },
    [onChange, onError],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-100/25",
        isDragActive && "border-primary",
        className,
      )}
      {...props}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <div className="flex flex-col items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin" />
          <p>Uploading...</p>
        </div>
      ) : preview ? (
        <div className="relative h-full w-full">
          <Image
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="rounded-lg object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-sm text-muted-foreground">
          <ImageIcon className="h-10 w-10 mb-2" />
          <p>Drag & drop an image here, or click to select one</p>
          <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}
    </div>
  )
}

