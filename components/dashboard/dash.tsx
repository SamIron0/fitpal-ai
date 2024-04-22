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
      "https://3x077l0rol.execute-api.us-east-1.amazonaws.com/main/create-mealplan"

    try {
      var result = await axios.post(endpoint, {
        url: url
      })
      const res = result.data
      var data = JSON.parse(res)
      console.log(data)
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
