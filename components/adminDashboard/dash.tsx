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
  recipe?: TablesInsert<"recipes">
  handleScrapeUrl: (url: string) => void
}
export default function Dash({ recipe, handleScrapeUrl }: Props) {
  const [url, setUrl] = useState("")
  return (
    <div className="my-12 flex w-full flex-col items-center p-4">
      <div className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in">
        <div className="my-12 flex w-full flex-col items-center p-4">
          <Input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder={"url"}
            style={{ fontSize: "16px" }}
          />
          <Button onClick={() => handleScrapeUrl(url)} className="mt-6">
            Scrape
          </Button>
        </div>
      </div>
      {recipe ? (
        <div className="mt-8 flex w-full  max-w-3xl flex-col justify-center border-2 p-2">
          <div>Name:{recipe.name}</div>
          <div>Description: {recipe.description}</div>
          <ul>
            {" "}
            Ingredients:
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}{" "}
          </ul>
          <div> protein:{recipe.protein}</div>
          <div> fats:{recipe.fats}</div>
          <div> carbs:{recipe.carbs}</div>
          <div> calories:{recipe.calories}</div>
          <ul>
            {" "}
            instructions:
            {recipe.instructions?.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
          <div> portions:{recipe.portions}</div>
          <div> cooking_time:{recipe.cooking_time}</div>
        </div>
      ) : null}{" "}
    </div>
  )
}
