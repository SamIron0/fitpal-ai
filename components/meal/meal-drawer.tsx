"use client"

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
import { useContext, useEffect, useState, ReactNode } from "react"
import { FitpalAIContext } from "@/context/context"
import { Tables } from "@/supabase/types"

interface MealDrawerProps {
  children?: ReactNode
  recipe: Tables<"recipes">
  isOpen?: string
}

const NutritionFacts: React.FC<{ updatedRecipe: Tables<"recipes"> }> = ({
  updatedRecipe
}) => (
  <div className="w-full space-y-2 pb-6">
    <p className="text-md flex w-full items-center justify-between">
      Protein: {updatedRecipe.protein}g
    </p>
    <p className="text-md flex w-full items-center justify-between">
      Fat: {updatedRecipe.fats}g
    </p>
    <p className="text-md flex w-full items-center justify-between">
      Carbs: {updatedRecipe.carbs}g
    </p>
    <p className="text-md flex w-full items-center justify-between">
      Calories: {updatedRecipe.calories}kcal
    </p>
  </div>
)

const IngredientsList: React.FC<{ ingredients: string[] | null }> = ({
  ingredients
}) => (
  <div className="w-full">
    {ingredients?.map((ingredient, index) => (
      <div
        key={index}
        className="text-md flex w-full items-center justify-between"
      >
        <p>•{ingredient}</p>
      </div>
    ))}
  </div>
)

const DirectionsList: React.FC<{ instructions: string[] | null }> = ({
  instructions
}) => (
  <ul className="w-full">
    {instructions?.map((direction, index) => (
      <li
        key={index}
        className="text-md flex w-full items-center justify-between"
      >
        • {direction}
      </li>
    ))}
  </ul>
)

const RecipeDetails: React.FC<{ updatedRecipe: Tables<"recipes"> }> = ({
  updatedRecipe
}) => (
  <div className="w-full">
    <p className="pb-3 text-3xl font-semibold">{updatedRecipe.name}</p>
    <p className="flex flex-row pb-3">
      <span className="text-sm">Portions: {updatedRecipe.portions}</span>
      <span className="pl-5 text-sm">
        Cooking Time: {updatedRecipe.cooking_time}
      </span>
    </p>
    <div>
      <p className="text-2xl font-semibold">Ingredients</p>
      <IngredientsList ingredients={updatedRecipe.ingredients} />
      <h2 className="pt-3 text-2xl font-semibold">Directions</h2>
      <DirectionsList instructions={updatedRecipe.instructions} />
    </div>
    <div className="flex flex-row items-center pt-3">
      <h2 className="text-2xl font-semibold">Nutrition Facts</h2>
      <p className="text-md pl-1">(per serving)</p>
    </div>
    <NutritionFacts updatedRecipe={updatedRecipe} />
  </div>
)

const MealDrawerContent: React.FC<{
  updatedRecipe: Tables<"recipes">
}> = ({ updatedRecipe }) => (
  <div className="hide-scrollbar flex h-[85vh] flex-col overflow-y-auto">
    <div className="mt-8 flex w-full flex-col p-6">
      <div className="w-full justify-end">
        <img
          src={`/images/${updatedRecipe.imgurl}`}
          className="mb-2 w-1/2 rounded-lg border object-cover md:w-1/3"
          alt={updatedRecipe.name || "updatedRecipe Image"}
        />
      </div>
      <RecipeDetails updatedRecipe={updatedRecipe} />
    </div>
    <DrawerTrigger className="mb-12 flex items-center justify-center p-6">
      <Button className="w-full" variant="outline">
        Close
      </Button>
    </DrawerTrigger>
  </div>
)

export const MealDrawer: React.FC<MealDrawerProps> = ({
  children,
  recipe,
  isOpen
}) => {
  const { generatedRecipes, setGeneratedRecipes } = useContext(FitpalAIContext)

  return (
    <Drawer>
      <DrawerTrigger className="flex justify-center">{children}</DrawerTrigger>
      <DrawerContent>
        {recipe && <MealDrawerContent updatedRecipe={recipe} />}
      </DrawerContent>
    </Drawer>
  )
}
