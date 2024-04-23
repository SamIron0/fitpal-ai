import { ServerRuntime } from "next"
import { createRecipe, getRecipesWithTags } from "@/db/recipes"
import { TablesInsert } from "@/supabase/types"
import { Tags } from "@/types/tags"
export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { input } = json as {
    input: Tags[]
  }
  try {
    const tags = ["African", "dinner"]
    const res = await getRecipesWithTags(tags)
    return new Response(JSON.stringify(res))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}