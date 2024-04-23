import { createClient } from "@/lib/supabase/server"
import { TablesInsert } from "@/supabase/types"
import { id } from "common-tags"
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

  const res = data ? [0] : null
  for (var i = 0; i < tags.length; i++) {
    const { data, error } = await supabase
      .from("recipe_tags")
      .select("recipes,id")
      .eq("name", tags[i])

    if (data && data?.length > 0) {
      // const recipeArr: string[] = data[0].recipes
      data[0].recipes.push(recipes.id)
      const { data: updateData, error: updateError } = await supabase
        .from("recipe_tags")
        .update({ recipes: data[0].recipes })
        .eq("id", data[0].id)

      if (updateError) {
        throw new Error(updateError.message)
      }
      console.log("data: " + updateData)
    } else {
      const { data: insertData, error: insertError } = await supabase
        .from("recipe_tags")
        .insert({ name: tags[i], id: uuidv4(), recipes: [recipes.id] })
    }
  }

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const getRecipesWithTags = async (tags: string[]) => {
  const supabase = createClient(cookies())
  const recipeIds: Set<number> = new Set() // use a Set to ensure uniqueness
  const recipes: any[] = []

  for (var i = 0; i < tags.length; i++) {
    const { data: tagData, error } = await supabase
      .from("recipe_tags")
      .select("recipes")
      .eq("name", tags[i])

    if (error) {
      throw new Error(error.message)
    }

    // append recipe id to recipeIds set

    if (tagData && tagData[0]) {
      tagData[0].recipes.forEach((id: number) => recipeIds.add(id))
    }
  }

  // retrieve recipes for each unique id
  for (const id of recipeIds) {
    const { data: recipeData, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    recipes.push(recipeData)
  }

  return recipes
}
