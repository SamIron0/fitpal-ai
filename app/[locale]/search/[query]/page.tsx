import { getRecipeById } from "@/db/admin"
import { getSettingsById } from "@/db/settings"
import { createClient } from "@/lib/supabase/server"
import { Tables } from "@/supabase/types"
import { cookies } from "next/headers"

export default async function ResultPage({ params }: { params: { query: string } }) {
  //console.log('query',params.query)
  const supabase = createClient(cookies())
  const session=(await supabase.auth.getSession()).data.session
  let settings: Tables<"settings">={} as Tables<"settings">
  if (session) {
    let settings = await getSettingsById(session.user.id)
  }
  const herokuPromise = await fetch("https://fitpal-search.onrender.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      method: "POST",
      body: JSON.stringify({
        input: params.query,
        diet: settings?.diet || ['Anything'],
        allergy: settings?.allergies || ['None'],
      })
    })
  }).then(data => data.json())

  const [responseData] = await Promise.all([herokuPromise])
  const recipeIds = responseData.result

  // Fetch recipes in parallel
  const recipePromises = recipeIds.map((recipeId: string) =>
    getRecipeById(recipeId)
  )
  const recipes = await Promise.all(recipePromises)

  return (
    <div>
      hi
      {recipes.map((recipe: any) => (
        <div key={recipe.id}>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  )}
