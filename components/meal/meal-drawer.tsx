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
  //get full recipe

  const router = useRouter()

  return (
    <Drawer>
      <DrawerTrigger className="flex justify-center  ">
        {" "}
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex h-[70vh] flex-col overflow-y-auto">
          <div className="mt-8 flex w-full flex-col p-6 ">
            <div className="w-full justify-end">
              <img
                src={"/images/" + recipe.imgurl}
                className="mb-2 w-1/2 rounded-lg object-cover"
                alt={recipe.name || "Recipe Image"}
              />
            </div>
            <div className="w-full">
              <p className="pb-3 text-3xl font-semibold">{recipe.name}</p>
              <p className="text-md">{recipe.description}</p>
            </div>
            <div className="w-full">
              <p className="text-2xl font-semibold">Ingredients</p>
              <div className="w-full">
                {recipe?.ingredients?.map((ingredient: any, index: number) => (
                  <div
                    key={index}
                    className="text-md flex w-full items-center justify-between"
                  >
                    <p>•{ingredient}</p>
                  </div>
                ))}
              </div>

              <h2 className="pt-3 text-2xl font-semibold">Directions</h2>
              <ul className="w-full">
                {recipe?.instructions?.map((direction: any, index: number) => (
                  <li
                    key={index}
                    className="text-md flex w-full items-center justify-between"
                  >
                    •{direction}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-row items-center pt-3">
              <h2 className=" text-2xl font-semibold">Nutrition Facts</h2>
              <p className="text-md pl-1">(per serving)</p>
            </div>
            <div className="w-full space-y-2 pb-6">
              <p className="text-md flex w-full items-center justify-between">
                Protein: {recipe.protein}g
              </p>
              <p className=" text-md flex w-full items-center justify-between">
                Fat: {recipe.fats}g
              </p>
              <p className="text-md flex w-full items-center justify-between">
                Carbs: {recipe.carbs}g
              </p>
            </div>
          </div>
          <DrawerTrigger className="mb-12 flex items-center justify-center p-6 ">
            {" "}
            <Button className="w-full" variant="outline">
              Close
            </Button>
          </DrawerTrigger>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
