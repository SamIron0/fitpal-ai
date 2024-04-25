"use client"
import { ChatInput } from "@/components/chat/chat-input"
import { Brand } from "@/components/ui/brand"
import { ChatbotUIContext } from "@/context/context"
import { createClient } from "@/lib/supabase/client"
import { TablesInsert } from "@/supabase/types"
import axios from "axios"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

export default async function ChatPage() {
  const router = useRouter()
  const { theme } = useTheme()
  const supabase = createClient()

  const {
    data: { session },
    error
  } = await supabase.auth.getSession()
  if (error) {
    console.error("Error getting session:", error)
  } else {
    // Do something with the session
  }

  const { data: homeWorkspace, error: homeWorkspaceError } = await supabase
    .from("workspaces")
    .select("*")
    .eq("user_id", session?.user.id)
    .eq("is_home", true)
    .single()

  if (homeWorkspace) {
    router.push(`/${homeWorkspace.id}/chat`)
  }

  return (
    <div className="relative mt-32  flex h-full flex-col items-center px-4 sm:px-6">
      <div className="top-50% left-50% -translate-x-50% -translate-y-50%  mb-9">
        <Brand theme={theme === "dark" ? "dark" : "light"} />
      </div>

      <div className="w-full max-w-md items-end  pb-3 pt-0  sm:pb-8 sm:pt-5">
        <ChatInput />
      </div>

      <div className="w-full max-w-4xl pt-24">
        <p className="mb-5 text-3xl font-semibold">For You</p>
        <div
          role="status"
          className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        ></div>
      </div>
    </div>
  )
}
