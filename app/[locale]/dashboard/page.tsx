"use client"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default async function Dashboard() {
  //const { subscription } = useContext(ChatbotUIContext)
  const supabase = createClient()

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center"></div>
  )
}
