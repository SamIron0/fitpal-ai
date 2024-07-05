import { saveSeoPage } from "@/db/admin" // Assuming saveRecipe is your function to save to Supabase or your database

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  const { data } = await request.json()

  try {
    const saveResult = await saveSeoPage(data) // Save recipe to Supabase or your database

    if (!saveResult) {
      return new Response(JSON.stringify({ error: "None" }))
    }
    return new Response(
      JSON.stringify({ message: "Page saved successfully", saveResult })
    )
  } catch (error) {
    console.error("Error saving page:", error)
    return new Response(JSON.stringify({ error: error }))
  }
}
