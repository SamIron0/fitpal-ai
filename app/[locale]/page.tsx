"use client"

import { Brand } from "@/components/ui/brand"
import { ChatInput } from "@/components/chat/chat-input"
import { useTheme } from "next-themes"

export default function HomePage() {
  const { theme } = useTheme()
  return (
    <div className="relative mt-32  flex h-full flex-col items-center px-4 sm:px-6">
      <div className="top-50% left-50% -translate-x-50% -translate-y-50%  mb-9">
        <Brand theme={theme === "dark" ? "dark" : "light"} />
      </div>

      <div className="w-full max-w-md items-end  pb-3 pt-0  sm:pb-8 sm:pt-5">
        <ChatInput />
      </div>
      <div className="w-full max-w-4xl pt-24">
        <p className="mb-5 text-3xl font-semibold">Recent Meals</p>
      </div>
    </div>
  )
}
