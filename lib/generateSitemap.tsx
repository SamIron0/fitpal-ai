import { getSeoPages } from "@/db/admin"
import { SitemapStream, streamToPromise } from "sitemap"
import { Readable } from "stream"
interface Link {
  url: string
  changefreq?: string
  priority?: number
  lastmod?: string
}
// Dummy function to mimic your actual getSeoPages function
async function getSeos() {
  //console.log("seo", seoPages)
  return [
    { id: "what can i make with ground beef" }
    // Add more pages here
  ]
}

export async function generateSitemap(): Promise<string> {
  //const temp = await getSeoPages()
  const seoPages = await getSeoPages()
  //console.log(seoPage)
  //const seoPages = await getSeos()
  const links: {
    url: string
    changefreq: string
    priority: number
    lastmod: string
  }[] = [
    {
      url: "/",
      changefreq: "daily",
      priority: 1.0,
      lastmod: "2024-07-03T00:00:00+00:00"
    }
    // Add more static or dynamic routes here
  ]
  seoPages.forEach(page => {
    const formattedQuery = encodeURIComponent(
      page.id.trim().toLowerCase().replace(/\s+/g, "-")
    )
    links.push({
      url: `/search/${formattedQuery}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString()
    })
  })

  const stream = new SitemapStream({ hostname: "https://www.fitpalai.xyz" })
  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then(data => data.toString())
  return xmlString
}
