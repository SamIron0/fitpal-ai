"use client"
import Head from "next/head"
import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Clock, Search } from "lucide-react"
import { motion } from "framer-motion"
import { Brand } from "../ui/brand"
import { Tables } from "@/supabase/types"
import { createClient } from "@/lib/supabase/client"
import { FitpalAIContext } from "@/context/context"
import { SearchInput } from "./search-input"
import { MealDrawer } from "../meal/meal-drawer"
import { convertTime } from "@/utils/helpers"
import {
  IconArrowBigDown,
  IconArrowBigUp,
  IconClockHour10,
  IconDots
} from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { saveRecipe } from "@/db/recipes"
import { LoginDrawer } from "../login/login-drawer"

interface SearchPageProps {
  for_you?: Tables<"recipes2">[]
}

const SearchPage = ({ for_you }: SearchPageProps) => {
  const router = useRouter()
  const { profile, generatedRecipes, isGenerating, setSettings } =
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

  const bounceAnimation = {
    scale: [1, 1.2, 1],
    transition: { duration: 0.4 }
  }

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
  const [voteStatus, setVoteStatus] = useState("none") // 'none', 'upvoted', or 'downvoted'
  const [voteCount, setVoteCount] = useState(155)

  const handleVote = (voteType: any) => {
    if (voteStatus === voteType) {
      // If clicking the same vote type, remove the vote
      setVoteStatus("none")
      setVoteCount(voteType === "upvoted" ? voteCount - 1 : voteCount + 1)
    } else {
      // If changing vote or voting for the first time
      setVoteStatus(voteType)
      if (voteStatus === "none") {
        setVoteCount(voteType === "upvoted" ? voteCount + 1 : voteCount - 1)
      } else {
        setVoteCount(voteType === "upvoted" ? voteCount + 2 : voteCount - 2)
      }
    }
  }
  const renderRecipes = (recipes: Tables<"recipes2">[], title: string) => (
    <div className="w-full max-w-4xl py-28">
      <h2 className="mb-5 text-lg font-semibold">{title}</h2>
      <div
        role="status"
        className="grid w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {recipes.map(recipe => (
          <div
            key={recipe.idx}
            className="bg-black text-zinc-200 p-2 rounded-xl max-w-lg"
          >
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-semibold mb-1">{recipe.name}</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <IconDots className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {profile ? (
                    <DropdownMenuItem
                      onClick={() => saveRecipe(profile?.id, recipe.id)}
                    >
                      Save
                    </DropdownMenuItem>
                  ) : (
                    <LoginDrawer>
                      <DropdownMenuItem>Save</DropdownMenuItem>
                    </LoginDrawer>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="bg-teal-500 h-52 mb-1 rounded-xl"></div>
            <div className="flex flex-row text-zinc-400">
              <div className="flex border items-center border-zinc-600 rounded-2xl py-0.5 px-2">
                <div className="flex items-center">
                  <motion.div
                    whileTap={bounceAnimation}
                    className="cursor-pointer"
                  >
                    <IconArrowBigUp
                      className={`w-4 ${
                        voteStatus === "upvoted"
                          ? "text-purple-500 fill-purple-500"
                          : ""
                      }`}
                      onClick={() => handleVote("upvoted")}
                    />
                  </motion.div>
                  <span className="text-xs border-r border-zinc-600 pl-1 pr-2">
                    {voteCount}
                  </span>
                </div>
                <div className="pl-1">
                  <motion.div
                    whileTap={bounceAnimation}
                    className="cursor-pointer"
                  >
                    <IconArrowBigDown
                      className={`w-4 ${
                        voteStatus === "downvoted"
                          ? "text-purple-500 fill-purple-500"
                          : ""
                      }`}
                      onClick={() => handleVote("downvoted")}
                    />
                  </motion.div>
                </div>
              </div>
              <div className="flex w-full text-xs justify-end items-center">
                <IconClockHour10 className="mr-1 w-5 " />
                30 mins
              </div>
            </div>
          </div>
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
