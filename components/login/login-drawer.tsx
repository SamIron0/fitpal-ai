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

interface LoginDrawerProps {
  children: React.ReactNode
}
export const LoginDrawer = ({ children }: LoginDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger className="flex items-center justify-center  ">
        {" "}
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
