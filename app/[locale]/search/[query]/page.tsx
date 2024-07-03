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
  if (params.query) {
    if (uid) {
      settings = await getSettingsById(uid)
    }

    const query =
      typeof params.query === "string" ? params.query : params.query[0]
    //console.log(query)
    const saveQueryPromise = save_query(uid || null, query)

    const herokuPromise = fetch("https://fitpal-search.onrender.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: query,
        diet: settings.diet,
        allergy: settings.allergies
      })
    }).then(data => data.json())

    const [_, responseData] = await Promise.all([
      saveQueryPromise,
      herokuPromise
    ])
    const recipeIds = responseData.result
    const recipePromises = recipeIds.map((recipeId: string) =>
      getRecipeById(recipeId)
    )
    const recipes = await Promise.all(recipePromises)

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
