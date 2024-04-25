import { IconSend } from "@tabler/icons-react"
import { Button } from "../ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "../ui/drawer"
import { cn } from "@/lib/utils"
import { Brand } from "../ui/brand"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { SubmitButton } from "../ui/submit-button"
import { useRouter } from "next/navigation"

interface MealDrawerProps {
  children?: React.ReactNode
  recipe?: any
}
export const MealDrawer = ({ children, recipe }: MealDrawerProps) => {
  const router = useRouter()

  return (
    <Drawer>
      <DrawerTrigger className="flex items-center justify-center  ">
        {" "}
        {children}
      </DrawerTrigger>
      <DrawerContent className="overflow-y-auto">
        <div className="mt-8 flex w-full flex-col p-2 ">
          <div className="w-full justify-end">
            <img
              src={"/" + recipe.imgurl}
              className="w-xl mb-2 rounded-lg object-cover"
              alt={recipe.name || "Recipe Image"}
            />
          </div>
          <div className="w-full">
            <p className="text-3xl font-semibold">{recipe.name}</p>
            <p className="text-md">{recipe.description}</p>
          </div>
          <div className="w-full">
            <p className="text-3xl font-semibold">Ingredients</p>
            <div className="w-full">
              {recipe.ingredients.map((ingredient: any, index: number) => (
                <div
                  key={index}
                  className="text-md flex w-full items-center justify-between"
                >
                  <p>{ingredient}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-semibold">Directions</h2>
            <div className="w-full">
              {recipe.instructions.map((direction: any, index: number) => (
                <div
                  key={index}
                  className="text-md flex w-full items-center justify-between"
                >
                  <p>{direction}</p>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-semibold">Nutritional Values</h2>
          <div className="space-y- w-full">
            <p className="text-md flex w-full items-center justify-between">
              Protein: {recipe.protein}
            </p>
            <p className="sp text-md flex w-full items-center justify-between">
              Fat: {recipe.fat}
            </p>
            <p className="text-md flex w-full items-center justify-between">
              Carbs: {recipe.carbs}
            </p>
          </div>
        </div>
      </DrawerContent>
      <DrawerTrigger className="flex items-center justify-center  ">
        {" "}
        <Button
          onClick={() => router.push(`/recipe/${recipe.id}`)}
          className="w-full"
          variant="outline"
        >
          Close
        </Button>
      </DrawerTrigger>
    </Drawer>
  )
}
