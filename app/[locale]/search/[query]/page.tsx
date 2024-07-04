import { getSettingsById } from "@/db/settings"
import { createClient } from "@/lib/supabase/server"
import { Tables } from "@/supabase/types"
import { cookies } from "next/headers"
import Head from "next/head"

import { Dashboard } from "@/components/ui/dashboard"
import { SearchResult } from "@/components/search/search-result"
import { getRecipeById, save_query } from "@/db/admin"

export default async function ResultPage({
  params
}: {
  params: { query: string }
}) {
  const supabase = createClient(cookies())
  const uid = (await supabase.auth.getSession()).data.session?.user.id
  let settings: Tables<"settings"> = {} as Tables<"settings">
  function decodeURLComponent(urlComponent: string) {
    const decodedString = urlComponent.replace(/-/g, " ") // Replace hyphens with spaces
    return decodedString.charAt(0).toUpperCase() + decodedString.slice(1) // Capitalize the first letter
  }
  if (params.query) {
    if (uid) {
      settings = await getSettingsById(uid)
    }

    const query =
      typeof params.query === "string" ? params.query : params.query[0]
    //console.log(query)

    const saveQueryPromise = save_query(uid || null, decodeURLComponent(query))

    const renderPromise = fetch("https://fitpal-search.onrender.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: query.replace(/-/g, " "),
        diet: uid ? settings.diet : "Anything",
        allergy: uid ? settings.allergies : ["None"]
      })
    }).then(response => response.json())

    const [_, responseData] = await Promise.all([
      saveQueryPromise,
      renderPromise
    ])

    const recipes = responseData.result
    const description = responseData.description
    const pageTitle = decodeURLComponent(query)
    const keywords = responseData.keywords
    const canonicalUrl = `https://fitpalai.com/search/${query}`
    const ogImage = responseData.ogImage || "https://fitpalai.com/logo.png"

    return (
      <Dashboard>
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:url" content={canonicalUrl} />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={ogImage} />
        </Head>
        <SearchResult query={query} recipes={recipes} />
      </Dashboard>
    )
  }
}
