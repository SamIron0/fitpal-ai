import { ServerRuntime } from "next"
import { createRecipe } from "@/db/recipes"
import { TablesInsert } from "@/supabase/types"
export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { recipe, tags } = json as {
    recipe: TablesInsert<"recipes">
    tags: string[]
  }
  //const recipeJson = JSON.stringify(recipe)
  try {
    const res = await createRecipe(recipe, tags)
    return new Response(JSON.stringify(res))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}