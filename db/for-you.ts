import { createClient } from "@/lib/supabase/server"
import { TablesInsert, TablesUpdate } from "@/supabase/types"
import { cookies } from "next/headers"

const cookieStore = cookies()
const supabase = createClient(cookieStore)
export const getGuestForYou = async () => {
  // get 10 random entries from table recipes
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select("*")
    //.order("RANDOM()")
    .limit(10)
  if (error) {
    throw error
  }

  return recipes
}

export const getForYou = async (workspaceId: string) => {
  // get 10 random entries from table recipes
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select("*")
    //.order("RANDOM()")
    .limit(10)
  if (error) {
    throw error
  }

  return recipes
}
