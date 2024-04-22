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
        <div className="relative mt-40  flex h-full flex-col items-center px-4 sm:px-6">
          <div className="top-50% left-50% -translate-x-50% -translate-y-50%  mb-9">
            <Brand theme={theme === "dark" ? "dark" : "light"} />
          </div>

          <div className="w-full max-w-md items-end  pb-3 pt-0  sm:pb-8 sm:pt-5">
            <ChatInput />
          </div>
          <div className="w-full pt-20">
            <p className="text-semibold mb-5 text-lg">Recent Meals</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              <div className="border-1 rounded-lg border-gray-300 bg-white p-2 text-black">
                01
              </div>
              <div className="border-1 rounded-lg border-gray-300 bg-white p-2 py-10 text-black">
                02
              </div>
              <div className="border-1 rounded-lg border-gray-300 bg-white p-2 text-black">
                03
              </div>
              <div className="border-1 rounded-lg border-gray-300 bg-white p-2 text-black">
                04
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ChatUI />
      )}
    </>
  )
}
