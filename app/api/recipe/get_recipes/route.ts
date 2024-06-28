import { ServerRuntime } from "next"
import { getRecipeById, save_query } from "@/db/admin"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { input, diet, allergy } = json as {
    input: string
    diet: string
    allergy: string[]
  }

  try {
    // Get user_id
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const uid = (await supabase.auth.getSession()).data.session?.user.id
    // Save user query
    if (!uid) {
      return new Response(JSON.stringify({ error: "None" }))
    }

    // Run save_query and Heroku call in parallel
    const saveQueryPromise = save_query(uid, input)
    const herokuPromise = fetch("https://fitpal-search.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: input,
        diet: diet,
        allergy: allergy
      })
    }).then(data => data.json())

    const [_, responseData] = await Promise.all([
      saveQueryPromise,
      herokuPromise
    ])
    const recipeIds = responseData.result

    if (!recipeIds) {
      return new Response(JSON.stringify({ error: "None" }))
    }

    // Fetch recipes in parallel
    const recipePromises = recipeIds.map((recipeId: string) =>
      getRecipeById(recipeId)
    )
    const recipes = await Promise.all(recipePromises)

    return new Response(JSON.stringify(recipes))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}
