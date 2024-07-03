import SearchPage from "@/components/search/search-page"
import { getRecipeById } from "@/db/admin"
import { getSettingsById } from "@/db/settings"
import { createClient } from "@/lib/supabase/server"
import { Tables } from "@/supabase/types"
import { cookies } from "next/headers"
import Head from "next/head"

import { Dashboard } from "@/components/ui/dashboard"

export default async function ResultPage({
  params
}: {
  params: { query: string }
}) {
  //console.log('query',params.query)
  const supabase = createClient(cookies())
  const session = (await supabase.auth.getSession()).data.session
  let settings: Tables<"settings"> = {} as Tables<"settings">
  if (session) {
    console.log("session", session)
    let settings = await getSettingsById(session.user.id)
  }

  //console.log("rennd", herokuPromise.json())
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

      <SearchPage />
    </Dashboard>
  )
}
