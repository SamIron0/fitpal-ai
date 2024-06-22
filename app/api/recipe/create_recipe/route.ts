import { ServerRuntime } from "next"
import { createRecipe } from "@/db/admin"
import { TablesInsert } from "@/supabase/types"
export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { recipe, tags, url } = json as {
    recipe: TablesInsert<"recipes">
    tags: string[]
    url: string
  }
  try {
    const res = await createRecipe(recipe, tags)
    return new Response(JSON.stringify(res))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}
