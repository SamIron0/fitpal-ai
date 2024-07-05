// lib/generateSitemap.ts
import { SitemapStream, streamToPromise } from "sitemap"
import { Readable } from "stream"

interface Link {
  url: string
  changefreq?: string
  priority?: number
  lastmod?: string
}

export async function generateSitemap(): Promise<string> {
  const links: Link[] = [
    {
      url: "/",
      changefreq: "daily",
      priority: 1.0,
      lastmod: "2024-07-03T00:00:00+00:00"
    }
    // Add more static or dynamic routes here
  ]

  const stream = new SitemapStream({ hostname: "https://fitpalai.com" })
  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then(data => data.toString())
  return xmlString
}
