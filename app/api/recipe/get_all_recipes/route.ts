import { ServerRuntime } from "next"
import {
  getAllRecipes,
  getForYou,
  getGuestForYou,
  getRecipeById
} from "@/db/admin"
export const runtime: ServerRuntime = "edge"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { Tables } from "@/supabase/types"
export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const session = (await supabase.auth.getSession()).data.session
    //let all_recipes: Tables<"recipes">[] = []
    if (session?.user.email !== "ekaronke@gmail.com") {
      return new Response(JSON.stringify({ error: "error" }))
    }
    let all_recipes = await getAllRecipes()

    return new Response(JSON.stringify(all_recipes))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}
