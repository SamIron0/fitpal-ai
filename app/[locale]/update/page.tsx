"use client"
import React, { useState, useEffect, DragEvent } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { TablesInsert } from "@/supabase/types"
import AdminRecipeCard from "@/components/recipe/AdminRecipeCard"
export default function Update() {
  const supabase = createClient()
  const router = useRouter()
  const [recipes, setRecipes] = useState<TablesInsert<"recipes2">[]>([])
  const [url, setUrl] = useState<string>("")
  useEffect(() => {
    const get_recipes = async () => {
      try {
        const all_recipes = await fetch("api/recipe/get_all_recipes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (!all_recipes.ok) {
          throw new Error(`Failed to get recipes`)
        }

        setRecipes(await all_recipes.json())
      } catch (error) {
        console.error("Error fetching recipes:", error)
        toast.error("Error fetching recipes")
      }
    }
    get_recipes()
  }, [])

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
    return
  }
  const deleteRecipe = async (index: number) => {
    const id = toast.loading("Deleting...")
    const recipe = recipes[index]
    try {
      const response = await fetch("api/recipe/delete_recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ recipe })
      })
      if (response.ok) {
        toast.success("Recipe deleted")
        setRecipes(prevRecipes => prevRecipes.filter((_, i) => i !== index))
      } else {
        toast.error("Failed to delete recipe")
        console.error("Failed to delete recipe")
      }
      toast.dismiss(id)
    } catch (error) {
      toast.dismiss(id)
      toast.error("Failed to delete recipe")
      console.error("Error:", error)
    }
  }
  const uploadToCloudinary = async (file: File) => {
    //console.log(process.env.CLOUDINARY_CLOUD_NAME)
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
    return data.secure_url // URL of the uploaded image
  }
  const handleSave = async () => {
    console.log("updating: ", recipes[0])
    const id = toast.loading("Updating...")
    try {
      await Promise.all(
        recipes?.map(async recipe => {
          if (recipe.imgurl instanceof File) {
            try {
              const url = await uploadToCloudinary(recipe.imgurl)
              recipe.imgurl = url // Replace File object with Cloudinary URL
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
  const updateData = <K extends keyof TablesInsert<"recipes2">>(
    index: number,
    key: K,
    value: TablesInsert<"recipes2">[K]
  ) => {
    const newRecipes = [...recipes]
    newRecipes[index][key] = value
    setRecipes(newRecipes)
  }

  return (
    <div className="min-h-screen w-full bg-black overflow-y-auto p-8 text-foreground">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center">
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Search for a recipe"
            className="max-w-2xl grow rounded-l-md border-r border-border bg-input p-2 text-foreground focus:outline-none"
          />
          <button
            onClick={() => {}}
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipes?.map((recipe, index) => (
            <AdminRecipeCard
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
