// app/api/sitemap/route.ts
import { NextResponse } from "next/server"
import { generateSitemap } from "@/lib/generateSitemap"
import { getSeoPages } from "@/db/admin"

export async function GET() {
  try {
    //console.log("seo pages")

    const sitemap = await generateSitemap()
    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml"
      }
    })
  } catch (error) {
    return new NextResponse("Error generating sitemap", { status: 500 })
  }
}
