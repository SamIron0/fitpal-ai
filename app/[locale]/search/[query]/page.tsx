import SearchPage from "@/components/search/search-page"
import { getRecipeById } from "@/db/admin"
import { getSettingsById } from "@/db/settings"
import { createClient } from "@/lib/supabase/server"
import { Tables } from "@/supabase/types"
import { cookies } from "next/headers"
import Head from "next/head"

import { Dashboard } from "@/components/ui/dashboard"
import { SearchResult } from "@/components/search/search-result"

export default async function ResultPage({
  params
}: {
  params: { query: string }
}) {
  const supabase = createClient(cookies())
  const uid = (await supabase.auth.getSession()).data.session?.user.id
  let settings: Tables<"settings"> = {} as Tables<"settings">
  if (params.query) {
    if (uid) {
      settings = await getSettingsById(uid)
    }

    const query =
      typeof params.query === "string" ? params.query : params.query[0]

    const res = await fetch("https://www.fitpalai.com/api/recipe/get_recipes", {
      method: "POST",
      body: JSON.stringify({
        input: query,
        diet: settings?.diet || "Anything",
        allergy: settings?.allergies || ["None"]
      })
    })

    if (!res.ok) {
      throw new Error(`Failed to get recipes`)
    }
    const data = await res.json()
    const recipes = data

    return (
      <Dashboard>
        <Head>
          <meta
            name="description"
            content="Find curated recipes by entering your ingredients into our AI-powered search engine. You can now search deeper into recipes beyond just ingredients."
          />
          <meta
            name="keywords"
            content="recipes, ingredients, cooking, meals, personalized recipes"
          />
          <meta
            property="og:title"
            content="Find Recipes from Ingredients | FitpalAI"
          />
          <meta
            property="og:description"
            content="Find curated recipes by entering your ingredients into our AI-powered search engine. You can now search deeper into recipes beyond just ingredients."
          />
          <meta property="og:url" content="https://fitpalai.com/search" />
          <meta property="og:type" content="website" />
          <meta
            name="twitter:title"
            content="Find Recipes from Ingredients | FitpalAI"
          />
          <meta
            name="twitter:description"
            content="Find curated recipes by entering your ingredients into our AI-powered search engine. You can now search deeper into recipes beyond just ingredients."
          />
        </Head>

        <SearchResult recipes={recipes} />
      </Dashboard>
    )
  }
}
