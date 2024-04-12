"use client"

import { ChatbotUISVG } from "@/components/icons/chatbotui-svg"
import { IconArrowRight } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import Navbar from "@/components/ui/Navbar"

export default function HomePage() {
  const { theme } = useTheme()

  return (
    <>
      <Navbar />

      <div className="flex size-full flex-col items-center justify-center">
        <Link href="/" rel="nofollow">
          <img
            className="h-24  md:h-28"
            src="/fitpal-dark.svg"
            alt="logo"
          ></img>
        </Link>
        <div className="mt-2 text-4xl font-semibold">Fitpal AI</div>

        <Link
          className="font-mediu m mt-4 flex w-[200px] items-center justify-center rounded-md bg-blue-500 p-2"
          href="/login"
        >
          Start Chatting
          <IconArrowRight className="ml-1" size={20} />
        </Link>
      </div>
    </>
  )
}
