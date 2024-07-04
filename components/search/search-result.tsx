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

interface SearchResultProps {
  recipes: TablesInsert<"recipes">[]
  query: string
  text: string
}

export const SearchResult = ({ recipes, query, text }: SearchResultProps) => {
  const [isOpen, setIsOpen] = useState<string>("0")
  function decodeURLComponent(urlComponent: string) {
    // Decode the URL component
    const decodedString = decodeURIComponent(urlComponent).replace(/-/g, " ") // Replace hyphens with spaces

    // Capitalize the first letter of each word
    const capitalizedString = decodedString.replace(/\b\w/g, char =>
      char.toUpperCase()
    )

    return capitalizedString
  }

  const openDrawer = (id: string) => {
    setIsOpen(id)
  }
  const router = useRouter()
  const renderRecipes = (recipes: TablesInsert<"recipes">[]) => (
    <div className="w-full py-6 max-w-4xl mx-auto ">
      <h1 className="mb-8 text-4xl font-semibold">
        {decodeURLComponent(query)}
      </h1>
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
  const [input, setInput] = useState<string>("")
  const chatInputRef = useRef<HTMLInputElement>(null)
  const onSearch = (query: string) => {
    const formattedQuery = encodeURIComponent(
      query.trim().toLowerCase().replace(/\s+/g, "-")
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
        <div className="bg-input text-gray-200 w-full max-w-xl rounded-full py-2 px-4 border border-zinc-500 flex items-center space-x-2 shadow-lg  transition-colors">
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
