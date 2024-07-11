import { TablesInsert } from "@/supabase/types"
import { supabase } from "@/lib/supabase/browser-client"
import { v4 as uuidv4 } from "uuid"

export const vote = async (
  vote: number,
  user_id: string,
  recipe_id: string
) => {
  const { data, error } = await supabase
    .from("votes")
    .insert({ id: uuidv4(), user_id, recipe_id, vote })

  if (error) {
    console.log(error)
    return error
  }
  return data
}
export const getTotalVotes = async (recipe_id: string): Promise<number> => {
  const { data, error } = await supabase
    .from("votes")
    .select("vote")
    .eq("recipe_id", recipe_id)
  if (error) {
    console.log(error)
    return 0
  }
  // sum up all votes
  return data.reduce((acc, curr) => acc + curr.vote, 0)
}
export const saveRecipe = async (user_id: string, recipe_id: string) => {
  // check if recipe is already saved
  const { data: insert, error: insertError } = await supabase
    .from("saved_recipes")
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
    .from("saved_recipes")
    .insert({ id: uuidv4(), user_id, recipe_id })

  if (insertError) {
    console.log(insertError)
    return insertError
  }
  return "Saved"
}
