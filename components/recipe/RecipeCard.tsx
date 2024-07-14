"use client"
import Image from "next/image"
import { Tables, TablesInsert } from "@/supabase/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import {
  IconArrowBigDown,
  IconArrowBigUp,
  IconClockHour10,
  IconDeviceFloppy,
  IconDots
} from "@tabler/icons-react"
import { LoginDrawer } from "../login/login-drawer"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useContext, useEffect, useState } from "react"
import { getTotalVotes, hasVoted, saveRecipe } from "@/db/recipes"
import { FitpalAIContext } from "@/context/context"
import { supabase } from "@/lib/supabase/browser-client"
import { convertTime } from "@/utils/helpers"
import { MealDrawer } from "../meal/meal-drawer"
interface RecipeCardProps {
  user_id: string | undefined
  recipe: TablesInsert<"recipes2">
  onSave: (recipe_id: string) => void
  voteRecipe: (num: number) => void
  undoVote: (num: number) => void
}

export const RecipeCard = ({
  recipe,
  onSave,
  voteRecipe,
  undoVote,
  user_id
}: RecipeCardProps) => {
  const { votedRecipes, setVotedRecipes } = useContext(FitpalAIContext)
  const [voteCount, setVoteCount] = useState(recipe.total_votes || 0)
  const [vote, setVote] = useState(0)
  useEffect(() => {
    const getVotes = async () => {
      votedRecipes.map(r => r.recipe_id === recipe.id && setVote(r.vote))
      const res = await getTotalVotes(recipe.id)
      setVoteCount(res)
    }
    getVotes()
  }, [votedRecipes])
  const bounceAnimation = {
    scale: [1, 1.2, 1],
    transition: { duration: 0.4 }
  }

  const { profile } = useContext(FitpalAIContext)

  const onVote = async (num: number) => {
    if (vote === num && vote !== 0) {
      setVote(0)
      setVoteCount(voteCount - num)
      await undoVote(num)
      return
    } else if (vote === 0) {
      await voteRecipe(num)
      setVoteCount(voteCount + num)
      setVote(num)
      return
    } else {
      await undoVote(vote)
      await voteRecipe(num)
      setVoteCount(voteCount + num * 2)
      setVote(num)
      return
    }
  }

  return (
    <div
      key={recipe.id}
      className="bg-black mx-auto w-full text-zinc-200  rounded-xl max-w-lg"
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
              <DropdownMenuItem>
                <div
                  className="cursor-pointer w-full text-left flex"
                  onClick={() => onSave(recipe.id)}
                >
                  <IconDeviceFloppy className="mr-1" size={20} /> Save
                </div>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onSelect={e => e.preventDefault()}>
                <LoginDrawer>
                  <div className="cursor-pointer w-full text-left">Save</div>
                </LoginDrawer>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {profile ? (
        <>
          <MealDrawer recipe={recipe} user_id={user_id}>
            {recipe.imgurl ? (
              <Image
                src={recipe.imgurl}
                alt={recipe.name || "food-photo"}
                className="border-1 mb-2 w-full h-52  rounded-lg border-input object-cover"
              />
            ) : (
              <div className="bg-input h-52 mb-1 rounded-xl"></div>
            )}
          </MealDrawer>
          <div className="flex flex-row justify-between mb-2">
            <div className="flex flex-row text-zinc-400">
              <div className="flex border items-center border-zinc-600 rounded-2xl py-0.5 px-2">
                <div className="flex items-center">
                  <motion.div
                    whileTap={bounceAnimation}
                    className="cursor-pointer  focus: outline-none"
                  >
                    <IconArrowBigUp
                      className={`w-4 ${
                        vote === 1 ? "text-fuchsia-500 fill-fuchsia-500" : ""
                      }`}
                      onClick={() => onVote(1)}
                    />
                  </motion.div>
                  <span className="text-xs border-r border-zinc-600 pl-1 pr-2">
                    {voteCount}
                  </span>
                </div>
                <div className="pl-1">
                  <motion.div
                    whileTap={bounceAnimation}
                    className="cursor-pointer focus: outline-none"
                  >
                    <IconArrowBigDown
                      className={`w-4 ${
                        vote === -1 ? "text-zinc-500 fill-zinc-500" : ""
                      }`}
                      onClick={() => onVote(-1)}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="flex w-full text-xs text-zinc-500 justify-end items-center">
              <IconClockHour10 className="mr-1 w-5 " />
              {convertTime(recipe.total_time)}
            </div>
          </div>
        </>
      ) : (
        <>
          <MealDrawer recipe={recipe}>
            {recipe.imgurl ? (
              <Image
                src={recipe.imgurl}
                alt={recipe.name || "food-photo"}
                className="border-1 mb-2 w-full h-52  rounded-lg border-input object-cover"
              />
            ) : (
              <div className="bg-input h-52 mb-1 rounded-xl"></div>
            )}
          </MealDrawer>
          <LoginDrawer>
            <div className="flex flex-row justify-between mb-2">
              <div className="flex border items-center border-zinc-600 rounded-2xl py-0.5 px-2">
                <div className="flex items-center">
                  <motion.div
                    whileTap={bounceAnimation}
                    className="cursor-pointer  focus: outline-none"
                  >
                    <IconArrowBigUp className={`w-4 `} />
                  </motion.div>
                  <span className="text-xs border-r border-zinc-600 pl-1 pr-2">
                    {voteCount}
                  </span>
                </div>
                <div className="pl-1">
                  <motion.div
                    whileTap={bounceAnimation}
                    className="cursor-pointer  focus: outline-none"
                  >
                    <IconArrowBigDown className={`w-4 `} />
                  </motion.div>
                </div>
              </div>
              <div className="flex w-full text-xs justify-end items-center">
                <IconClockHour10 className="mr-1 w-5 " />
                {convertTime(recipe.total_time)}
              </div>
            </div>
          </LoginDrawer>
        </>
      )}
    </div>
  )
}
