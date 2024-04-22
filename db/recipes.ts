import { createClient } from "@/lib/supabase/server"
import { TablesInsert } from "@/supabase/types"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

export const createRecipe = async (recipes: any) => {
  const supabase = createClient(cookies())
  const { data, error } = await supabase.from("recipes").insert({
    id: uuidv4(),
    ...recipes
  })

  if (error) {
    throw new Error(error.message)
  }
  return data
}
