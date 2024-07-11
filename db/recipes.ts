import { TablesInsert } from "@/supabase/types"
import { supabase } from "@/lib/supabase/browser-client"

export const saveRecipe = async (userId: string, id: string) => {
  // add id to recipe_ids column(uuid array) of user_recipes table
  const { error: insertError } = await supabase
    .from("user_recipes")
    .insert({ id: userId, recipe_id: id })

  if (insertError) {
    console.log(insertError)
    return insertError
  }
  return "Saved"
}
