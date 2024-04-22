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
        <div className="relative mt-20 flex h-full flex-col items-center">
          <div className="top-50% left-50% -translate-x-50% -translate-y-50%  mb-12">
            <Brand theme={theme === "dark" ? "dark" : "light"} />
          </div>

          <div className="w-full max-w-md items-end px-2 pb-3 pt-0  sm:pb-8 sm:pt-5">
            <ChatInput />
          </div>
          <div className="w-full">
            <p className="mb-5 text-center">Recents</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="border-1 rounded-lg border-gray-300 p-2">01</div>
              <div>09</div>
            </div>
          </div>
        </div>
      ) : (
        <ChatUI />
      )}
    </>
  )
}
