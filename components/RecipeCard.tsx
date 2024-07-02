import React from "react"
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
    </div>
  )
}

export default RecipeCard
