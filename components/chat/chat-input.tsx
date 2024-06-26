"use client"
import { FitpalAIContext } from "@/context/context"
import useHotkey from "@/lib/hooks/use-hotkey"
import { cn } from "@/lib/utils"
import {
  IconBolt,
  IconCirclePlus,
  IconPlayerStopFilled,
  IconSend
} from "@tabler/icons-react"
import Image from "next/image"
import { FC, useContext, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { TextareaAutosize } from "../ui/textarea-autosize"
import { ChatCommandInput } from "./chat-command-input"
import { ChatFilesDisplay } from "./chat-files-display"
import { useChatHandler } from "./chat-hooks/use-chat-handler"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { LoginDrawer } from "../login/login-drawer"
interface ChatInputProps {}

export const ChatInput: FC<ChatInputProps> = ({}: ChatInputProps) => {
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
  const { handleStopMessage } = useChatHandler()
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
        className=" m-1 rounded-md border border-input px-2.5 py-0.5  text-xs font-medium text-gray-400"
      >
        <div className="flex items-center">
          {icon}
          <p className="pl-1">{caption}</p>
        </div>
      </button>
    )
  }
  return (
    <>
      <div className="flex flex-col flex-wrap justify-center gap-2">
        <ChatFilesDisplay />
      </div>

      <div className="relative mt-3 flex min-h-[60px] w-full items-center justify-center rounded-xl border-2 border-input">
        <div className="absolute bottom-[76px] left-0 max-h-[300px] w-full overflow-auto rounded-xl dark:border-none">
          <ChatCommandInput />
        </div>
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
              onClick={handleStopMessage}
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
                className={cn("rounded bg-primary p-1 text-secondary")}
                size={30}
              />
            </LoginDrawer>
          )}{" "}
        </div>
      </div>
      <div className="mt-3 grid w-full grid-cols-2">
        <SuggestionPill icon={"🍜"} caption="Pasta ideas with chicken" />{" "}
        <SuggestionPill icon={"🍜"} caption="Pasta ideas with chicken" />
        <SuggestionPill icon={"🍜"} caption="Pasta ideas with chicken" />
        <SuggestionPill icon={"🥓"} caption="Air fryer recipes for dinner" />
      </div>
    </>
  )
}
