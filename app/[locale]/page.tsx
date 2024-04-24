"use client"
import { ChatInput } from "@/components/chat/chat-input"
import { Brand } from "@/components/ui/brand"
import { ChatbotUIContext } from "@/context/context"
import { createClient } from "@/lib/supabase/client"
import { TablesInsert } from "@/supabase/types"
import axios from "axios"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { routeros } from "react-syntax-highlighter/dist/esm/styles/hljs"

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
    console.log("Current session:", session)
    // Do something with the session
  }

  const { data: homeWorkspace, error: homeWorkspaceError } = await supabase
    .from("workspaces")
    .select("*")
    .eq("user_id", session?.user.id)
    .eq("is_home", true)
    .single()

  console.log("hws", homeWorkspace)
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
    </div>
  )
}
