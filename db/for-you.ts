import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getGuestForYou = async () => {
  // get 10 random entries from table recipes
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select("name, imgurl") // select all columns by default
    .order("random()") // order by random
    .limit(10) // limit to 10 entries

  if (error) {
    throw error
  }

  return recipes
}

export const getForYou = async (workspaceId: string) => {}
