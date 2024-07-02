import SearchPage from "@/components/search-page"
import { Dashboard } from "@/components/ui/dashboard"
import { getForYou, getGuestForYou } from "@/db/admin"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export default async function Search() {
  const supabase = createClient(cookies())
  const {
    data: { session }
  } = await supabase.auth.getSession()
  let forYou: Tables<"recipes">[] = []

  if (session) {
    forYou = await getForYou(session?.user.id)
  } else {
    forYou = await getGuestForYou()
  }

  return (
    <Dashboard>
      <SearchPage for_you={forYou} />
    </Dashboard>
  )
}
