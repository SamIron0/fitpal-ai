"use client"
import React, { useState, useEffect, DragEvent } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { TablesInsert } from "@/supabase/types"
import { uploadImage } from "@/lib/cloudinary" // Assuming you have a cloudinary.ts file for Cloudinary integration

interface Recipe {
  name: string
  cooking_time: string
  imgurl: string | File // Changed to accept File type for images
}

export default function Dash() {
  const supabase = createClient()
  const router = useRouter()
  const [recipes, setRecipes] = useState<TablesInsert<"recipes">[]>([])
  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    async function checkUser() {
      try {
        const {
          data: { user },
          error
        } = await supabase.auth.getUser()
        if (error || !user || user.email !== "ekaronke@gmail.com") {
          router.push("/")
        }
      } catch (error) {
        console.error("Error checking user:", error)
        router.push("/")
      }
    }

    checkUser()
  }, [router, supabase])

  const handleScrapeUrl = async (urlString: string) => {
    if (!urlString) {
      toast.error("Please enter a valid URL")
      return
    }

    setUrl("")
    const urls = urlString.split(",").map(url => url.trim())
    const toastId = toast.loading("Scraping...")

    try {
      const endpoint =
        "https://85ab-2604-3d09-a98a-7300-2419-ade3-1c94-97cb.ngrok-free.app/scrape"

      await Promise.all(
        urls.map(async url => {
          try {
            const response = await axios.post(endpoint, { url })
            const recipesData = response.data.body
            if (recipesData) {
              setRecipes(prevRecipes => [...prevRecipes, recipesData])
              toast.success(`Recipe from ${url} scraped successfully!`)
            }
          } catch (error) {
            console.error("Error scraping recipe:", error)
            toast.error(`Error scraping recipe from ${url}`)
          }
        })
      )

      toast.dismiss(toastId)
    } catch (error) {
      console.error("Error scraping recipes:", error)
      toast.dismiss(toastId)
      toast.error("Error scraping recipes")
    }
  }

  const handleDrop = async (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const newRecipes = [...recipes]
      newRecipes[index].imgurl = file // Store the File object in recipes state
      setRecipes(newRecipes)
    }
  }

  const handleSave = async () => {
    try {
      const recipesToSave = await Promise.all(
        recipes.map(async recipe => {
          try {
            if (recipe.imgurl instanceof File) {
              // Upload image to Cloudinary only if it's a File object (not a string URL)
              const imageUrl = await uploadImage(recipe.imgurl)
              return { ...recipe, imgurl: imageUrl }
            } else {
              return recipe // If imgurl is already a string, no need to re-upload
            }
          } catch (error) {
            console.error("Error uploading image or saving recipe:", error)
            toast.error(
              `Error uploading image or saving recipe: ${recipe.name}`
            )
            throw error
          }
        })
      )

      await Promise.all(
        recipesToSave.map(async recipe => {
          try {
            const res = await fetch("/api/save_recipe", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ recipe })
            })

            if (!res.ok) {
              throw new Error(`Failed to save recipe: ${recipe.name}`)
            }
          } catch (error) {
            console.error("Error saving recipe:", error)
            toast.error(`Error saving recipe: ${recipe.name}`)
            throw error
          }
        })
      )

      toast.success("Recipes saved successfully!")
      setRecipes([])
    } catch (error) {
      console.error("Error saving recipes:", error)
      toast.error("Error saving recipes")
    }
  }

  const updateData = <K extends keyof TablesInsert<"recipes">>(
    index: number,
    key: K,
    value: TablesInsert<"recipes">[K]
  ) => {
    const newRecipes = [...recipes]
    newRecipes[index][key] = value
    setRecipes(newRecipes)
  }

  return (
    <div className="min-h-screen w-full bg-background p-8 text-foreground">
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
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
          <button
            disabled={recipes.length === 0}
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
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="rounded-md bg-black p-4 text-card-foreground shadow"
              onDrop={e => handleDrop(e, index)}
              onDragOver={e => e.preventDefault()}
            >
              <div className="mb-2 flex items-center justify-between">
                <input
                  type="text"
                  value={recipe.name || ""}
                  onChange={e => updateData(index, "name", e.target.value)}
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
                    "size-6 " +
                    (recipe.imgurl && recipe.cooking_time
                      ? "text-green-500"
                      : "text-orange-500")
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
                  value={recipe.cooking_time || ""}
                  onChange={e =>
                    updateData(index, "cooking_time", e.target.value)
                  }
                  className="mr-2 w-1/2 rounded bg-input p-1 text-foreground"
                  placeholder="Time"
                />
                <input
                  type="text"
                  value={
                    recipe.imgurl instanceof File
                      ? recipe.imgurl.name
                      : recipe.imgurl || ""
                  }
                  onChange={e => updateData(index, "imgurl", e.target.value)}
                  className="w-1/2 rounded bg-input p-1 text-foreground"
                  placeholder="Image URL"
                />
              </div>

              {recipe.imgurl instanceof File && (
                <span className="text-sm text-gray-500">
                  Image will be uploaded on save
                </span>
              )}

              {typeof recipe.imgurl === "string" && (
                <img
                  src={recipe.imgurl}
                  alt="Recipe"
                  className="mt-2 h-auto max-w-full rounded-md shadow-md"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
