"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TablesInsert } from "@/supabase/types"
import { postData } from "@/utils/helpers"
import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
interface SeoCard {
  id: string
  description?: string
  ogImage?: string
  keywords?: string[]
}

interface SeoProps {
  pages: TablesInsert<"search_result_metadata">[] | null
}
export default function SeoPage({ pages }: SeoProps) {
  const [cards, setCards] = useState<SeoCard[]>([])
  const [updatedCards, setUpdatedCards] = useState<SeoCard[]>([])

  useEffect(() => {
    // Populate with one sample card when the component mounts
    pages && pages.length > 0 && setCards(pages)
  }, [])

  const addNewCard = () => {
    setCards([
      ...cards,
      { id: "", description: "", keywords: [""], ogImage: "" }
    ])
  }

  const updateCard = (
    index: number,
    field: keyof SeoCard,
    value: string | string[]
  ) => {
    const updatedCards = [...cards]
    updatedCards[index] = { ...updatedCards[index], [field]: value }
    setCards(updatedCards)
  }

  const savePages = () => {
    // Empty save function
    for (const card of cards) {
      try {
        const res = postData({ url: "/api/seo", data: card })
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className="min-h-screen w-full bg-black p-8 text-foreground">
      <div className="flex justify-end mb-4 space-x-2">
        <Button onClick={savePages} variant="outline" className="text-white">
          SAVE ALL
        </Button>
        <Button onClick={addNewCard} variant="outline" className="text-white  ">
          + NEW
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Card className="w-[350px]" key={index}>
            <CardHeader>
              <CardTitle>Seo Page</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Query</Label>
                    <Input
                      id="name"
                      placeholder="Name of your project"
                      value={card.id}
                      onChange={e => updateCard(index, "id", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Description</Label>
                    <Input
                      id="description"
                      placeholder="meta description"
                      value={card.description}
                      onChange={e =>
                        updateCard(index, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Keywords</Label>
                    <Input
                      id="keywords"
                      placeholder="keywords"
                      value={card.keywords}
                      onChange={e =>
                        updateCard(index, "keywords", e.target.value.split(","))
                      }
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
