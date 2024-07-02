import { getRecipeById } from "@/db/admin"
import { getSettingsById } from "@/db/settings"
import { createClient } from "@/lib/supabase/server"
import { Tables } from "@/supabase/types"
import { cookies } from "next/headers"

export default async function ResultPage({ params }: { params: { query: string } }) {
  //console.log('query',params.query)
  const supabase = createClient(cookies())
  const session=(await supabase.auth.getSession()).data.session
  let settings: Tables<"settings">={} as Tables<"settings">
  if (session) {
    console.log('session',session)
    let settings = await getSettingsById(session.user.id)
  }
  const herokuPromise = await fetch("https://fitpal-search.onrender.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      method: "POST",
      body: JSON.stringify({
        input: params.query,
        diet:  "Anything",
        allergy:["None"],
      })
    })
  }).then(data => data.json())

    console.log('rennd',herokuPromise)
  return (
    <div>
      hi
     
    </div>
  )}
