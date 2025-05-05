"use client"

import { Client, Storage, ID } from 'appwrite';

// Initialize Appwrite client with environment variables
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

// Initialize Storage
const storage = new Storage(client);

export async function uploadFile(file: File, onProgress?: (progress: number) => void): Promise<string> {
  try {
    // Validate environment variables
    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
    if (!bucketId) {
      throw new Error("Appwrite bucket ID is not configured");
    }
    
    // Create a unique ID for the file
    const fileId = ID.unique();
    
    // Upload the file to Appwrite storage
    const result = await storage.createFile(
      bucketId,
      fileId,
      file
    );
    
    // Get the file view URL
    const fileUrl = storage.getFileView(
      bucketId, 
      result.$id
    );
    
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    
    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes("Network Error")) {
        throw new Error("Network error while uploading. Please check your connection.");
      } else if (error.message.includes("Permission denied")) {
        throw new Error("Permission denied. Please check your Appwrite permissions.");
      }
    }
    
    throw new Error("Failed to upload file");
  }
}