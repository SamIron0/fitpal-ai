"use client"

import { ChatInput } from "@/components/chat/chat-input"
import { ChatUI } from "@/components/chat/chat-ui"
import { Brand } from "@/components/ui/brand"
import { ChatbotUIContext } from "@/context/context"
import { useTheme } from "next-themes"
import { useContext } from "react"

export default function ChatPage() {
  const { chatMessages } = useContext(ChatbotUIContext)
  const { theme } = useTheme()

  return (
    <>
      {chatMessages.length === 0 ? (
        <div className="relative mt-12 flex h-full flex-col items-center">
          <div className="top-50% left-50% -translate-x-50% -translate-y-50%  mb-12">
            <Brand theme={theme === "dark" ? "dark" : "light"} />
          </div>

          <div className="w-full min-w-[300px] items-end px-2 pb-3 pt-0 sm:w-[600px] sm:pb-8 sm:pt-5 md:w-[700px] lg:w-[700px] xl:w-[800px]">
            <ChatInput />
          </div>
        </div>
      ) : (
        <ChatUI />
      )}
    </>
  )
}
