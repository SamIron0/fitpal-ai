"use client"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axios from "axios"
import { TablesInsert } from "@/supabase/types"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function Dash() {
  const supabase = createClient()
  const router = useRouter()
  const [recipe, setRecipe] = useState<TablesInsert<"recipes">>(
    {} as TablesInsert<"recipes">
  )
  const [scrapedRecipes, setScrapedRecipes] = useState<
    TablesInsert<"recipes">[]
  >([])
  const [url, setUrl] = useState("")

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      const session = (await supabase.auth.getSession()).data.session

      if (session?.user.email !== "ekaronke@gmail.com") {
        console.log("session", session?.user.email)
        router.push("/")
      }
    }

    checkUser()
  }, [router, supabase])

  const handleScrapeUrl = async (url: string) => {
    if (!url) {
      toast.error("Please enter a valid URL")
      return
    }
    setUrl("")
    const toastId = toast.loading("Scraping...")
    try {
      const endpoint =
        "https://85ab-2604-3d09-a98a-7300-2419-ade3-1c94-97cb.ngrok-free.app/scrape"
      const response = await axios.post(endpoint, { url })
      const data = response.data.body

      if (data) {
        setScrapedRecipes([...scrapedRecipes, data])
        toast.success("Recipe scraped successfully!")
      }

      toast.dismiss(toastId)
    } catch (error) {
      console.error(error)
      toast.dismiss(toastId)
      toast.error("Error scraping recipe")
    }
  }

  const renderScrapedRecipes = () => {
    return (
      <div className="grid grid-cols-3 gap-4">
        {scrapedRecipes.map((recipe, index) => (
          <div key={index} className="rounded-lg border p-2">
            <div>Name: {recipe.name}</div>
            <ul>
              Instructions:
              {recipe.instructions?.map((instruction, instructionIndex) => (
                <li key={instructionIndex}>{instruction}</li>
              ))}
            </ul>
            <div>Cooking time: {recipe.cooking_time}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="my-12 flex w-full flex-col items-center p-4">
      <div className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in">
        <div className="mx-auto my-12 flex w-full max-w-3xl flex-col items-center p-4">
          <Input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="URL"
            style={{ fontSize: "16px" }}
          />
          <Button onClick={() => handleScrapeUrl(url)} className="mt-6 px-20">
            Scrape
          </Button>
        </div>
      </div>
      {scrapedRecipes.length > 0 && (
        <div className="mt-8 flex w-full max-w-4xl flex-col justify-center rounded-md p-2">
          {renderScrapedRecipes()}
        </div>
      )}
    </div>
  )
}
