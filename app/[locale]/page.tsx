"use client"
import { useState, useEffect, useContext } from "react"
import { ChatInput } from "@/components/chat/chat-input"
import { LoginDrawer } from "@/components/login/login-drawer"
import { Brand } from "@/components/ui/brand"
import { createClient } from "@/lib/supabase/client"
import { TablesInsert } from "@/supabase/types"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

export default function ChatPage() {
  const router = useRouter()
  const { theme } = useTheme()
  const [recipes, setRecipes] = useState<TablesInsert<"recipes">[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession()
      if (error) {
        console.error(error)
        return
      }

      if (session) {
        const setWs = async () => {
          const { data: homeWorkspace, error: homeWorkspaceError } =
            await supabase
              .from("workspaces")
              .select("*")
              .eq("user_id", session?.user.id)
              .eq("is_home", true)
              .single()

          if (homeWorkspaceError) {
            console.error(homeWorkspaceError)
            return
          }

          if (homeWorkspace) {
            router.push(`/${homeWorkspace.id}/search`)
          }
        }
        setWs()
      }
    }

    fetchSession()
    const fetchForYou = async () => {
      try {
        const data = await fetch("/api/for_you", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
        const recipes = await data.json()
        setRecipes(recipes.for_you)
      } catch (error) {
        console.error(error)
      }
    }

    fetchForYou()
  }, [router, supabase])

  return (
    <div className="hide-scrollbar relative flex size-full flex-col items-center overflow-y-auto px-4 sm:px-6">
      <div className="top-50% left-50% -translate-x-50% -translate-y-50% mb-9 mt-32">
        <Brand theme={theme === "dark" ? "dark" : "light"} />
      </div>

      <div className="w-full max-w-md items-end pb-3 pt-0 sm:pb-8 sm:pt-5">
        <ChatInput />
      </div>

      <div className="w-full max-w-4xl py-28">
        <p className="mb-5 text-3xl font-semibold">For You</p>
        <div
          role="status"
          className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {recipes?.map(recipe => (
            <LoginDrawer key={recipe.name}>
              <div className="flex w-48 flex-col">
                {recipe.imgurl ? (
                  <img
                    src={"/images/" + recipe.imgurl}
                    className="border-1 mb-2 h-48 rounded-lg border-gray-300 object-cover"
                    alt={recipe.name || "Recipe Image"}
                  />
                ) : (
                  <div className="border-1 mb-2 h-48 rounded-lg border-gray-300 bg-zinc-600 p-2 py-10 text-black"></div>
                )}
                <p className="text-md w-full text-left">{recipe.name}</p>
              </div>
            </LoginDrawer>
          ))}
        </div>
      </div>
    </div>
  )
}
