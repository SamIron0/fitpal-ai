"use client"
import { FitpalAIContext } from "@/context/context"
import { cn } from "@/lib/utils"
import { IconPlayerStopFilled, IconSend } from "@tabler/icons-react"
import { FC, useContext, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LoginDrawer } from "../login/login-drawer"
import { v4 as uuidv4 } from "uuid"
import { useParams } from "next/navigation"
interface SearchInputProps {
  onSearch: (query: string) => void
}

export const SearchInput: FC<SearchInputProps> = ({ onSearch }) => {
  const supabase = createClient()
  const params = useParams()
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [input, setInput] = useState<string>("")
  const chatInputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const { isGenerating, setIsGenerating, setGeneratedRecipes, settings } =
    useContext(FitpalAIContext)

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

  const handleSuggestionClick = (caption: string) => () => {
    setInput(caption)
  }

  function SuggestionPill({ icon, caption }: any) {
    return (
      <button
        onClick={handleSuggestionClick(caption)}
        className="m-1 rounded-md border border-input p-1 font-medium text-zinc-400 shadow-sm hover:bg-input focus:outline-none"
      >
        <div className="flex items-center">
          <span className="mr-1 py-0.5 px-1 bg-purple-400 hover:bg-none rounded-sm text-lg">{icon}</span>
          <p className="pl-1 text-xs">{caption}</p>
        </div>
      </button>
    )
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
          ) : (
            <IconSend
              className={cn(
                "rounded bg-primary p-1 text-secondary",
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
      <div className="mt-3 grid w-full grid-cols-2">
        <SuggestionPill icon={"🍜"} caption="Pasta with chicken" />
        <SuggestionPill icon={"🧄"} caption="Garlic, onion, pork" />
        <SuggestionPill icon={"🥘"} caption="Jambalaya" />
        <SuggestionPill icon={"🥓"} caption="Breakfast with bacon" />
      </div>
    </>
  )
}
