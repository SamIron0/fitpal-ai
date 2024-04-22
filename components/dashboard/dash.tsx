"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axios from "axios"
interface Props {
  onScrapeUrl: (url: string) => void
}
export default function Dash() {
  const [url, setURL] = useState("") // add this line
  const onScrapeUrl = async (url: string) => {
    var endpoint =
      "https://69fd-2604-3d09-aa7a-95e0-6d93-2ab5-c773-e002.ngrok-free.app/scrape"

    try {
      var result = await axios.post(endpoint, {
        url: url
      })
      //const data = result.data
      const res = result.data.body
      //var data = JSON.parse(res)
      //      console.log(res)

      // call api to create recipe
      var createRecipe = await fetch("api/create_recipe", {
        method: "POST",
        body: JSON.stringify({ recipe: res })
      })

      console.log("recipe: ", createRecipe)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {" "}
      <Input
        value={url}
        onChange={e => setURL(e.target.value)}
        placeholder={"url"}
        style={{ fontSize: "16px" }}
      />
      <Button onClick={() => onScrapeUrl(url)}>Submit</Button>
    </div>
  )
}
