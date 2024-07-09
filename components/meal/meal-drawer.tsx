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
import { convertTime } from "@/utils/helpers"

interface MealDrawerProps {
  children?: React.ReactNode
  recipe: TablesInsert<"recipes2">
  isOpen?: string
}
const NutritionFacts: React.FC<{ recipe: TablesInsert<"recipes2"> }> = ({
  recipe
}) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
    {[
      { label: "Protein", value: `${recipe.protein}` },
      { label: "Fat", value: `${recipe.fats}` },
      { label: "Carbs", value: `${recipe.carbs}` },
      { label: "Calories", value: `${recipe.calories} ` }
    ].map(item => (
      <Card key={item.label} className="bg-background">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-zinc-500">{item.label}</p>
          <p className="text-2xl font-bold">{item.value}</p>
        </CardContent>
      </Card>
    ))}
  </div>
)

const IngredientsList: React.FC<{
  ingredients: string[] | null | undefined
}> = ({ ingredients }) => (
  <ul className="list-inside list-disc space-y-2">
    {ingredients?.map((ingredient, index) => (
      <li key={index} className="text-zinc-100">
        {ingredient}
      </li>
    ))}
  </ul>
)

const DirectionsList: React.FC<{
  instructions: string[] | null | undefined
}> = ({ instructions }) => (
  <ol className="list-inside list-decimal space-y-4">
    {instructions?.map((direction, index) => (
      <li key={index} className="text-zinc-100">
        {direction}
      </li>
    ))}
  </ol>
)
function convertStringToNumber(str: string | null | undefined) {
  // Remove the square brackets and double quotes
  if (!str) return 0
  const cleanedString = str.replace(/[\[\]"]/g, '');
  // Convert the cleaned string to a number
  return parseInt(cleanedString, 10);
}
const RecipeDetails: React.FC<{ recipe: TablesInsert<"recipes2"> }> = ({
  recipe
}) => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl mt-6 font-bold text-zinc-100">{recipe.name}</h1>
      <div className="mt-2 flex space-x-4">
        <Badge variant="secondary">
          Portions:{" "}
          {!recipe.portions ? 0 : convertStringToNumber(recipe.portions)}
        </Badge>
        <Badge variant="secondary">
          Time: {convertTime(recipe.total_time)}
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
        <DirectionsList instructions={recipe?.instructions?.split(".")} />
      </CardContent>
    </Card>
  </div>
)

const MealDrawerContent: React.FC<{ recipe: TablesInsert<"recipes2"> }> = ({
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
      <DrawerContent className="h-[80vh] sm:h-[85vh] ">
        <DrawerHeader className="sr-only">
          <DrawerTitle className="text-zinc-100">{recipe.name}</DrawerTitle>
          <DrawerDescription>Recipe details</DrawerDescription>
        </DrawerHeader>
        {recipe && <MealDrawerContent recipe={recipe} />}
        <DrawerFooter className="absolute inset-x-0 bottom-0 bg-black p-4">
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
