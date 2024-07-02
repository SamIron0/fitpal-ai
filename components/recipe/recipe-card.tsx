import { Tables } from "@/supabase/types"
import { Clock } from "lucide-react"

interface RecipeCardProps {
  recipe: Tables<"recipes">
}
export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="relative w-48 rounded-lg overflow-hidden shadow-lg">
      {recipe.imgurl ? (
        <>
          <img
            src={`${recipe.imgurl}`}
            className="border-1 mb-2 h-48 w-full rounded-lg border-input object-cover"
            alt={recipe.name || "Recipe Image"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h2 className="text-xl font-bold mb-2">Chinese Pepper Steak</h2>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Cook time: 15 min</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="border-1 mb-2 h-48 rounded-lg border-input bg-input p-2 py-10 text-black"></div>
      )}
      <p className="text-md w-full text-left">{recipe.name}</p>
    </div>
  )
}
