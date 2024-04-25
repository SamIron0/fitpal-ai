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
      <DrawerContent className="flex flex-col items-center"></DrawerContent>
    </Drawer>
  )
}
