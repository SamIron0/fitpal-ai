import { ServerRuntime } from "next"
import { getRecipeById, updateRecipe } from "@/db/admin"
import { TablesInsert } from "@/supabase/types"
export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { recipe } = json as {
    recipe: TablesInsert<"recipes2">
  }
  try { 
    const updatedRecipe = await updateRecipe(recipe)
    return new Response(JSON.stringify(updatedRecipe))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}
