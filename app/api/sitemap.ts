// pages/api/sitemap.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { generateSitemap } from "../../lib/generateSitemap"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const sitemap = await generateSitemap()
    res.setHeader("Content-Type", "application/xml")
    res.status(200).send(sitemap)
  } catch (error) {
    res.status(500).send("Error generating sitemap")
  }
}
