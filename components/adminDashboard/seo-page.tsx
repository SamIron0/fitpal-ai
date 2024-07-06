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
import { toast } from "sonner"

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
      // delete from cards array
      setCards(cards.filter(card => card.id !== id))
      toast.success("Page deleted successfully")
    } catch (err) {
      toast.error("Error deleting page")
      console.log(err)
    }
  }
  const savePage = async (card: TablesInsert<"search_result_metadata">) => {
    const id = toast.loading("Saving...")
    try {
      console.log(card)
      const res = await fetch("/api/seo", {
        method: "POST",
        body: JSON.stringify({ data: card })
      })

      toast.dismiss(id)
      toast.success("Page saved successfully")
    } catch (err) {
      toast.dismiss(id)
      toast.error("Error saving page")
      console.log(err)
    }
  }

  const updateLongTermCache = async () => {
    const id = toast.loading("Clearing...")
    try {
      const res = await fetch("/api/seo/clear_cache", {
        method: "DELETE"
      })
      toast.dismiss(id)
      toast.success("Cache cleared successfully")
      const id2 = toast.loading("Updating cache")
      saveAllPages()
      toast.dismiss(id2)
      toast.success("Cache updated successfully")
    } catch (err) {
      toast.dismiss(id)
      toast.error("Error clearing cache")
      console.log(err)
    }
  }
  return (
    <div className="w-full bg-black  p-8 text-foreground">
      <div className="flex justify-end  space-x-2">
        <Button
          onClick={updateLongTermCache}
          variant="outline"
          className="text-white"
        >
          UPDATE CACHE
        </Button>

        <Button onClick={saveAllPages} variant="outline" className="text-white">
          SAVE ALL
        </Button>
        <Button onClick={addNewCard} variant="outline" className="text-white  ">
          + NEW
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-12">
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
                      placeholder="Query"
                      value={card.id}
                      onChange={e => updateCard(index, "id", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
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
                    <Label htmlFor="text">Text</Label>
                    <Textarea
                      id="text"
                      placeholder="text"
                      value={card.text}
                      onChange={e => updateCard(index, "text", e.target.value)}
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
              <Button onClick={() => deletePage(card.id)} variant="outline">
                Delete
              </Button>
              <Button onClick={() => savePage(card)}>Deploy</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
