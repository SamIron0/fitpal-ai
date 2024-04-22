"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface Props {
  onScrape: (url: string) => void
}
export default function Dash({ onScrape }: Props) {
  const [url, setURL] = useState("") // add this line

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {" "}
      <Input
        value={url}
        onChange={e => setURL(e.target.value)}
        placeholder={"url"}
      />
      <Button onClick={() => onScrape(url)}>Submit</Button>
    </div>
  )
}
