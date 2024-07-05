"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TablesInsert } from "@/supabase/types"
import { postData } from "@/utils/helpers"
import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"

interface SeoProps {
  pages: TablesInsert<"search_result_metadata">[] | null
}
export default function SeoPage({ pages }: SeoProps) {
  const [cards, setCards] = useState<TablesInsert<"search_result_metadata">[]>(
    []
  )
  const [updatedCards, setUpdatedCards] = useState<
    TablesInsert<"search_result_metadata">[]
  >([])

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
    field: keyof TablesInsert<"search_result_metadata">,
    value: string | string[]
  ) => {
    const updatedCards = [...cards]
    updatedCards[index] = { ...updatedCards[index], [field]: value }
    setCards(updatedCards)
  }

  const saveAllPages = () => {
    // Empty save function
    for (const card of cards) {
      savePage(card)
    }
  }
  const deletePage = async (id: string) => {
    try {
      const res = await fetch("/api/seo", {
        method: "DELETE",
        body: JSON.stringify({ data: id })
      })
    } catch (err) {
      console.log(err)
    }
  }
  const savePage = async (card: TablesInsert<"search_result_metadata">) => {
    try {
      console.log(card)
      const res = await fetch("/api/seo", {
        method: "POST",
        body: JSON.stringify({ data: card })
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full bg-black  h-dvh p-8 text-foreground">
      <div className="flex justify-end mb-4 space-x-2">
        <Button onClick={saveAllPages} variant="outline" className="text-white">
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
                      id="id"
                      placeholder="Name of your project"
                      value={card.id}
                      onChange={e => updateCard(index, "id", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="meta description"
                      value={card.description}
                      onChange={e =>
                        updateCard(index, "description", e.target.value)
                      }
                      rows={4}
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
              <Button onClick={() => deletePage(card.id)} variant="outline">Delete</Button>
              <Button onClick={() => savePage(card)}>Deploy</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
