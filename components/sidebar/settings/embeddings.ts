import { supabase } from "@/lib/supabase/browser-client"
import { pipeline } from "@xenova/transformers"
import { FC } from "react"

interface EmbeddingsProps {
  title: string
  body: string
}

export const embeddingsInsert: FC<EmbeddingsProps> = async () => {
  const generateEmbedding = await pipeline(
    "feature-extraction",
    "Supabase/gte-small"
  )

  const title = "First post!"
  const body = "Hello world!"

  // Generate a vector using Transformers.js
  const output = await generateEmbedding(body, {
    pooling: "mean",
    normalize: true
  })

  // Extract the embedding output
  const embedding = Array.from(output.data)

  // Store the vector in Postgres
  const { data, error } = await supabase.from("documents").insert({
    title,
    body,
    embedding
  })
  return data
}
