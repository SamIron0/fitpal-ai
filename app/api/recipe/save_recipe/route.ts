// pages/api/save_recipe.ts

import { NextApiRequest, NextApiResponse } from "next"
import { saveRecipe } from "@/db/admin" // Assuming saveRecipe is your function to save to Supabase or your database
import { uploadImage } from "@/lib/cloudinary" // Import the uploadImage function

export default async function POST(req: Request, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  const { recipe } = await req.json()

  try {
    if (recipe.imgurl instanceof File) {
      // Upload image to Cloudinary if it's a File object
      recipe.imgurl = await uploadImage(recipe.imgurl)
    }

    const saveResult = await saveRecipe(recipe) // Save recipe to Supabase or your database

    res
      .status(200)
      .json({ message: "Recipe saved successfully", data: saveResult })
  } catch (error) {
    console.error("Error saving recipe:", error)
    res.status(500).json({ message: "Failed to save recipe", error })
  }
}
