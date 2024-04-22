"use client"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default async function Dashboard() {
  //const { subscription } = useContext(ChatbotUIContext)
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  //const [url, setURL] = useState("")
  const scrapeUrl = async () => {
    // const res = await fetch(`/api/scrape?url=${url}`)
    //const data = await res.json()
    console.log("url")
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {" "}
      <Input placeholder="Enter URL" onChange={() => {}} />
      <Button onClick={scrapeUrl}>Submit</Button>
    </div>
  )
}
