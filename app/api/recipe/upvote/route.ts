import { vote } from "@/db/recipes"
import { createClient } from "@/lib/supabase/server"
import { ServerRuntime } from "next"
import { cookies } from "next/headers"

export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { vote,recipe_id } = json
  const supabase = createClient(cookies())
  const user_id = (await supabase.auth.getUser()).data.user?.id
  if (!user_id) {
    return new Response("Not logged in")
  }
  await vote(vote, user_id, recipe_id)
  return new Response("Upvoted")
}
