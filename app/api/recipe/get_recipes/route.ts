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
    console.log("qtag: " + qTags)
    const tags = await qTags.json()
    console.log("tag: " + tags)
    const tags1 = tags[0]
    console.log("tags1: " + tags1)
    if (!JSON.parse(tags).tags && !JSON.parse(tags).tag) {
      return new Response(JSON.stringify({ error: "None" }))
    }
    const res = await getRecipesWithTags(
      JSON.parse(tags).tags || JSON.parse(tags).tag
    )
    return new Response(JSON.stringify(res))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}
