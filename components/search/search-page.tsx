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
import { saveRecipe, undo_vote, vote } from "@/db/recipes"
import { toast } from "sonner"
import { RecipeCard } from "../recipe/RecipeCard"
import { v4 as uuidv4 } from "uuid"
interface SearchPageProps {
  for_you?: Tables<"recipes2">[]
  user_id?: string
}

const SearchPage = ({ for_you, user_id }: SearchPageProps) => {
  const router = useRouter()
  const {
    votedRecipes,
    setVotedRecipes,
    generatedRecipes,
    isGenerating,
    setSettings
  } = useContext(FitpalAIContext)
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
  const doVote = async (vote_type: number, recipe: Tables<"recipes2">) => {
    if (!user_id) {
      return
    }
    // increase tottal votes in recipes 2 db
    const res = await fetch("api/recipe/update_recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipe: {
          ...recipe,
          total_votes: recipe.total_votes + vote_type
        }
      })
    })
    //add vote to votes db
    const vote_id = uuidv4()
    const votes_res = await vote(vote_id, user_id, recipe.id, vote_type)
    //update voted recipes in coontext

    setVotedRecipes([...votedRecipes, { id: vote_id, recipe_id: recipe.id,vote:vote_type }])
    //console.log("set context", votes_res)
  }
  const undoVote = async (vote_type: number, recipe: Tables<"recipes2">) => {
    // reduce tottal votes in recipes 2 db
    console.log("vtype", vote_type)
    const res = await fetch("api/recipe/update_recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipe: {
          ...recipe,
          total_votes: recipe.total_votes - vote_type
        }
      })
    })
    //delete vote from voted db

    for (const vote_json of votedRecipes) {
      if (vote_json.recipe_id === recipe.id) {
        const vote_id = vote_json.id
        const votes_res = await undo_vote(vote_id)
      }
    }

    //update votetd recipes in coontext
  }
  const renderRecipes = (recipes: Tables<"recipes2">[], title: string) => (
    <div className="w-full max-w-4xl py-28">
      <h2 className="mb-5 text-lg font-semibold">{title}</h2>
      <div
        role="status"
        className="grid  w-full max-w-4xl items-end gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {recipes.map(recipe => (
          <RecipeCard
            user_id={user_id}
            recipe={recipe}
            key={recipe.id}
            voteRecipe={(num: number) => {
              doVote(num, recipe)
            }}
            undoVote={(num: number) => undoVote(num, recipe)}
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
    <div className="hide-scrollbar relative flex size-full flex-col items-center overflow-y-auto sm:px-6">
      <h1 className="text-2xl font-bold mb-9 mt-24 text-left md:text-center">
        What ingredients do you have?
      </h1>
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
