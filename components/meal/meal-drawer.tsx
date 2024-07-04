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
import { TablesInsert } from "@/supabase/types"

interface MealDrawerProps {
  children?: React.ReactNode
  recipe: TablesInsert<"recipes">
  isOpen?: string
}
const NutritionFacts: React.FC<{ recipe: TablesInsert<"recipes"> }> = ({
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

const convertTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (hours > 0) {
    return `${hours} hr ${minutes} min`
  } else {
    return `${minutes} min`
  }
}
const IngredientsList: React.FC<{ ingredients: string[] | null | undefined }> = ({
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

const DirectionsList: React.FC<{ instructions: string[] | null | undefined }> = ({
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

const RecipeDetails: React.FC<{ recipe: TablesInsert<"recipes"> }> = ({ recipe }) => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl mt-6 font-bold text-zinc-100">{recipe.name}</h1>
      <div className="mt-2 flex space-x-4">
        <Badge variant="secondary">Portions: {recipe.portions}</Badge>
        <Badge variant="secondary">
          Time: {convertTime(recipe.total_time as unknown as number)}
        </Badge>
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
        <IngredientsList ingredients={recipe?.ingredients} />
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Directions</CardTitle>
      </CardHeader>
      <CardContent className="w-full max-w-2xl">
        <DirectionsList instructions={recipe?.instructions} />
      </CardContent>
    </Card>
  </div>
)

const MealDrawerContent: React.FC<{ recipe: TablesInsert<"recipes"> }> = ({
  recipe
}) => (
  <div className="flex flex-col space-y-6 overflow-y-auto pb-20">
    <div className="px-4 max-w-3xl mx-auto  sm:px-6 lg:px-8 ">
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
            <Button variant="outline" className="w-full max-w-3xl mx-auto ">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
