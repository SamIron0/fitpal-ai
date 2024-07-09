"use client"
import Head from "next/head"
import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Clock, Search } from "lucide-react"

import { Brand } from "../ui/brand"
import { Tables } from "@/supabase/types"
import { createClient } from "@/lib/supabase/client"
import { FitpalAIContext } from "@/context/context"
import { SearchInput } from "./search-input"
import { MealDrawer } from "../meal/meal-drawer"
import { convertTime } from "@/utils/helpers"

interface SearchPageProps {
  for_you?: Tables<"recipes2">[]
}

const SearchPage = ({ for_you }: SearchPageProps) => {
  const router = useRouter()
  const { generatedRecipes, isGenerating, setSettings } =
    useContext(FitpalAIContext)
  const [forYou, setForYou] = useState<Tables<"recipes2">[]>(for_you || [])
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState<string>("0")
  const [noresults, setNoResults] = useState(false)

  const openDrawer = (id: string) => {
    setIsOpen(id)
  }

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

  const renderRecipes = (recipes: Tables<"recipes2">[], title: string) => (
    <div className="w-full max-w-4xl py-28">
      <h2 className="mb-5 text-2xl font-semibold">{title}</h2>
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
                  {recipe.total_time && (
                    <p className="text-left">
                      {`${recipe.total_time[0]}hrs ${recipe.total_time[1]}mins`}
                    </p>
                  )}
                </div>
              </div>
            </MealDrawer>
          </div>
        ))}
      </div>
    </div>
  )
  const onSearch = (query: string) => {
    const formattedQuery = encodeURIComponent(
      query.trim().toLowerCase().replace(/\s+/g, "-")
    )

    router.push(`/${formattedQuery}`)
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
            className="grid w-full max-w-4xl animate-pulse grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
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
            renderRecipes(forYou, "For You")
          ) : (
            <div className="w-full max-w-4xl py-28">
              <h2 className="mb-5 text-2xl font-semibold">For You</h2>
              <div
                role="status"
                className="grid w-full max-w-4xl animate-pulse grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
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
