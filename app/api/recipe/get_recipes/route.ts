import { ServerRuntime } from "next"
import { getRecipesByIds } from "@/db/admin"
export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { input } = json as {
    input: string
  }
  try {
    const qTags = await fetch(
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
    const data = await qTags.json()

    if (!data) {
      return new Response(JSON.stringify({ error: "None" }))
    }
    const res = await getRecipesByIds(data)
    return new Response(JSON.stringify(res))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}
