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

interface LoginDrawerProps {
  children?: React.ReactNode
  searchParams?: { message: string }
}
export const LoginDrawer = ({ children, searchParams }: LoginDrawerProps) => {
  const signIn = async (formData: FormData) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email") as string,
        password: formData.get("password") as string
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      const json = await res.json()
      const { session } = json
      if (session) {
      }
    }
  }

  const signUp = async (formData: FormData) => {}

  const handleResetPassword = async (formData: FormData) => {}

  return (
    <Drawer>
      <DrawerTrigger className="flex items-center justify-center  ">
        {" "}
        {children}
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center">
        <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
          <form
            className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in"
            action={signIn}
          >
            <Brand />

            <Label className="text-md mt-4" htmlFor="email">
              Email
            </Label>
            <Input
              className="mb-3 rounded-md border bg-inherit px-4 py-2"
              name="email"
              placeholder="you@example.com"
              required
            />

            <Label className="text-md" htmlFor="password">
              Password
            </Label>
            <Input
              className="mb-6 rounded-md border bg-inherit px-4 py-2"
              type="password"
              name="password"
              placeholder="••••••••"
            />

            <SubmitButton className="mb-2 rounded-md bg-blue-700 px-4 py-2 text-white">
              Login
            </SubmitButton>

            <SubmitButton
              formAction={signUp}
              className="mb-2 rounded-md border border-foreground/20 px-4 py-2"
            >
              Sign Up
            </SubmitButton>

            {searchParams?.message && (
              <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
                {searchParams.message}
              </p>
            )}
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
