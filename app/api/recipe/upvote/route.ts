import { vote } from "@/db/recipes"
import { ServerRuntime } from "next"

export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { user_id, recipe_id } = json
  await vote(1, user_id, recipe_id)
  return new Response("Upvoted")
}
