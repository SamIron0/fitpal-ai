import { oneLine, stripIndent } from "common-tags"
import { retrieveEmbedding } from "@/components/sidebar/settings/embeddings"
import { Database, Tables } from "@/supabase/types"
import { ChatSettings } from "@/types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { ServerRuntime } from "next"
import { createRecipe } from "@/db/recipes"
export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { recipe } = json as {
    recipe: Tables<"recipes">
  }

  try {
    createRecipe(recipe)
  } catch (error) {
    console.log(error)
  }
}
