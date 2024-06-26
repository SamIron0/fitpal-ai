import { ServerRuntime } from "next"
import { getRecipeById } from "@/db/admin"
export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { id } = json as {
    id: string
  }
  try {
    const recipe = await getRecipeById(id)
    console.log("recipe", recipe)
    if (!recipe) {
      return new Response(JSON.stringify({ error: "None" }))
    }
    return new Response(JSON.stringify(recipe))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}
