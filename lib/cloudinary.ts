import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImage = async (file: any) => {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(
      `https://api.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    )

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    const data = await response.json()
    return data.secure_url // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error)
    throw new Error("Image upload failed")
  }
}
