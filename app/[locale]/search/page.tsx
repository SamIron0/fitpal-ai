import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import Head from "next/head"
import { ChatInput } from "@/components/chat/chat-input"
import { MealDrawer } from "@/components/meal/meal-drawer"
import { Brand } from "@/components/ui/brand"
import { FitpalAIContext } from "@/context/context"
import { getSettingsByUserId } from "@/db/settings"
import { Tables } from "@/supabase/types"
import { Dashboard } from "@/components/ui/dashboard"
import { Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import SearchPage from "@/components/search-page"

export default async function Search() {
  const supabase = createClient(cookies())
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const response = await fetch("/api/for_you", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  const data = await response.json()
  const forYou: Tables<"recipes">[] = data.for_you

  return (
    <Dashboard>
      <SearchPage for_you={forYou} />
    </Dashboard>
  )
}
