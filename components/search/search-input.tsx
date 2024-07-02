"use client"
import { FitpalAIContext } from "@/context/context"
import { cn } from "@/lib/utils"
import { IconPlayerStopFilled, IconSend } from "@tabler/icons-react"
import { FC, useContext, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { createClient } from "@/lib/supabase/client"
import { LoginDrawer } from "../login/login-drawer"
import { v4 as uuidv4 } from "uuid"

interface SearchInputProps {}

export const SearchInput: FC<SearchInputProps> = ({}: SearchInputProps) => {
  const supabase = createClient()
  const [session, setSession] = useState<any>(null)
  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession()
      if (error) {
        console.error("Error getting session:", error)
      } else {
        setSession(session)
        // Do something with the session
      }
    }

    getSession()
  }, []) // Run the effect only once, when the component mounts

  const {
    userInput,
    isGenerating,
    setIsGenerating,
    setUserInput,
    setGeneratedRecipes,
    settings
  } = useContext(FitpalAIContext)

  useEffect(() => {
    const inputElement = chatInputRef.current
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown)
    }
    // Clean up event listener on component unmount
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [userInput])
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if (userInput) {
        generateMeals()
      }
    }
  }
  const { t } = useTranslation()

  const [isTyping, setIsTyping] = useState<boolean>(false)
  const chatInputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState<string>("")
  const generateMeals = async () => {
    setIsGenerating(true)
    const recipes = await fetch(
      "https://www.fitpalai.com/api/recipe/get_recipes",
      {
        method: "POST",
        body: JSON.stringify({
          input: userInput,
          diet: settings.diet,
          allergy: settings.allergies
        })
      }
    )

    if (!recipes.ok) {
      console.error("Error retrieving:", recipes)
    }
    setGeneratedRecipes(await recipes.json())
    setIsGenerating(false)
  }
  const handleInputChange = (event: any) => {
    setInput(event.target.value)

    setUserInput(event.target.value)
  }
  const handleSuggestionClick = (caption: string) => () => {
    setInput(caption)
    setUserInput(caption)
  }
  function SuggestionPill({ icon, caption }: any) {
    return (
      <button
        onClick={handleSuggestionClick(caption)}
        className=" m-1 rounded-md  border border-input px-2.5 py-1.5  font-medium text-gray-400 shadow-sm hover:bg-input focus:outline-none "
      >
        <div className="flex items-center">
          <span className="mr-1 text-md">{icon}</span>
          <p className="pl-1 text-xs ">{caption}</p>
        </div>
      </button>
    )
  }
  const registerClick = async () => {
    // TODO: Implement
    console.log("setting click", input)
    try {
      const res = await supabase.from("search_button_clicks").insert({
        id: uuidv4(),
        query: input || ""
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div className="relative mt-3 flex min-h-[60px] w-full items-center justify-center rounded-xl border-2 border-input">
        <input
          ref={chatInputRef}
          className="text-md min-w-3xl flex w-full resize-none rounded-md border-none bg-transparent py-2 pl-3 pr-14 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={t(`Asian Dinner ideas`)}
          onChange={handleInputChange}
          value={input}
          onCompositionStart={() => setIsTyping(true)}
          onCompositionEnd={() => setIsTyping(false)}
        />

        <div className="absolute bottom-[14px] right-3 flex cursor-pointer justify-center hover:opacity-50">
          {isGenerating ? (
            <IconPlayerStopFilled
              className="animate-pulse rounded bg-transparent p-1 hover:bg-background"
              onClick={() => {}}
              size={30}
            />
          ) : session ? (
            <IconSend
              className={cn(
                "rounded bg-primary p-1 text-secondary",
                !userInput ? "cursor-not-allowed opacity-50" : ""
              )}
              onClick={() => {
                if (!userInput) {
                  return
                }
                generateMeals()
              }}
              size={30}
            />
          ) : (
            <LoginDrawer>
              {" "}
              <IconSend
                onClick={() => {
                  registerClick()
                }}
                className={cn("rounded bg-primary p-1 text-secondary")}
                size={30}
              />
            </LoginDrawer>
          )}{" "}
        </div>
      </div>
      <div className="mt-3 grid w-full grid-cols-2">
        <SuggestionPill icon={"🍜"} caption="Pasta with chicken" />{" "}
        <SuggestionPill icon={"🧄"} caption="Garlic,onion,pork" />
        <SuggestionPill icon={"🥘"} caption="Jambalaya" />
        <SuggestionPill icon={"🥓"} caption="Breakfast with bacon" />
      </div>
    </>
  )
}
