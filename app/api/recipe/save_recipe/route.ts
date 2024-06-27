import { ServerRuntime } from "next"
import { getRecipeById, save_query } from "@/db/admin"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { TablesInsert } from "@/supabase/types"

export const runtime: ServerRuntime = "edge"
import { saveRecipe } from "@/db/admin"
export async function POST(request: Request) {
  const json = await request.json()
  const { recipe } = json as {
    recipe: TablesInsert<"recipes">
  }

  try {
    const res = await saveRecipe(recipe)
    return new Response(JSON.stringify(res))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}
