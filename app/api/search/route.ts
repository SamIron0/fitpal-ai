import { createClient } from "@/lib/supabase/server"
import { ServerRuntime } from "next"
import { cookies } from "next/headers"
const { CohereClient } = require("cohere-ai")
export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Grab the user's query from the JSON payload
  const { query } = await request.json()

  const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
  })

  const embed = await cohere.embed({
    texts: [query],
    model: "embed-english-v3.0",
    inputType: "classification"
  })

  const embedding = embed.embeddings[0]

  console.log("embedding", embedding)
  // Call hybrid_search Postgres function via RPC
  const { data: documents } = await supabase.rpc("hybrid_search", {
    query_text: query,
    query_embedding: embedding,
    match_count: 10
  })

  console.log("documents", documents)
  return new Response(JSON.stringify(documents), {
    headers: { "Content-Type": "application/json" }
  })
}
