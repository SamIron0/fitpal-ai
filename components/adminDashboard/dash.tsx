"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axios from "axios"
import { TablesInsert } from "@/supabase/types"
import { v4 as uuidv4 } from "uuid"
import { toast } from "sonner"
interface Props {
  onScrapeUrl: (url: string) => void
}
export default function Dash() {
  const [url, setURL] = useState("") // add this line
  const onScrapeUrl = async (url: string) => {
    const toastId = toast.loading("Scraping")

    var endpoint = "https://b7d4-37-19-212-70.ngrok-free.app/scrape"

    try {
      var result = await axios.post(endpoint, {
        url: url
      })
      const data = result.data.body
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
      toast.dismiss(toastId)
      const toastId2 = toast.loading("Creating Recipe")
      // call api to create recipe
      var createRecipe = await fetch("api/recipe/create_recipe", {
        method: "POST",
        body: JSON.stringify({ recipe: recipe, tags: data.tags })
      })
      toast.dismiss(toastId2)

      toast.success("Recipe Created!")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {" "}
      <Input
        value={url}
        onChange={e => setURL(e.target.value)}
        placeholder={"url"}
        style={{ fontSize: "16px" }}
      />
      <Button onClick={() => onScrapeUrl(url)}>Submit</Button>
    </div>
  )
}
