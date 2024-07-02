import { Tables } from "@/supabase/types"
import { Clock } from "lucide-react"

interface RecipeCardProps {
  recipe: Tables<"recipes">
}
const convertTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (hours > 0) {
    return `${hours} hr ${minutes} min`
  } else {
    return `${minutes} min`
  }
}
export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="flex w-48 flex-col">
      {recipe.imgurl ? (
        <img
          src={`${recipe.imgurl}`}
          className="border-1 mb-2 h-48 w-full rounded-lg border-input object-cover"
          alt={recipe.name || "Recipe Image"}
        />
      ) : (
        <div className="border-1 mb-2 h-48 rounded-lg border-input bg-input p-2 py-10 text-black"></div>
      )}
      <p className="text-md w-full text-left">{recipe.name}</p>
      <div className="flex w-full text-sm font-light mt-1 items-center text-gray-300">
        <Clock className="w-4 h-4 mr-2" />
        <p className="  text-left">
          {convertTime(recipe.total_time as unknown as number)}
        </p>
      </div>
    </div>
  )
}
