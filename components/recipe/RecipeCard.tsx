"use client"
import { Tables } from "@/supabase/types"
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
import { useContext, useState } from "react"
import { saveRecipe } from "@/db/recipes"
import { FitpalAIContext } from "@/context/context"
import { supabase } from "@/lib/supabase/browser-client"
import { convertTime } from "@/utils/helpers"
interface RecipeCardProps {
  recipe: Tables<"recipes2">
  onSave: (recipe_id: string) => void
  upvoteRecipe: () => void
  downvoteRecipe: () => void
}

export const RecipeCard = ({
  recipe,
  onSave,
  upvoteRecipe,
  downvoteRecipe
}: RecipeCardProps) => {
  const [voteStatus, setVoteStatus] = useState("none") // 'none', 'upvoted', or 'downvoted'
  const [voteCount, setVoteCount] = useState(recipe.upvotes - recipe.downvotes)
  const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false)
  const bounceAnimation = {
    scale: [1, 1.2, 1],
    transition: { duration: 0.4 }
  }

  const { profile } = useContext(FitpalAIContext)

  const handleUpvote = () => {
    if (voteStatus === "upvoted") {
      setVoteStatus("none")
      setVoteCount(voteCount - 1)
    } else {
      setVoteStatus("upvoted")
      setVoteCount(voteStatus === "downvoted" ? voteCount + 2 : voteCount + 1)
      if (voteStatus === "downvoted") {
        setVoteStatus("upvoted")
      }
    }
    upvoteRecipe()
  }

  const handleDownvote = () => {
    if (voteStatus === "downvoted") {
      setVoteStatus("none")
      setVoteCount(voteCount + 1)
    } else {
      setVoteStatus("downvoted")
      setVoteCount(voteStatus === "upvoted" ? voteCount - 2 : voteCount - 1)
      if (voteStatus === "upvoted") {
        setVoteStatus("downvoted")
      }
    }
    downvoteRecipe()
  }

  return (
    <div
      key={recipe.id}
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
              <DropdownMenuItem>
                <div
                  className="cursor-pointer w-full text-left"
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

      <div className="bg-teal-500 h-52 mb-1 rounded-xl"></div>
      <div className="flex flex-row text-zinc-400">
        {profile ? (
          <div className="flex border items-center border-zinc-600 rounded-2xl py-0.5 px-2">
            <div className="flex items-center">
              <motion.div whileTap={bounceAnimation} className="cursor-pointer">
                <IconArrowBigUp
                  className={`w-4 ${
                    voteStatus === "upvoted"
                      ? "text-purple-500 fill-purple-500"
                      : ""
                  }`}
                  onClick={handleUpvote}
                />
              </motion.div>
              <span className="text-xs border-r border-zinc-600 pl-1 pr-2">
                {voteCount}
              </span>
            </div>
            <div className="pl-1">
              <motion.div whileTap={bounceAnimation} className="cursor-pointer">
                <IconArrowBigDown
                  className={`w-4 ${
                    voteStatus === "downvoted"
                      ? "text-zinc-500 fill-zinc-500"
                      : ""
                  }`}
                  onClick={handleDownvote}
                />
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="flex border items-center border-zinc-600 rounded-2xl py-0.5 px-2">
            <LoginDrawer>
              <div className="flex items-center">
                <motion.div
                  whileTap={bounceAnimation}
                  className="cursor-pointer"
                >
                  <IconArrowBigUp
                    className={`w-4 ${
                      voteStatus === "upvoted"
                        ? "text-fuscia-500 fill-fuscia-500"
                        : ""
                    }`}
                    onClick={handleUpvote}
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
                    onClick={handleDownvote}
                  />
                </motion.div>
              </div>
            </LoginDrawer>
          </div>
        )}
        <div className="flex w-full text-xs justify-end items-center">
          <IconClockHour10 className="mr-1 w-5 " />
          {convertTime(recipe.total_time)}
        </div>
      </div>
    </div>
  )
}
