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
  height: number
  width: number
}

export const DietIcon: FC<DietIconProps> = ({
  provider,
  height,
  width,
  ...props
}) => {
  const { theme } = useTheme()

  switch (provider as DietProvider) {
    case "anything":
      return (
        <IoFastFoodOutline
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )

    case "paleo":
      return (
        <TbMeat
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )

    case "vegan":
      return (
        <LuVegan
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "gluten-free":
      return (
        <TbSalad
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "ketogenic":
      return (
        <IoFishOutline
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "pescatarian":
      return (
        <GiShrimp
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "low-carb":
      return (
        <MdOutlineEggAlt
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "vegetarian":
      return (
        <GiBroccoli
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )
    case "mediterranean":
      return (
        <GiGrapes
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )
    default:
      return <IconSparkles size={width} />
  }
}
