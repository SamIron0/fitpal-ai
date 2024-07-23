import { Metadata, ResolvingMetadata } from "next"

import { getSettingsById } from "@/db/settings"
import { createClient } from "@/lib/supabase/server"
import { Tables } from "@/supabase/types"
import { cookies } from "next/headers"

import { SearchResult } from "@/components/search/search-result"
import { getSeoPage, save_query } from "@/db/admin"
import { redirect } from "next/navigation"

function decodeURLComponent(urlComponent: string) {
  // Decode the URL component
  const decodedString = decodeURIComponent(urlComponent).replace(/-/g, " ") // Replace hyphens with spaces

  // Capitalize the first letter of the first word
  const capitalizedString =
    decodedString.charAt(0).toUpperCase() + decodedString.slice(1)

  return capitalizedString
}

export default async function ResultPage({
  params
}: {
  params: { query: string }
}) {
  const supabase = createClient(cookies())
  const session = await supabase.auth.getSession()
  const uid = session.data.session?.user.id
  let settings: Tables<"settings"> = {} as Tables<"settings">

  if (params.query) {
    if (uid) {
      settings = await getSettingsById(uid)
    }

    const query =
      typeof params.query === "string" ? params.query : params.query[0]
    //console.log(query)
    const saveQueryPromise =
      session.data.session?.user.email != "ekaronke@gmail.com"
        ? save_query(uid || null, decodeURLComponent(query))
        : null
    try {
      const renderPromise = fetch("https://embed-umber.vercel.app/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: decodeURIComponent(query.replace(/-/g, " "))
        })
      }).then(response => response.json())

      const [_, responseData] = await Promise.all([
        saveQueryPromise,
        renderPromise
      ])

      const recipes = responseData.result
      const description = responseData.description
      const text = responseData.text

      return <SearchResult user_id={uid} query={query} recipes={recipes} text={text} />
    } catch (e) {
      redirect("/?error=Something went wrong")
    }
  }
}

type Props = {
  params: { query: string }
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const query = params.query
  let seo: Tables<"search_result_metadata"> | null =
    {} as Tables<"search_result_metadata">
  try {
    seo = await getSeoPage(query.replace(/-/g, " "))
  } catch (e) {
    console.log(e)
  }
  //console.log(seo)
  return {
    title: decodeURLComponent(query),
    description: seo?.description,
    keywords: seo?.keywords,
    openGraph: {
      title: decodeURLComponent(query),
      description: seo?.description,
      images: [seo?.ogImage || ""]
    }
  }
}
