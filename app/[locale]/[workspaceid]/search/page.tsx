"use client"

import { ChatInput } from "@/components/chat/chat-input"
import { MealDrawer } from "@/components/meal/meal-drawer"
import { Brand } from "@/components/ui/brand"
import { FitpalAIContext } from "@/context/context"
import { Tables } from "@/supabase/types"
import { useTheme } from "next-themes"
import { useContext, useEffect, useState } from "react"

export default function ChatPage() {
  const { generatedRecipes, isGenerating } = useContext(FitpalAIContext)
  const [forYou, setForYou] = useState<Tables<"recipes">[]>()
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState("0")
  const openDrawer = (id: string) => {
    setIsOpen(id)
  }
  useEffect(() => {
    const getRecipes = async () => {
      const recipes = await fetch("/api/for_you", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await recipes.json()
      setForYou(data.for_you)
    }

    getRecipes()
  }, [])
  const renderSkeleton = () => {
    return Array.from({ length: 13 }, (_, n) => (
      <div
        key={n}
        className="border-1 size-48 rounded-lg border-gray-300 bg-gray-600 p-2 py-10 text-black"
      ></div>
    ))
  }

  return (
    <div className="hide-scrollbar relative flex size-full flex-col items-center overflow-y-auto px-4 sm:px-6">
      <div className="top-50% left-50%  -translate-x-50% -translate-y-50% mb-9  mt-32">
        <Brand theme={theme === "dark" ? "dark" : "light"} />
      </div>

      <div className="w-full max-w-md items-end  pb-3 pt-0  sm:pb-8 sm:pt-5">
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
        <div className="w-full max-w-4xl py-28">
          {generatedRecipes[0] ? (
            <>
              <p className="mb-5 text-3xl font-semibold">Best Results</p>
              <div
                role="status"
                className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
              >
                {generatedRecipes?.map(recipe => (
                  <div key={recipe.id} onClick={() => openDrawer(recipe.id)}>
                    <MealDrawer recipe={recipe} isOpen={isOpen}>
                      <div className="flex w-48 flex-col ">
                        {recipe.imgurl ? (
                          <img
                            src={"/images/" + recipe.imgurl}
                            className="border-1 mb-2 h-48 w-full rounded-lg border-input object-cover"
                            alt={recipe.name || "Recipe Image"}
                          />
                        ) : (
                          <div className="border-1 mb-2 h-48 rounded-lg border-input bg-gray-600 p-2 py-10 text-black"></div>
                        )}

                        <p className="text-md w-full text-left">
                          {recipe.name}
                        </p>
                      </div>
                    </MealDrawer>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full max-w-4xl py-28">
              <p className="mb-5 text-3xl font-semibold">For You</p>
              <div
                role="status"
                className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
              >
                {forYou?.map(recipe => (
                  <div
                    key={recipe.name}
                    className="flex w-48 flex-col "
                    onClick={() => openDrawer(recipe.id)}
                  >
                    <MealDrawer recipe={recipe} isOpen={isOpen}>
                      <div className="flex w-48 flex-col ">
                        {recipe.imgurl ? (
                          <img
                            src={"/images/" + recipe.imgurl}
                            className="mb-2 h-48 rounded-lg border  object-cover"
                            alt={recipe.name || "Recipe Image"}
                          />
                        ) : (
                          <div className="mb-2 h-48 rounded-lg border  bg-gray-600 p-2 py-10 text-black"></div>
                        )}

                        <p className="text-md w-full text-left">
                          {recipe.name}
                        </p>
                      </div>{" "}
                    </MealDrawer>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
