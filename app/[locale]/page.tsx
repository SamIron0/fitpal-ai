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
  return (
    <div className="relative mt-32  flex h-full flex-col items-center px-4 sm:px-6">
      <div className="top-50% left-50% -translate-x-50% -translate-y-50%  mb-9">
        <Brand theme={theme === "dark" ? "dark" : "light"} />
      </div>

      <div className="w-full max-w-md items-end  pb-3 pt-0  sm:pb-8 sm:pt-5">
        <ChatInput />
      </div>
    </div>
  )
}
