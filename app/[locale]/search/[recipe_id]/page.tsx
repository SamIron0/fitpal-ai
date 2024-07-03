import { getRecipeById } from "@/db/admin"
import { getSettingsById } from "@/db/settings"
import { createClient } from "@/lib/supabase/server"
import { Tables } from "@/supabase/types"
import { cookies } from "next/headers"

export default async function Recipe({
  params
}: {
  params: { recipe_id: string }
}) {
  const recipe = await getRecipeById(params.recipe_id)
  console.log("cals", recipe.calories)
  const supabase = createClient(cookies())
  const session = (await supabase.auth.getSession()).data.session
  return <div></div>
}
