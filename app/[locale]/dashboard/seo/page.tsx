import SeoPage from "@/components/adminDashboard/seo-page"
import { getSeoPages, saveSeoPage } from "@/db/admin"
import { createClient } from "@/lib/supabase/server"
import { TablesInsert } from "@/supabase/types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Seo() {
  const supabase = await createClient(cookies())
  const {
    data: { session }
  } = await supabase.auth.getSession()
  if (session?.user.email !== "ekaronke@gmail.com") {
    redirect("/")
  }
  const pages = await getSeoPages()

  return <SeoPage pages={pages} />
}
