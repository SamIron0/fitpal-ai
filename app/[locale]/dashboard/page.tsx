"use server"
import { createClient } from "@/lib/supabase/server"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Dash from "@/components/adminDashboard/dash"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { urlExists } from "@/db/recipes"
import axios from "axios"
import { TablesInsert } from "@/supabase/types"
import { v4 as uuidv4 } from "uuid"
import { cookies } from "next/headers"
import { url } from "inspector"

export default async function Dashboard() {
  const supabase = createClient(cookies())
  const {
    data: { user }
  } = await supabase.auth.getUser()
  const session = (await supabase.auth.getSession()).data.session

  if (session?.user.email !== "ekaronke@gmail.com") {
    console.log("session", session?.user.email)
    return redirect("/")
  }

  const handleScrapeUrl = async (url: string) => {
    if (!url) {
      toast.error("Please enter a valid URL")
      return
    }

    const status = await urlExists(url)
    if (status) {
      toast.error("Recipe already exists")
      return
    }

    try {
      const toastId = toast.loading("Scraping...")
      const endpoint =
        "https://7a38-2604-3d09-aa7a-95e0-9ddf-5d76-dfb9-fa06.ngrok-free.app/scrape"
      const response = await axios.post(endpoint, { url })
      const data = response.data.body
      const recipe: TablesInsert<"recipes"> = {
        id: uuidv4(),
        name: data.name,
        description: data.description,
        ingredients: data.ingredients,
        imgurl: data.imgurl,
        protein: data.protein,
        fats: data.fats,
        carbs: data.carbs,
        calories: data.calories,
        instructions: data.instructions,
        portions: data.portions,
        cooking_time: data.cooking_time,
        url: url
      }

      const createRecipeResponse = await fetch("api/recipe/create_recipe", {
        method: "POST",
        body: JSON.stringify({ recipe: recipe, tags: data.tags }),
        headers: { "Content-Type": "application/json" }
      })

      if (createRecipeResponse.ok) {
        toast.dismiss(toastId)
        toast.success("Recipe saved successfully!")
      } else {
        toast.dismiss(toastId)
        toast.error("Error saving recipe")
      }
    } catch (error) {
      console.log(error)
      toast.error("Error scraping recipe")
    }
  }

  return <Dash handleScrapeUrl={url => handleScrapeUrl(url)} />
}
