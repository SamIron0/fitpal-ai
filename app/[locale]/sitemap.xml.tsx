import { GetServerSideProps } from "next"
import { generateSitemap } from "@/lib/generateSitemap"

const Sitemap = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = await generateSitemap()

  res.setHeader("Content-Type", "application/xml")
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default Sitemap
