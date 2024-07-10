"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { FitpalAIContext } from "@/context/context"
import { supabase } from "@/lib/supabase/browser-client"
import { User } from "@supabase/supabase-js"
import { IconHome, IconLogin, IconLogout } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { Button } from "../button"
import { FitpalAISVG } from "@/components/icons/fitpalai-svg"
interface NavbarProps {
  user: User | undefined
}
const Navbar = ({ user }: NavbarProps) => {
  const router = useRouter()
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
    return
  }
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center  justify-between border-b border-[#232325] bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="pl-3 lg:pl-12">
        <Link href="/" className="text-2xl font-bold text-primary-foreground">
          <FitpalAISVG scale={0.21} theme="dark" />
        </Link>
      </div>
      <div className="flex w-full items-center justify-end space-x-2 pr-3 lg:pr-12">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="border rounded-full p-2 border-input bg-background hover:bg-accent hover:text-accent-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
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
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => router.push("/")}>
              <IconHome className="mr-1" size={20} /> Home
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user ? (
              <DropdownMenuItem onClick={handleSignOut}>
                <IconLogout className="mr-1" size={20} />
                Logout{" "}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => router.push("/login")}>
                {" "}
                <IconLogin className="mr-1" size={20} />
                Login
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
export default Navbar
