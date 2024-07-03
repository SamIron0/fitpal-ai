"use client"
import { Tables } from "@/supabase/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { MealDrawer } from "../meal/meal-drawer"
import { Clock } from "lucide-react"
import { convertTime } from "@/utils/helpers"

interface SearchResultProps {
  recipes: Tables<"recipes">[]
  query: string
}

export const SearchResult = ({ recipes, query }: SearchResultProps) => {
  console.log("len,", recipes)
  const [isOpen, setIsOpen] = useState<string>("0")

  const openDrawer = (id: string) => {
    setIsOpen(id)
  }
  const renderRecipes = (recipes: Tables<"recipes">[]) => (
    <div className="w-full py-6 max-w-4xl mx-auto ">
      <h1 className="mb-8 text-4xl font-semibold">{query}</h1>
      <p>{}</p>
      <div
        role="status"
        className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {recipes.map(recipe => (
          <div key={recipe.id} onClick={() => openDrawer(recipe.id)}>
            <MealDrawer recipe={recipe} isOpen={isOpen}>
              <div className="flex w-48 flex-col">
                {recipe.imgurl ? (
                  <img
                    src={`${recipe.imgurl}`}
                    className="border-1 mb-2 h-48 w-full rounded-lg border-input object-cover"
                    alt={recipe.name || "Recipe Image"}
                  />
                ) : (
                  <div className="border-1 mb-2 h-48 rounded-lg border-input bg-input p-2 py-10 text-black"></div>
                )}
                <p className="text-md w-full text-left">{recipe.name}</p>
                <div className="flex w-full text-xs font-light mt-1 items-center text-zinc-400">
                  <Clock className="w-4 h-4 mr-2" />
                  <p className="text-left">
                    {convertTime(recipe.total_time as unknown as number)}
                  </p>
                </div>
              </div>
            </MealDrawer>
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <div className=" w-full p-4 flex flex-col overflow-y-auto">
      {renderRecipes(recipes)}
    </div>
  )
}
