import { ServerRuntime } from "next"
import { createRecipe } from "@/db/recipes"
export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { recipe } = json as {
    recipe: any
  }

  try {
    const res = await createRecipe(recipe)
    return new Response(JSON.stringify(res))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}
