"use client"
import { ChatInput } from "@/components/chat/chat-input"
import { MealDrawer } from "@/components/meal/meal-drawer"
import { Brand } from "@/components/ui/brand"
import { FitpalAIContext } from "@/context/context"
import { getSettingsByUserId } from "@/db/settings"
import { createClient } from "@/lib/supabase/client"
import { Tables } from "@/supabase/types"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function SearchPage() {
  const { generatedRecipes, isGenerating } = useContext(FitpalAIContext)
  const [forYou, setForYou] = useState<Tables<"recipes">[]>()
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState("0")
  const openDrawer = (id: string) => {
    setIsOpen(id)
  }
  const { setSettings } = useContext(FitpalAIContext)

  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()
  useEffect(() => {
    ;(async () => {
      const session = (await supabase.auth.getSession()).data.session

      if (session) {
        const settings = await getSettingsByUserId(session.user.id)
        setSettings(settings)
      }
      setLoading(false)

      const recipes = await fetch("/api/for_you", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await recipes.json()
      setForYou(data.for_you)
    })()
  }, [])
  const renderSkeleton = () => {
    return Array.from({ length: 13 }, (_, n) => (
      <div
        key={n}
        className="border-1 size-48 rounded-lg border-gray-300 bg-input p-2 py-10 text-black"
      ></div>
    ))
  }

  return (
    <div className="hide-scrollbar relative flex size-full flex-col items-center overflow-y-auto px-4 sm:px-6">
      <div className="top-50% left-50%  -translate-x-50% -translate-y-50% mb-9  mt-32 lg:mt-24">
        <Brand theme={theme === "dark" ? "dark" : "light"} />
      </div>

      <div className="w-full max-w-md items-end pb-3  pt-0 sm:pb-8  sm:pt-5 lg:max-w-xl">
        <ChatInput />
      </div>
      {isGenerating ? (
        <div className="w-full max-w-4xl py-28">
          <p className="mb-5 text-2xl font-semibold">Best Results</p>

          <div
            role="status"
            className="grid w-full max-w-4xl animate-pulse grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {renderSkeleton()}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
