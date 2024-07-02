import SearchPage from "@/components/search-page"
import { Dashboard } from "@/components/ui/dashboard"
import { getForYou, getGuestForYou } from "@/db/admin"
import { createClient } from "@/lib/supabase/server"
import { Tables } from "@/supabase/types"
import Head from "next/head"
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
      <Head>
        <meta
          name="description"
          content="Find curated recipes by entering your ingredients into our AI-powered search engine. You can now search deeper into the recipes beyond just ingredients."
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
          content="Find curated recipes by entering your ingredients into our AI-powered search engine. You can now search deeper into the recipes beyond just ingredients."
        />
        <meta property="og:url" content="https://fitpalai.com/search" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="Find Recipes from Ingredients | FitpalAI"
        />
        <meta
          name="twitter:description"
          content="Find curated recipes by entering your ingredients into our AI-powered search engine. You can now search deeper into the recipes beyond just ingredients."
        />
      </Head>

      <SearchPage for_you={forYou} />
    </Dashboard>
  )
}
