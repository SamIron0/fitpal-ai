import { retrieveEmbedding } from "@/components/sidebar/settings/embeddings"
import { Database } from "@/supabase/types"
import { ChatSettings } from "@/types"
import { createClient } from "@supabase/supabase-js"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { ServerRuntime } from "next"

export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages, customModelId, settings } = json as {
    chatSettings: ChatSettings
    messages: any[]
    customModelId: string
    settings: any
  }
  // const workspace_id =
  try {
    /*  const supabaseAdmin = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const embedding = await retrieveEmbedding(workspace_id)
    if (embedding !== null) {
      const { data: documents } = await supabaseAdmin.rpc("match_documents", {
        query_embedding: embedding[0].embedding, // Pass the embedding you want to compare
        match_threshold: 0.75, // Choose an appropriate threshold for your data
        match_count: 5 // Choose the number of matches
      })
    }*/
    const API_KEY = process.env.DEEPINFRA_API_KEY
    console.log("settings:", settings)

    const response = await fetch(
      "https://api.deepinfra.com/v1/openai/chat/completions",
      {
        method: "POST",
        body: JSON.stringify({
          model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
          messages,
          stream: true
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${API_KEY}`
        }
      }
    )

    const stream = OpenAIStream(response)
    // Respond with the stream
    return new StreamingTextResponse(stream)
    //   return new Response("Not implemented")
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "Custom API Key not found. Please set it in your profile settings."
    } else if (errorMessage.toLowerCase().includes("incorrect api key")) {
      errorMessage =
        "Custom API Key is incorrect. Please fix it in your profile settings."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
