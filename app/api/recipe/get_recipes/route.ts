import { ServerRuntime } from "next"
import { createRecipe, getRecipesByTags } from "@/db/recipes"
import { TablesInsert } from "@/supabase/types"
import { Tags } from "@/types/tags"
export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { input } = json as {
    input: Tags[]
  }
  try {
    //const tags = ["African", "dinner"]

    const qTags = await fetch(
      "https://3x077l0rol.execute-api.us-east-1.amazonaws.com/main/tag",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          input
        })
      }
    )
    const data = await qTags.json()
    console.log("data: " + data)
    console.log("data: " + data[0])
    if (!data) {
      return new Response(JSON.stringify({ error: "None" }))
    }
    const res = await getRecipesByTags(data)
    return new Response(JSON.stringify(res))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}
