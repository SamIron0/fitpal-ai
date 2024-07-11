"use client"
import Head from "next/head"
import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Search } from "lucide-react"
import { Brand } from "../ui/brand"
import { Tables } from "@/supabase/types"
import { FitpalAIContext } from "@/context/context"
import { SearchInput } from "./search-input"
import { saveRecipe, vote } from "@/db/recipes"
import { toast } from "sonner"
import { RecipeCard } from "../recipe/RecipeCard"

interface SearchPageProps {
  for_you?: Tables<"recipes2">[]
  user_id?: string
}

const SearchPage = ({ for_you, user_id }: SearchPageProps) => {
  const router = useRouter()
  const { generatedRecipes, isGenerating, setSettings } =
    useContext(FitpalAIContext)
  const [forYou, setForYou] = useState<Tables<"recipes2">[]>(for_you || [])
  const { theme } = useTheme()
  const [noresults, setNoResults] = useState(false)

  const renderSkeleton = () =>
    Array.from({ length: 8 }, (_, n) => (
      <div
        key={n}
        className="border-1 size-48 rounded-lg border-zinc-300 bg-input p-2 py-10 text-black"
      ></div>
    ))

  const NoResultsFound = () => (
    <div className="flex max-w-4xl py-28 flex-col items-center justify-center w-full text-zinc-100">
      <Search size={64} className="text-zinc-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
      <p className="text-center mb-4">
        We couldn&apos;t find any recipes matching your search.
      </p>
      <p className="text-center text-sm text-zinc-400">
        Try adjusting your search terms or browse our categories for
        inspiration.
      </p>
    </div>
  )
  const save = async (recipe_id: string) => {
    if (!user_id) {
      return
    }
    const res = await saveRecipe(user_id, recipe_id)
    if (typeof res === "string") {
      toast.success(res)
    } else {
      toast.error("Failed to save")
    }
  }
  const upvote = async (recipe_id: string) => {
    if (!user_id) {
      return
    }
    const res = await fetch(`/api/recipe/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vote: 1,
        recipe_id
      })
    })
    const json = await res.json()
    if (json.error) {
      console.log(json.error)
    }

    return
  }
  const downvoteRecipe = async (recipe_id: string) => {
    if (!user_id) {
      return
    }
    const res = await fetch(`/api/recipe/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        vote: -1,
        recipe_id
      })
    })
    const json = await res.json()
    if (json.error) {
      console.log(json.error)
    }
    return
  }
  const renderRecipes = (recipes: Tables<"recipes2">[], title: string) => (
    <div className="w-full max-w-4xl py-28">
      <h2 className="mb-5 text-lg font-semibold">{title}</h2>
      <div
        role="status"
        className="grid w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {recipes.map(recipe => (
          <RecipeCard
            recipe={recipe}
            key={recipe.id}
            upvoteRecipe={() => {
              upvote(recipe.id)
            }}
            downvoteRecipe={() => {
              downvoteRecipe(recipe.id)
            }}
            onSave={recipe_id => save(recipe_id)}
          />
        ))}
      </div>
    </div>
  )
  const onSearch = (query: string) => {
    const formattedQuery = encodeURIComponent(
      query.trim().toLowerCase().replace(/\s+/g, "-").replace(/\./g, "-")
    )

    router.push(`/search/${formattedQuery}`)
  }
  return (
    <div className="hide-scrollbar relative flex size-full flex-col items-center overflow-y-auto px-4 sm:px-6">
      <div className="top-50% left-50% -translate-x-50% -translate-y-50% mb-9 mt-32 lg:mt-24">
        <Brand theme={theme === "dark" ? "dark" : "light"} />
      </div>
      <div className="w-full max-w-md items-end pb-3 pt-0 sm:pb-8 sm:pt-5 lg:max-w-xl">
        <h1 className="visually-hidden">
          Find Recipes from Ingredients You Have
        </h1>
        <p className="visually-hidden">
          Enter the ingredients you have, and we will help you find delicious
          recipes in no time. Whether you have chicken, pasta, or veggies, we
          have got you covered.
        </p>
        <SearchInput onSearch={onSearch} />
      </div>
      {isGenerating ? (
        <div className="w-full max-w-4xl py-28">
          <h2 className="mb-5 text-2xl font-semibold">Best Results</h2>
          <div
            role="status"
            className="grid w-full max-w-4xl animate-pulse gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {renderSkeleton()}
          </div>
        </div>
      ) : noresults ? (
        <>{NoResultsFound()}</>
      ) : generatedRecipes.length > 0 ? (
        renderRecipes(generatedRecipes, "Best Results")
      ) : (
        <div className="w-full max-w-4xl">
          {forYou.length > 0 ? (
            renderRecipes(forYou, "Recents")
          ) : (
            <div className="w-full max-w-4xl py-28">
              <h2 className="mb-5 text-2xl font-semibold">Recents</h2>
              <div
                role="status"
                className="grid w-full max-w-4xl animate-pulse  gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {renderSkeleton()}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchPage
