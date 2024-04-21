import { createClient } from "@/lib/supabase/client"
import { cookies } from "next/headers"
import Offers from "@/components/offers/offers"
import { useContext } from "react"
import { ChatbotUIContext } from "@/context/context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default async function AdminDashboard() {
  //const { subscription } = useContext(ChatbotUIContext)
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (user?.role !== "admin") {
    return
  }
  const scrapeUrl = async () => {}
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {" "}
      <Input placeholder="Enter URL" name="url" />
      <Button onClick={scrapeUrl}>Submit</Button>
    </div>
  )
}
