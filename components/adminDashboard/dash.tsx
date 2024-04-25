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
import { urlExists } from "@/db/recipes"
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
      if (session?.user.email !== "ekaronke@gmail.com") {
        router.push("/")
      }
    })()
  }, [])
  const onScrapeUrl = async (url: string) => {
    const status = await urlExists(url)
    const toastId = toast.loading("Scraping")

    var endpoint =
      " https://7a38-2604-3d09-aa7a-95e0-9ddf-5d76-dfb9-fa06.ngrok-free.app/scrape"

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
    <div className="my-12 flex w-full flex-col items-center p-4">
      {" "}
      <Input
        value={url}
        onChange={e => setURL(e.target.value)}
        placeholder={"url"}
        style={{ fontSize: "16px" }}
      />
      <Button className="mt-4 px-10" onClick={() => onScrapeUrl(url)}>
        Submit
      </Button>
      {createdRecipe ? (
        <div className="mt-8 flex w-full  max-w-3xl flex-col justify-center border-2 p-2">
          <div>Name:{createdRecipe.name}</div>
          <div>Description: {createdRecipe.description}</div>
          <ul>
            {" "}
            Ingredients:
            {createdRecipe.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}{" "}
          </ul>
          <div> protein:{createdRecipe.protein}</div>
          <div> fats:{createdRecipe.fats}</div>
          <div> carbs:{createdRecipe.carbs}</div>
          <div> calories:{createdRecipe.calories}</div>
          <ul>
            {" "}
            instructions:
            {createdRecipe.instructions?.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
          <div> portions:{createdRecipe.portions}</div>
          <div> cooking_time:{createdRecipe.cooking_time}</div>
        </div>
      ) : null}{" "}
    </div>
  )
}
