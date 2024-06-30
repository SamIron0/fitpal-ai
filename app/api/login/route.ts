import { ServerRuntime } from "next"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { email, password } = json as {
    email: string
    password: string
  }
  //const recipeJson = JSON.stringify(recipe)
  try {
    ;("use server")

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return new Response(
        JSON.stringify({
          errors: {
            status: "401",
            title: "Authentication failed",
            detail: error.message
          }
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
    }

    return new Response(JSON.stringify(data))
  } catch (error) {
    return new Response(JSON.stringify({ error: error }))
  }
}
