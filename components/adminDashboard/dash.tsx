"use client"
import React, { useState, useEffect, DragEvent } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { TablesInsert } from "@/supabase/types"

interface RecipeCardProps {
  recipe: TablesInsert<"recipes">
  index: number
  updateData: <K extends keyof TablesInsert<"recipes">>(
    index: number,
    key: K,
    value: TablesInsert<"recipes">[K]
  ) => void
  deleteRecipe: (index: number) => void
  handleDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  index,
  updateData,
  deleteRecipe,
  handleDrop
}) => {
  return (
    <div
      className="relative rounded-lg bg-card p-4 shadow-md transition-all hover:shadow-lg"
      onDrop={e => handleDrop(e, index)}
      onDragOver={e => e.preventDefault()}
    >
      <div className="mb-3 flex items-center justify-between">
        <input
          type="text"
          value={recipe.name || ""}
          onChange={e => updateData(index, "name", e.target.value)}
          className="w-full rounded bg-input p-2 text-lg font-semibold text-foreground"
          placeholder="Recipe Name"
        />
        <div className="ml-2 flex items-center space-x-2">
          <button
            onClick={() => deleteRecipe(index)}
            className="rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200"
            title="Delete Recipe"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className="rounded-full bg-gray-100 p-1"
            title={
              recipe.imgurl && recipe.total_time ? "Complete" : "Incomplete"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`h-5 w-5 ${
                recipe.imgurl && recipe.total_time
                  ? "text-green-500"
                  : "text-orange-500"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-2 flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <input
          type="text"
          value={recipe.total_time || ""}
          onChange={e => updateData(index, "total_time", e.target.value)}
          className="w-full rounded bg-input p-2 text-foreground"
          placeholder="Total Time"
        />
      </div>

      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
          />
        </svg>
        <input
          type="text"
          value={recipe.url || ""}
          onChange={e => updateData(index, "url", e.target.value)}
          className="w-full rounded bg-input p-2 text-foreground"
          placeholder="Recipe URL"
        />
      </div>

      {typeof recipe.imgurl === "string" && (
        <img
          src={recipe.imgurl}
          alt="Recipe"
          className="mt-4 h-auto w-full rounded-md object-cover shadow-md"
        />
      )}
    </div>
  )
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
        "https://1081-2604-3d09-a98a-7300-ecc5-cc4-60f2-4849.ngrok-free.app"

      await Promise.all(
        urls.map(async url => {
          try {
            const response = await axios.post(endpoint, { url })
            const recipesData = response.data.body
            if (recipesData && recipesData.id) {
              setRecipes(prevRecipes => [
                ...prevRecipes,
                {
                  id: recipesData.id,
                  name: recipesData.name,
                  imgurl: recipesData.imgurl,
                  total_time: recipesData.total_time,
                  url: recipesData.url,
                  ingredients: recipesData.ingredients,
                  instructions: recipesData.instructions,
                  protein: recipesData.protein,
                  fats: recipesData.fats,
                  carbs: recipesData.carbs,
                  calories: recipesData.calories,
                  allergies: recipesData.allergies,
                  portions: recipesData.portions,
                  servings: recipesData.servings,
                  embedding: recipesData.embedding,
                  cooking_method: recipesData.cooking_method,
                  course_type: recipesData.course_type,
                  cuisine_type: recipesData.cuisine_type,
                  dietary_restrictions: recipesData.dietary_restrictions,
                  meal_type: recipesData.meal_type
                }
              ])
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
      newRecipes[index] = {
        ...newRecipes[index],
        imgurl: file
      }
      setRecipes(newRecipes)
      console.log("Updated recipes:", newRecipes[0])
    }
  }

  const uploadToCloudinary = async (file: File) => {
    const url = `https://api.cloudinary.com/v1_1/ddhg7gunr/image/upload`
    const formData = new FormData()

    formData.append("file", file)
    formData.append("upload_preset", "ml_default")

    const res = await fetch(url, {
      method: "POST",
      body: formData
    })

    if (!res.ok) {
      throw new Error("Failed to upload file to Cloudinary")
    }

    const data = await res.json()
    return data.secure_url
  }

  const handleSave = async () => {
    console.log("saving: ", recipes[0])
    const id = toast.loading("Saving")
    try {
      await Promise.all(
        recipes.map(async recipe => {
          if (recipe.imgurl instanceof File) {
            try {
              const url = await uploadToCloudinary(recipe.imgurl)
              recipe.imgurl = url
            } catch (error) {
              toast.dismiss(id)
              console.error("Error uploading file:", error)
              toast.error(`Error uploading file for recipe: ${recipe.name}`)
              throw error
            }
          }

          try {
            const res = await fetch("/api/recipe/save_recipe", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ recipe })
            })

            if (!res.ok) {
              throw new Error(`Failed to save recipe: ${recipe.name}`)
            }
            toast.dismiss(id)
            toast.success(`Recipe ${recipe.name} saved successfully!`)
          } catch (error) {
            toast.dismiss(id)
            console.error("Error saving recipe:", error)
            toast.error(`Error saving recipe: ${recipe.name}`)
            throw error
          }
        })
      )

      setRecipes([])
    } catch (error) {
      toast.dismiss(id)
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

  const deleteRecipe = (index: number) => {
    const newRecipes = recipes.filter((_, i) => i !== index)
    setRecipes(newRecipes)
  }

  return (
    <div className="min-h-screen w-full bg-background p-8 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center">
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Enter URL(s) separated by commas"
            className="flex-grow rounded-l-md border-r border-border bg-input p-2 text-foreground focus:outline-none"
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
              className="h-6 w-6"
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
              className="mr-2 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Save All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              index={index}
              updateData={updateData}
              deleteRecipe={deleteRecipe}
              handleDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
