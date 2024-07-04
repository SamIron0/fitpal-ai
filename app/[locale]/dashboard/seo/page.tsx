'use client'
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SeoCard {
  query: string
  descr: string
  text: string
  kws: string
  ogImg: string
}

const sampleCard: SeoCard = {
  query: "Sample Query",
  descr: "This is a sample description",
  text: "Sample text content goes here",
  kws: "sample, keywords, example",
  ogImg: "https://example.com/sample-image.jpg"
}

const Seo: React.FC = () => {
  const [cards, setCards] = useState<SeoCard[]>([])

  useEffect(() => {
    // Populate with one sample card when the component mounts
    setCards([sampleCard])
  }, [])

  const addNewCard = () => {
    setCards([...cards, { query: "", descr: "", text: "", kws: "", ogImg: "" }])
  }

  const updateCard = (index: number, field: keyof SeoCard, value: string) => {
    const updatedCards = [...cards]
    updatedCards[index] = { ...updatedCards[index], [field]: value }
    setCards(updatedCards)
  }

  const saveCards = () => {
    // Empty save function
    console.log("Saving cards:", cards)
  }

  return (
    <div className="min-h-screen w-full bg-black p-8 text-foreground">
      <div className="flex justify-end mb-4 space-x-2">
        <Button onClick={saveCards} variant="outline" className="text-black">
          SAVE
        </Button>
        <Button onClick={addNewCard} variant="outline" className="text-black  ">
          + NEW
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Card key={index} className="bg-background">
            <CardContent className="p-4">
              <Input
                placeholder="Query"
                value={card.query}
                onChange={e => updateCard(index, "query", e.target.value)}
                className="mb-2 bg-zinc-700 text-white"
              />
              <Input
                placeholder="Description"
                value={card.descr}
                onChange={e => updateCard(index, "descr", e.target.value)}
                className="mb-2 bg-zinc-700 text-white"
              />
              <Input
                placeholder="Text"
                value={card.text}
                onChange={e => updateCard(index, "text", e.target.value)}
                className="mb-2 bg-zinc-700 text-white"
              />
              <Input
                placeholder="Keywords"
                value={card.kws}
                onChange={e => updateCard(index, "kws", e.target.value)}
                className="mb-2 bg-zinc-700 text-white"
              />
              <Input
                placeholder="Original Image"
                value={card.ogImg}
                onChange={e => updateCard(index, "ogImg", e.target.value)}
                className="bg-zinc-700 text-white"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Seo
