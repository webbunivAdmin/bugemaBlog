"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { ImageIcon, Loader2, Upload } from 'lucide-react'
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { uploadFile } from "@/lib/upload"
import { cn } from "@/lib/utils"

// Define max file size: 10MB in bytes
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface ImageUploadDialogProps {
  onImageUploaded: (url: string) => void
}

export function ImageUploadDialog({ onImageUploaded }: ImageUploadDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)
  const [imageUrl, setImageUrl] = React.useState("")

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const file = acceptedFiles[0]
        
        // Check file size before uploading
        if (file.size > MAX_FILE_SIZE) {
          toast.error("File is too large. Maximum size is 10MB.");
          return;
        }
        
        setIsUploading(true)
        const toastId = toast.loading("Uploading image...")

        const downloadURL = await uploadFile(file)
        onImageUploaded(downloadURL)
        setIsOpen(false)

        toast.success("Image uploaded successfully!", { id: toastId })
      } catch (error) {
        toast.error("Failed to upload image. Please try again.")
      } finally {
        setIsUploading(false)
      }
    },
    [onImageUploaded],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    onDropRejected: (fileRejections) => {
      const isSizeError = fileRejections.some(
        rejection => rejection.errors.some(error => error.code === 'file-too-large')
      );
      
      if (isSizeError) {
        toast.error("File is too large. Maximum size is 10MB.");
      } else {
        toast.error("Invalid file type. Please upload a PNG, JPG, or GIF.");
      }
    }
  })

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (imageUrl) {
      // Validate URL before submitting
      try {
        new URL(imageUrl);
        onImageUploaded(imageUrl)
        setIsOpen(false)
        setImageUrl("")
      } catch (error) {
        toast.error("Please enter a valid URL");
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <ImageIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
          <DialogDescription>Upload an image or paste a URL</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="upload">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="url">URL</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <div
              {...getRootProps()}
              className={cn(
                "relative flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed",
                isDragActive && "border-primary",
                isUploading && "pointer-events-none opacity-50",
              )}
            >
              <input {...getInputProps()} />
              {isUploading ? (
                <div className="flex flex-col items-center justify-center text-sm text-muted-foreground">
                  <Loader2 className="h-10 w-10 animate-spin" />
                  <p>Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-sm text-muted-foreground">
                  <Upload className="h-10 w-10 mb-2" />
                  <p>Drag & drop an image here, or click to select one</p>
                  <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="url">
            <form onSubmit={handleUrlSubmit} className="flex space-x-2">
              <Input placeholder="Paste image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              <Button type="submit">Add</Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}