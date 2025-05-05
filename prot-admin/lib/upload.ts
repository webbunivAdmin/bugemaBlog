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
    // Create a unique ID for the file
    const fileId = ID.unique();
    
    // For progress tracking, we need to use the Appwrite SDK's built-in mechanism
    // This is typically done by subscribing to events before starting the upload
    
    // Upload the file to Appwrite storage
    const result = await storage.createFile(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '',
      fileId,
      file
    );
    
    // Get the file view URL
    const fileUrl = storage.getFileView(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '', 
      result.$id
    );
    
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
}