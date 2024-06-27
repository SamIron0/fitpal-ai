import React, { useContext } from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FitpalAIContext } from "@/context/context"
import { Tables } from "@/supabase/types"

interface MealDrawerProps {
  children?: React.ReactNode
  recipe: Tables<"recipes">
  isOpen?: string
}

const NutritionFacts: React.FC<{ recipe: Tables<"recipes"> }> = ({
  recipe
}) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
    {[
      { label: "Protein", value: `${recipe.protein}g` },
      { label: "Fat", value: `${recipe.fats}g` },
      { label: "Carbs", value: `${recipe.carbs}g` },
      { label: "Calories", value: `${recipe.calories} kcal` }
    ].map(item => (
      <Card key={item.label} className="bg-black">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-zinc-500">{item.label}</p>
          <p className="text-2xl font-bold">{item.value}</p>
        </CardContent>
      </Card>
    ))}
  </div>
)

const IngredientsList: React.FC<{ ingredients: string[] | null }> = ({
  ingredients
}) => (
  <ul className="list-inside list-disc space-y-2">
    {ingredients?.map((ingredient, index) => (
      <li key={index} className="text-zinc-100">
        {ingredient}
      </li>
    ))}
  </ul>
)

const DirectionsList: React.FC<{ instructions: string[] | null }> = ({
  instructions
}) => (
  <ol className="list-inside list-decimal space-y-4">
    {instructions?.map((direction, index) => (
      <li key={index} className="text-zinc-100">
        {direction}
      </li>
    ))}
  </ol>
)

const RecipeDetails: React.FC<{ recipe: Tables<"recipes"> }> = ({ recipe }) => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-zinc-100">{recipe.name}</h1>
      <div className="mt-2 flex space-x-4">
        <Badge variant="secondary">Portions: {recipe.portions}</Badge>
        <Badge variant="secondary">Time: {recipe.cooking_time}</Badge>
      </div>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Nutrition Facts</CardTitle>
        <CardDescription>Per serving</CardDescription>
      </CardHeader>
      <CardContent>
        <NutritionFacts recipe={recipe} />
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Ingredients</CardTitle>
      </CardHeader>
      <CardContent>
        <IngredientsList ingredients={recipe.ingredients} />
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Directions</CardTitle>
      </CardHeader>
      <CardContent className="w-full max-w-2xl">
        <DirectionsList instructions={recipe.instructions} />
      </CardContent>
    </Card>
  </div>
)

const MealDrawerContent: React.FC<{ recipe: Tables<"recipes"> }> = ({
  recipe
}) => (
  <div className="flex flex-col space-y-6 overflow-y-auto pb-20">
    <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
      <img
        src={`/images/${recipe.imgurl}`}
        className="absolute inset-0 size-full object-cover"
        alt={recipe.name || "Recipe Image"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <h1 className="absolute bottom-4 left-4 text-4xl font-bold text-white">
        {recipe.name}
      </h1>
    </div>
    <div className="px-4 sm:px-6 lg:px-8 ">
      <RecipeDetails recipe={recipe} />
    </div>
  </div>
)

export const MealDrawer: React.FC<MealDrawerProps> = ({
  children,
  recipe,
  isOpen
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-[90vh] sm:h-[85vh]">
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-zinc-100">{recipe.name}</DrawerTitle>
          <DrawerDescription>Recipe details</DrawerDescription>
        </DrawerHeader>
        {recipe && <MealDrawerContent recipe={recipe} />}
        <DrawerFooter className="absolute inset-x-0 bottom-0 bg-background p-4">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
