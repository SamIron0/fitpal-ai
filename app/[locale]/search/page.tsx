"use client"

import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { ChatInput } from "@/components/chat/chat-input"
import { MealDrawer } from "@/components/meal/meal-drawer"
import { Brand } from "@/components/ui/brand"
import { FitpalAIContext } from "@/context/context"
import { getSettingsByUserId } from "@/db/settings"
import { createClient } from "@/lib/supabase/client"
import { Tables } from "@/supabase/types"

export default function SearchPage() {
  const { generatedRecipes, isGenerating, setSettings } =
    useContext(FitpalAIContext)
  const [forYou, setForYou] = useState<Tables<"recipes">[]>([])
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState<string>("0")
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (session) {
        const settings = await getSettingsByUserId(session.user.id)
        setSettings(settings)
      }

      setLoading(false)

      const response = await fetch("/api/for_you", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()
      setForYou(data.for_you)
    }

    fetchData()
  }, [])

  const openDrawer = (id: string) => {
    setIsOpen(id)
  }

  const renderSkeleton = () => {
    return Array.from({ length: 8 }, (_, n) => (
      <div
        key={n}
        className="border-1 size-48 rounded-lg border-gray-300 bg-input p-2 py-10 text-black"
      ></div>
    ))
  }

  const renderRecipes = (recipes: Tables<"recipes">[], title: string) => (
    <div className="w-full max-w-4xl ">
      <p className="mb-5 text-2xl font-semibold">{title}</p>
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
                    src={`/images/${recipe.imgurl}`}
                    className="border-1 mb-2 h-48 w-full rounded-lg border-input object-cover"
                    alt={recipe.name || "Recipe Image"}
                  />
                ) : (
                  <div className="border-1 mb-2 h-48 rounded-lg border-input bg-zinc-600 p-2 py-10 text-black"></div>
                )}
                <p className="text-md w-full text-left">{recipe.name}</p>
              </div>
            </MealDrawer>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="hide-scrollbar relative flex size-full flex-col items-center overflow-y-auto px-4 sm:px-6">
      <div className="top-50% left-50% -translate-x-50% -translate-y-50% mb-9 mt-32 lg:mt-24">
        <Brand theme={theme === "dark" ? "dark" : "light"} />
      </div>
      <div className="w-full max-w-md items-end pb-3 pt-0 sm:pb-8 sm:pt-5 lg:max-w-xl">
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
        <>
          {generatedRecipes.length > 0 ? (
            renderRecipes(generatedRecipes, "Best Results")
          ) : (
            <div className="w-full max-w-4xl py-28 ">
              {forYou.length > 0 ? (
                renderRecipes(forYou, "For You")
              ) : (
                <div className="w-full max-w-4xl ">
                  <p className="mb-5 text-2xl font-semibold">For You</p>
                  <div
                    role="status"
                    className="grid w-full  max-w-4xl animate-pulse grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                  >
                    {renderSkeleton()}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
