"use client"

import { ChatInput } from "@/components/chat/chat-input"
import { Brand } from "@/components/ui/brand"
import { ChatbotUIContext } from "@/context/context"
import { createClient } from "@/lib/supabase/client"
import { TablesInsert } from "@/supabase/types"
import axios from "axios"
import { useTheme } from "next-themes"
import { cookies } from "next/headers"
import { useContext, useEffect, useState } from "react"

export default async function ChatPage() {
  const { generatedRecipes, isGenerating, recentRecipes } =
    useContext(ChatbotUIContext)
  const { theme } = useTheme()
  const supabase = createClient()
  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession()
      if (error) {
        console.error("Error getting session:", error)
      } else {
        console.log("Session2:", session)
        // Do something with the session
      }
    }

    getSession()
  }, []) // Run the effect only once, when the component mounts

  return (
    <div className="relative mt-32  flex h-full flex-col items-center px-4 sm:px-6">
      <div className="top-50% left-50% -translate-x-50% -translate-y-50%  mb-9">
        <Brand theme={theme === "dark" ? "dark" : "light"} />
      </div>

      <div className="w-full max-w-md items-end  pb-3 pt-0  sm:pb-8 sm:pt-5">
        <ChatInput />
      </div>
      {isGenerating ? (
        <div className="w-full max-w-4xl pt-24">
          <p className="mb-5 text-3xl font-semibold">Recent Meals</p>

          <div
            role="status"
            className="grid w-full max-w-4xl animate-pulse grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            <div className="border-1 rounded-lg border-gray-300 bg-gray-600 p-2 py-10 text-black"></div>
            <div className="border-1 rounded-lg border-gray-300 bg-gray-600 p-2 py-10 text-black"></div>
            <div className="border-1 rounded-lg border-gray-300 bg-gray-600 p-2 py-10 text-black"></div>
            <div className="border-1 rounded-lg border-gray-300 bg-gray-600 p-2 py-10 text-black"></div>
            <div className="border-1 rounded-lg border-gray-300 bg-gray-600 p-2 py-10 text-black"></div>

            <div className="border-1 rounded-lg border-gray-300 bg-gray-600 p-2 py-10 text-black"></div>

            <div className="border-1 rounded-lg border-gray-300 bg-gray-600 p-2 py-10 text-black"></div>

            <div className="border-1 rounded-lg border-gray-300 bg-gray-600 p-2 py-10 text-black"></div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl pt-24">
          {generatedRecipes != undefined && generatedRecipes?.length > 0 ? (
            <>
              <p className="mb-5 text-3xl font-semibold">Best Results</p>
              <div
                role="status"
                className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
              >
                {generatedRecipes?.map(recipe => (
                  <div
                    key={recipe.id}
                    className="border-1 rounded-lg border-gray-300 bg-gray-600 p-2 py-10 text-black"
                  >
                    {recipe.name}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="mb-5 text-3xl font-semibold">Recents</p>
              <div
                role="status"
                className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
              ></div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
