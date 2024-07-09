import { LoginDrawer } from "@/components/login/login-drawer"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger
} from "@/components/ui/menubar"
import Link from "next/link"

const Navbar = () => {
  //export default function Navbar() {
  function handleButtonClick(): void {}

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center  justify-between border-b border-[#232325] bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex w-full items-center justify-end space-x-2 pr-3 lg:pr-24">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-menu"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 8l16 0" />
                <path d="M4 16l16 0" />
              </svg>
            </MenubarTrigger>
            <MenubarContent>
              <LoginDrawer><MenubarItem>Login</MenubarItem></LoginDrawer>
              <MenubarItem>Signup</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  )
}
export default Navbar
