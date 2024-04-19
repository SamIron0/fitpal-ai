import { Button } from "@/components/ui/button"
import type { Tables } from "@/supabase/types"
import { getStripe } from "@/utils/stripe/client"
import { checkoutWithStripe } from "@/utils/stripe/server"
import { getErrorRedirect } from "@/utils/helpers"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login"
}

export default async function Pricing() {
  const supabase = createClient(cookies())
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .maybeSingle()

  if (error) {
    console.log(error)
  }

  const { data: products } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" })
  return <Pricing />
}
