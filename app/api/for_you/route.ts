import { ServerRuntime } from "next"
import { getRecipeById } from "@/db/admin"
export const runtime: ServerRuntime = "edge"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { getForYou, getGuestForYou } from "@/db/for-you"
import { Tables } from "@/supabase/types"
export async function POST(request: Request) {
  const json = await request.json()
  const { id } = json as {
    id: string
  }
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const session = (await supabase.auth.getSession()).data.session
    let for_you: Tables<"recipes">[] = []
    if (!session) {
      let for_you = await getGuestForYou()
    }

    if (session) {
      let for_you = await getForYou(session?.user.id)
    }

    return new Response(JSON.stringify({ for_you }))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}
