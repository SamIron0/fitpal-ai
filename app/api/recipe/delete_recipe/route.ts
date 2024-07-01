// pages/api/save_recipe.ts

import { NextApiRequest, NextApiResponse } from "next"
import { deleteRecipe, saveRecipe } from "@/db/admin" // Assuming saveRecipe is your function to save to Supabase or your database
import { uploadImage } from "@/lib/cloudinary" // Import the uploadImage function

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  const { recipe } = await request.json()

  //  console.log("recipe url", recipe)
  try {
    const deleteResult = await deleteRecipe(recipe) // Save recipe to Supabase or your database

    if (!deleteResult) {
      return new Response(JSON.stringify({ error: "None" }))
    }
    return new Response(
      JSON.stringify({ message: "Recipe deleted", deleteResult })
    )
  } catch (error) {
    console.error("Error saving recipe:", error)
    return new Response(JSON.stringify({ error: error }))
  }
}
