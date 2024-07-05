"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TablesInsert } from "@/supabase/types"

interface SeoCard {
  query: string
  descr: string
  text: string
  kws: string
  ogImg: string
}

interface SeoProps {
  pages: TablesInsert<"search_result_metadata">[] | null
  onSave: (page: TablesInsert<"search_result_metadata">) => void
}
export default function SeoPage({ pages, onSave }: SeoProps) {
  const [cards, setCards] = useState<TablesInsert<"search_result_metadata">[]>(
    []
  )

  useEffect(() => {
    // Populate with one sample card when the component mounts
    pages && setCards(pages)
  }, [])

  const addNewCard = () => {
    setCards([
      ...cards,
      { id: "", description: "", keywords: [""], ogImage: "" }
    ])
  }

  const updateCard = (index: number, field: keyof SeoCard, value: string) => {
    const updatedCards = [...cards]
    updatedCards[index] = { ...updatedCards[index], [field]: value }
    setCards(updatedCards)
  }

  const saveCards = () => {
    // Empty save function
    for (const card of cards) {
      onSave(card)
    }
  }

  return (
    <div className="min-h-screen w-full bg-black p-8 text-foreground">
      <div className="flex justify-end mb-4 space-x-2">
        <Button onClick={saveCards} variant="outline" className="text-white">
          SAVE
        </Button>
        <Button onClick={addNewCard} variant="outline" className="text-white  ">
          + NEW
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Card key={index} className="bg-background">
            <CardContent className="p-4">
              <Input
                placeholder="Query"
                value={card.id}
                onChange={e => updateCard(index, "query", e.target.value)}
                className="mb-2 bg-zinc-700 text-white"
              />
              <Input
                placeholder="Description"
                value={card.description}
                onChange={e => updateCard(index, "descr", e.target.value)}
                className="mb-2 bg-zinc-700 text-white"
              />

              <Input
                placeholder="Keywords"
                value={card.keywords}
                onChange={e => updateCard(index, "kws", e.target.value)}
                className="mb-2 bg-zinc-700 text-white"
              />
              <Input
                placeholder="Original Image"
                value={card.ogImage}
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
