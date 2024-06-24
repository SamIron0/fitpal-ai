import { cn } from "@/lib/utils"

import { IoFishOutline } from "react-icons/io5"
import { MdOutlineEggAlt } from "react-icons/md"
import { IoFastFoodOutline } from "react-icons/io5"
import { TbSalad } from "react-icons/tb"
import { GiShrimp } from "react-icons/gi"
import { GiGrapes } from "react-icons/gi"
import { GiBroccoli } from "react-icons/gi"
import { TbMeat } from "react-icons/tb"
import { PiShrimpBold } from "react-icons/pi"
import { LuVegan } from "react-icons/lu"
import { DietProvider } from "@/types/diet"
import { IconSparkles } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { FC, HTMLAttributes } from "react"

interface DietIconProps extends HTMLAttributes<HTMLDivElement> {
  provider: DietProvider
}

export const DietIcon: FC<DietIconProps> = ({
  provider,

  ...props
}) => {
  const { theme } = useTheme()

  switch (provider as DietProvider) {
    case "Paleo":
      return (
        <TbMeat
          className={cn(
            "size-6 rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
        />
      )

    case "Vegan":
      return (
        <LuVegan
          className={cn(
            "size-6 rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
        />
      )
    case "Gluten-free":
      return (
        <TbSalad
          className={cn(
            "size-6 rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
        />
      )
    case "Ketogenic":
      return (
        <IoFishOutline
          className={cn(
            "size-6 rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
        />
      )
    case "Pescatarian":
      return (
        <GiShrimp
          className={cn(
            "size-6 rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
        />
      )

    case "Vegetarian":
      return (
        <GiBroccoli
          className={cn(
            "size-6 rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
        />
      )
    case "Mediterranean":
      return (
        <GiGrapes
          className={cn(
            "size-6 rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
        />
      )
    default:
      return <IconSparkles />
  }
}
