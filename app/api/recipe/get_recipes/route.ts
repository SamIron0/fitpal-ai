import { ServerRuntime } from "next"
import { getRecipeById } from "@/db/admin"
export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const recipes = []
  const { input } = json as {
    input: string
  }
  try {
    const data = await fetch(
      "https://fitpal-search-b708e98ab7d0.herokuapp.com/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: input
        })
      }
    )
    const responseData = await data.json()
    console.log("response", responseData)
    const recipeIds = responseData.result

    if (!recipeIds) {
      return new Response(JSON.stringify({ error: "None" }))
    }
    for (const recipeId of recipeIds) {
      const recipe = await getRecipeById(recipeId)
      recipes.push(recipe)
    }
    return new Response(JSON.stringify(recipes))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}
