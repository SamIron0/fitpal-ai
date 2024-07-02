import { getSettingsById } from "@/db/settings"
import { createClient } from "@/lib/supabase/server"
import { Tables } from "@/supabase/types"
import { cookies } from "next/headers"

export default async function ResultPage({ params }: { params: { query: string } }) {
  const supabase = createClient(cookies())
  const session=await supabase.auth.getSession()
  let settings: Tables<"settings">={} as Tables<"settings">
  if (session) {
    let settings = await getSettingsById(session.data.session?.user.id as string)
  }

  const res = await fetch(
    "https://www.fitpalai.com/api/recipe/get_recipes",
    {
      method: "POST",
      body: JSON.stringify({
        input: params.query,
        diet: settings?.diet || ['Anything'],
        allergy: settings?.allergies || ['None'],
      })
    }
  )

  if (!res.ok) {
    console.error("Error retrieving:", res)
  }
  const recipes = await res.json()
  return (
    <div>
      {recipes.map((recipe: any) => (
        <div key={recipe.id}>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  )}
