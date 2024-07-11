import { TablesInsert } from "@/supabase/types"
import { supabase } from "@/lib/supabase/browser-client"

export const saveRecipe = async (userId: string, id: string) => {
  // add id to recipe_ids column(uuid array) of user_recipes table
  const { data, error } = await supabase
    .from("user_recipes")
    .select("recipe_ids")
    .eq("id", userId)

  if (error) {
    console.log(error)
    return error
  }

  if (!data) {
    const { error: insertError } = await supabase
      .from("user_recipes")
      .insert({ id: userId, recipe_ids: [id] })
  }
  const recipeIds = data[0].recipe_ids

  const newRecipeIds = [...recipeIds, id]

  const { error: updateError } = await supabase
    .from("user_recipes")
    .update({ recipe_ids: newRecipeIds })
    .eq("id", userId)

  if (updateError) {
    console.log(updateError)
    return updateError
  }

  return "success"
}
