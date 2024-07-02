import { Tables } from "@/supabase/types"

interface RecipeCardProps {
  recipe: Tables<"recipes">
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
    </div>
  )
}
