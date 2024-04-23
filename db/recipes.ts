import { createClient } from "@/lib/supabase/server"
import { TablesInsert } from "@/supabase/types"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

export const createRecipe = async (
  recipes: TablesInsert<"recipes">,
  tags: string[]
) => {
  const supabase = createClient(cookies())
  const { data, error } = await supabase
    .from("recipes")
    .insert({
      id: recipes.id || uuidv4(),
      name: recipes.name,
      description: recipes.description,
      ingredients: recipes.ingredients,
      cooking_time: recipes.cooking_time,
      imgurl: recipes.imgurl,
      protein: recipes.protein,
      fats: recipes.fats,
      carbs: recipes.carbs,
      calories: recipes.calories,
      instructions: recipes.instructions,
      portions: recipes.portions
    })
    .select("*")

  // CREATE TAGS TTABLE ENTRY

  if (error) {
    throw new Error(error.message)
  }
  return data
}
export const getRecipesWithTags = async (tags: string[]) => {
  const supabase = createClient(cookies())
  const { data, error } = await supabase.from("tags").select("*")
}
