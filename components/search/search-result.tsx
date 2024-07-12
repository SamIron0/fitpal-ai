"use client"
import { Tables, TablesInsert } from "@/supabase/types"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useRef, useState } from "react"
import { MealDrawer } from "../meal/meal-drawer"
import { Clock } from "lucide-react"
import { convertTime } from "@/utils/helpers"
import { useTranslation } from "react-i18next"
import { IconPlayerStopFilled, IconSend } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { FitpalAIContext } from "@/context/context"
import { RecipeCard } from "../recipe/RecipeCard"
import { v4 as uuidv4 } from "uuid"
import { toast } from "sonner"
import { saveRecipe, undo_vote, vote } from "@/db/recipes"
interface SearchResultProps {
  recipes: TablesInsert<"recipes2">[]
  query: string
  user_id: string | undefined
  text: string
}

export const SearchResult = ({
  user_id,
  recipes,
  query,
  text
}: SearchResultProps) => {
  const [isOpen, setIsOpen] = useState<string>("0")
  const { votedRecipes, setVotedRecipes } = useContext(FitpalAIContext)
  function decodeURLComponent(urlComponent: string) {
    // Decode the URL component
    const decodedString = decodeURIComponent(urlComponent).replace(/-/g, " ") // Replace hyphens with spaces

    // Capitalize the first letter of the first word
    const capitalizedString =
      decodedString.charAt(0).toUpperCase() + decodedString.slice(1)

    return capitalizedString
  }

  const openDrawer = (id: string) => {
    setIsOpen(id)
  }
  const router = useRouter()

  const doVote = async (
    vote_type: number,
    recipe: TablesInsert<"recipes2">
  ) => {
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
          total_votes: recipe?.total_votes ? recipe.total_votes + vote_type : 0
        }
      })
    })
    //add vote to votes db
    const vote_id = uuidv4()
    const votes_res = await vote(vote_id, user_id, recipe.id, vote_type)
    //update voted recipes in coontext

    setVotedRecipes([
      ...votedRecipes,
      { id: vote_id, recipe_id: recipe.id, vote: vote_type }
    ])
    //console.log("set context", votes_res)
  }
  const undoVote = async (
    vote_type: number,
    recipe: TablesInsert<"recipes2">
  ) => {
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
          total_votes: recipe?.total_votes ? recipe.total_votes - vote_type : 0
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
  const renderRecipes = (recipes: TablesInsert<"recipes2">[]) => (
    <div className="w-full mt-6 pb-12 max-w-4xl mx-auto ">
      <h1 className="mb-8 text-2xl font-semibold">
        {decodeURLComponent(query)}
      </h1>
      <div
        role="status"
        className="grid items-end w-full max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
  const [input, setInput] = useState<string>("")
  const chatInputRef = useRef<HTMLInputElement>(null)
  const onSearch = (query: string) => {
    const formattedQuery = encodeURIComponent(
      query.trim().toLowerCase().replace(/\s+/g, "-").replace(/\./g, "-")
    )
    router.push(`/search/${formattedQuery}`)
  }
  useEffect(() => {
    const inputElement = chatInputRef.current
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [input])

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if (input) {
        onSearch(input)
      }
    }
  }

  const handleInputChange = (event: any) => {
    setInput(event.target.value)
  }
  const { t } = useTranslation()
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const { isGenerating, setIsGenerating, setGeneratedRecipes, settings } =
    useContext(FitpalAIContext)
  return (
    <div className=" w-full p-4 flex flex-col overflow-y-auto">
      <div className="fixed bottom-4 left-4 right-4 flex justify-center">
        <div className="bg-input text-gray-200 w-full max-w-xl rounded-full py-2 px-2 border flex items-center space-x-2 shadow-lg  transition-colors">
          <input
            className="text-md min-w-3xl flex w-full resize-none rounded-md border-none bg-transparent py-2 pl-3 pr-14 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={t(`Search`)}
            onChange={handleInputChange}
            value={input}
            onCompositionStart={() => setIsTyping(true)}
            onCompositionEnd={() => setIsTyping(false)}
          />

          <div className=" bottom-[14px] flex cursor-pointer justify-center hover:opacity-50">
            {isGenerating ? (
              <IconPlayerStopFilled
                className="animate-pulse rounded bg-transparent p-1 hover:bg-background"
                onClick={() => {}}
                size={30}
              />
            ) : (
              <IconSend
                className={cn(
                  "rounded-full w-9 h-9 bg-primary p-1 text-secondary",
                  !input ? "cursor-not-allowed opacity-50" : ""
                )}
                onClick={() => {
                  if (!input) {
                    return
                  }
                  onSearch(input)
                }}
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      {renderRecipes(recipes)}
    </div>
  )
}
