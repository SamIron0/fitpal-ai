"use client"

import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import Head from "next/head"
import { ChatInput } from "@/components/chat/chat-input"
import { RecipeDrawer } from "@/components/recipe/recipe-drawer"
import { Brand } from "@/components/ui/brand"
import { FitpalAIContext } from "@/context/context"
import { getSettingsByUserId } from "@/db/settings"
import { createClient } from "@/lib/supabase/client"
import { Tables } from "@/supabase/types"
import { Dashboard } from "@/components/ui/dashboard"
import { RecipeCard } from "@/components/recipe/recipe-card"

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
        className="border-1 size-48 rounded-lg border-zinc-300 bg-input p-2 py-10 text-black"
      ></div>
    ))
  }

  const renderRecipes = (recipes: Tables<"recipes">[], title: string) => (
    <div className="w-full max-w-4xl py-28">
      <h2 className="mb-5 text-2xl font-semibold">{title}</h2>
      <div
        role="status"
        className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {recipes.map(recipe => (
          <div key={recipe.id} onClick={() => openDrawer(recipe.id)}>
            <RecipeDrawer recipe={recipe} isOpen={isOpen}>
              <RecipeCard recipe={recipe} />
            </RecipeDrawer>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Dashboard>
      <Head>
        <title>FitpalAI | Find Recipes from Ingredients</title>
        <meta
          name="description"
          content="Find curated recipes by entering your ingredients into our AI-powered search engine. You can now search deeper into the recipes beyond just ingredients."
        />
        <meta
          name="keywords"
          content="recipes, ingredients, cooking, meals, personalized recipes"
        />
        <meta
          property="og:title"
          content="Find Recipes from Ingredients | FitpalAI"
        />
        <meta
          property="og:description"
          content="Find curated recipes by entering your ingredients into our AI-powered search engine. You can now search deeper into the recipes beyond just ingredients."
        />
        <meta property="og:url" content="https://fitpalai.com/search" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="Find Recipes from Ingredients | FitpalAI"
        />
        <meta
          name="twitter:description"
          content="Find curated recipes by entering your ingredients into our AI-powered search engine. You can now search deeper into the recipes beyond just ingredients."
        />
      </Head>
      <div className="hide-scrollbar relative flex size-full flex-col items-center overflow-y-auto px-4 sm:px-6">
        <div className="top-50% left-50% -translate-x-50% -translate-y-50% mb-9 mt-32 lg:mt-24">
          <Brand theme={theme === "dark" ? "dark" : "light"} />
        </div>
        <div className="w-full max-w-md items-end pb-3 pt-0 sm:pb-8 sm:pt-5 lg:max-w-xl">
          <h1 className="visually-hidden">
            Find Recipes from Ingredients You Have
          </h1>
          <p className="visually-hidden">
            Welcome to FitpalAI! Enter the ingredients you have, and we will
            help you find delicious recipes in no time. Whether you have
            chicken, pasta, or veggies, we have got you covered.
          </p>
          <ChatInput />
        </div>
        {isGenerating ? (
          <div className="w-full max-w-4xl py-28">
            <h2 className="mb-5 text-2xl font-semibold">Best Results</h2>
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
              <div className="w-full max-w-4xl">
                {forYou.length > 0 ? (
                  renderRecipes(forYou, "For You")
                ) : (
                  <div className="w-full max-w-4xl py-28">
                    <h2 className="mb-5 text-2xl font-semibold">For You</h2>
                    <div
                      role="status"
                      className="grid w-full max-w-4xl animate-pulse grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
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
    </Dashboard>
  )
}
