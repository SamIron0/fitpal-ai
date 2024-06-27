"use client"

import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axios from "axios"
import { TablesInsert } from "@/supabase/types"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Instruction {
  name: string
  instructions: string
  imgUrl: string
  time: string
}

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
  const [data, setData] = useState<Instruction[]>([
    {
      name: "Cake",
      instructions: "Bake for 30 mins",
      imgUrl: "/api/placeholder/200/200",
      time: "30 mins"
    },
    {
      name: "Soup",
      instructions: "Simmer for 1 hour",
      imgUrl: "/api/placeholder/200/200",
      time: "1 hour"
    },
    {
      name: "Salad",
      instructions: "Mix ingredients",
      imgUrl: "/api/placeholder/200/200",
      time: "10 mins"
    },
    {
      name: "Steak",
      instructions: "Grill for 5 mins each side",
      imgUrl: "/api/placeholder/200/200",
      time: "15 mins"
    },
    {
      name: "Pasta",
      instructions: "Boil for 8-10 mins",
      imgUrl: "/api/placeholder/200/200",
      time: "20 mins"
    },
    {
      name: "Smoothie",
      instructions: "Blend for 1 min",
      imgUrl: "/api/placeholder/200/200",
      time: "5 mins"
    }
  ])

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      const session = (await supabase.auth.getSession()).data.session

      if (session?.user.email !== "ekaronke@gmail.com") {
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const newInstructions = [...data]
      newInstructions[index].imgUrl = file.name // Update with the name of the image
      setData(newInstructions)
      // Simulate image upload (to be implemented in the future)
      handleImageUpload(file)
    }
  }

  const handleImageUpload = (file: File) => {
    // Simulate image upload process
    console.log("Uploading image:", file.name)
    // In the future, upload the image to the cloud here
  }

  const handleSave = async () => {
    try {
      // Simulate saving data and image uploads
      console.log("Saving data:", data)
      // In the future, upload images to the cloud here
    } catch (error) {
      console.error("Error saving data:", error)
      toast.error("Error saving data")
    }
  }

  const updateInstruction = (
    index: number,
    key: keyof Instruction,
    value: string
  ) => {
    const newInstructions = [...data]
    newInstructions[index][key] = value
    setData(newInstructions)
  }

  return (
    <div className="min-h-screen bg-background p-8 text-foreground">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center">
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="URL"
            className="max-w-2xl grow rounded-l-md border-r border-border bg-input p-2 text-foreground"
          />
          <button
            onClick={() => handleScrapeUrl(url)}
            className="rounded-r-md bg-primary p-2 text-primary-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
          <button
            onClick={handleSave}
            className="ml-4 flex items-center rounded-md bg-accent px-4 py-2 text-accent-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Save
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {data.map((instruction, index) => (
            <div
              key={index}
              className="rounded bg-card p-4 text-card-foreground shadow"
              onDrop={e => handleDrop(e, index)}
              onDragOver={e => e.preventDefault()}
            >
              <div className="mb-2 flex items-center justify-between">
                <input
                  type="text"
                  value={instruction.name}
                  onChange={e =>
                    updateInstruction(index, "name", e.target.value)
                  }
                  className="w-2/3 rounded bg-input p-1 text-foreground"
                  placeholder="Name"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={
                    "size-20 " +
                    (instruction.imgUrl ? "text-green-500" : "text-orange-500")
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>

              <div className="mb-2 flex items-center">
                <input
                  type="text"
                  value={instruction.time}
                  onChange={e =>
                    updateInstruction(index, "time", e.target.value)
                  }
                  className="mr-2 w-1/2 rounded bg-input p-1 text-foreground"
                  placeholder="Time"
                />
                <input
                  type="text"
                  value={instruction.imgUrl}
                  onChange={e =>
                    updateInstruction(index, "imgUrl", e.target.value)
                  }
                  className="w-1/2 rounded bg-input p-1 text-foreground"
                  placeholder="Image URL"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
