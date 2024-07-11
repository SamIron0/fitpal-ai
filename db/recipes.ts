import { TablesInsert } from "@/supabase/types"
import { supabase } from "@/lib/supabase/browser-client"
import { v4 as uuidv4 } from "uuid"
export const saveRecipe = async (user_id: string, recipe_id: string) => {
  // add id to recipe_ids column(uuid array) of user_recipes table
  const { error: insertError } = await supabase
    .from("user_recipes")
    .insert({ id: uuidv4(), user_id, recipe_id })

  if (insertError) {
    console.log(insertError)
    return insertError
  }
  return "Saved"
}
