import { TablesInsert } from "@/supabase/types"
import { supabase } from "@/lib/supabase/browser-client"
import { v4 as uuidv4 } from "uuid"
export const saveRecipe = async (user_id: string, recipe_id: string) => {
  // check if recipe is already saved
  const { data: insert, error: insertError } = await supabase
    .from("user_recipes")
    .select("*")
    .eq("user_id", user_id)
    .eq("recipe_id", recipe_id)

  if (insertError) {
    console.log(insertError)
    return insertError
  }

  if (insert.length > 0) {
    return "Already Saved"
  }

  const { data, error } = await supabase
    .from("user_recipes")
    .insert({ id: uuidv4(), user_id, recipe_id })

  if (insertError) {
    console.log(insertError)
    return insertError
  }
  return "Saved"
}
