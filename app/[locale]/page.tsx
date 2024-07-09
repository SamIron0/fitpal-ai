import SearchPage from "@/components/search/search-page"
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
  let forYou: Tables<"recipes2">[] = []

  if (session) {
    forYou = await getForYou(session?.user.id)
  } else {
    forYou = await getGuestForYou()
  }

  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Find curated recipes by entering your ingredients into our AI-powered search engine. Search using natural language or ingredients and get the closest recipes"
        />
        <meta
          name="keywords"
          content="recipes, ingredients,ai, cooking, meals, personalized recipes"
        />
        <meta
          property="og:title"
          content="Find Recipes from Ingredients | FitpalAI"
        />
        <meta
          property="og:description"
          content="Find curated recipes by entering your ingredients into our AI-powered search engine. Search using natural language or ingredients and get the closest recipes."
        />
        <meta property="og:url" content="https://fitpalai.com/search" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="Find Recipes from Ingredients | FitpalAI"
        />
        <meta
          name="twitter:description"
          content="Find curated recipes by entering your ingredients into our AI-powered search engine. Search using natural language or ingredients and get the closest recipes"
        />
      </Head>

      <SearchPage for_you={forYou} />
    </div>
  )
}
