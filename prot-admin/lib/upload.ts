import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "./firebase"

export async function uploadFile(file: File): Promise<string> {
  try {
    const fileRef = ref(storage, `images/${Date.now()}-${file.name}`)
    const snapshot = await uploadBytes(fileRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error("Error uploading file:", error)
    throw new Error("Failed to upload file")
  }
}

