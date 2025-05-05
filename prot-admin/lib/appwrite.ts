import { Client, Storage, ID } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

// Initialize Storage
const storage = new Storage(client);

export async function uploadFile(file: File): Promise<string> {
  try {
    // Create a unique file ID with timestamp and original filename
    const fileId = `${Date.now()}-${file.name}`;
    
    // Upload the file to Appwrite storage using environment variable for bucket ID
    const result = await storage.createFile(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '',
      ID.unique(),
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