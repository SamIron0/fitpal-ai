import { deleteSeoPage, saveSeoPage } from "@/db/admin" // Assuming saveRecipe is your function to save to Supabase or your database
import { TablesInsert } from "@/supabase/types"

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  const { data }: { data: TablesInsert<"search_result_metadata"> } =
    await request.json()
  console.log(data)
  try {
    const saveResult = await saveSeoPage(data) // Save recipe to Supabase or your database

    const renderPromise = await fetch("https://fitpal-search.onrender.com/long_term_cache", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: data.id,
        diet: "Anything",
        allergy: ["None"],
        description: data.description,
        keywords: data.keywords,
        ogImage: data.ogImage
      })
    }).then(response => response.json())

    return new Response(
      JSON.stringify({ message: "Page saved successfully", saveResult })
    )
  } catch (error) {
    console.error("Error saving page:", error)
    return new Response(JSON.stringify({ error: error }))
  }
}

export async function DELETE(request: Request) {
  if (request.method !== "DELETE") {
    return new Response("Method not allowed", { status: 405 })
  }
  try {
    const { id } = await request.json()
    console.log("deleting: ", id)
    const res = await deleteSeoPage(id)
  } catch (error) {
    console.error("Error deleting page:", error)
    return new Response(JSON.stringify({ error: error }))
  }

  return new Response(JSON.stringify({ message: "Page deleted successfully" }))
}
