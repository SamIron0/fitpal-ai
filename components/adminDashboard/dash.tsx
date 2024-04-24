"use client"

import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axios from "axios"
import { TablesInsert } from "@/supabase/types"
import { v4 as uuidv4 } from "uuid"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
interface Props {
  onScrapeUrl: (url: string) => void
}
export default function Dash() {
  const [url, setURL] = useState("") // add this line
  const [createdRecipe, setCreatedRecipe] =
    useState<TablesInsert<"recipes"> | null>({} as any)

  const supabase = createClient()
  const router = useRouter()
  useEffect(() => {
    ;(async () => {
      const session = (await supabase.auth.getSession()).data.session
      if (!session) {
        router.push("/login")
      }
    })()
  }, [])
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
      const toastId2 = toast.loading("Saving Recipe")
      // call api to create recipe
      var response = await fetch("api/recipe/create_recipe", {
        method: "POST",
        body: JSON.stringify({ recipe: recipe, tags: data.tags })
      })

      toast.dismiss(toastId2)

      toast.success("Saving Created!")

      setCreatedRecipe(recipe)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-4">
      {" "}
      <Input
        value={url}
        onChange={e => setURL(e.target.value)}
        placeholder={"url"}
        style={{ fontSize: "16px" }}
      />
      <Button onClick={() => onScrapeUrl(url)}>Submit</Button>
      {createdRecipe ? (
        <div className="mt-8 flex w-full  max-w-3xl flex-col items-center justify-center border-2 p-2">
          <div>{createdRecipe.name}</div>
          <div>{createdRecipe.description}</div>
          <div>{createdRecipe.ingredients}</div>
          <div>{createdRecipe.imgurl}</div>
          <div>{createdRecipe.protein}</div>
          <div>{createdRecipe.fats}</div>
          <div>{createdRecipe.carbs}</div>
          <div>{createdRecipe.calories}</div>
          <div>{createdRecipe.instructions}</div>
          <div>{createdRecipe.portions}</div>
          <div>{createdRecipe.cooking_time}</div>
        </div>
      ) : null}{" "}
    </div>
  )
}
