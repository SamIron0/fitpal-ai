import { Tables } from "@/supabase/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface SearchResultProps {
  recipes: Tables<"recipes">[]
}

export const SearchResult = ({ recipes }: SearchResultProps) => {
  console.log("len,", recipes)
  return (
    <div className=" w-full flex flex-col">
      {recipes.map(recipe => (
        <h1>{recipe.name}</h1>
      ))}
    </div>
  )
}
