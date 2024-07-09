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
import { IconHome, IconLogout } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext } from "react"

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
      <div className="flex w-full items-center justify-end space-x-2 pr-3 lg:pr-12">
        <DropdownMenu>
          <DropdownMenuTrigger>
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
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
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
