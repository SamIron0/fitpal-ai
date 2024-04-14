"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

interface AllergiesProps {}
export function Allergies() {
  const [allergyInput, setAllergyInput] = useState<string>("")
  const [userAllergies, setUserAllergies] = useState<
    string[] | undefined | null
  >(["nuts", "peanuts"])
  const deleteAllergy = async (allergy: string) => {
    setUserAllergies(userAllergies?.filter(a => a !== allergy))
  }
  const addAllergy = async () => {
    setUserAllergies(userAllergies?.concat(allergyInput))
  }

  return (
    <div>
      <div className="flex space-x-2">
        <Input
          onClick={e => e.preventDefault()}
          placeholder="start typing..."
          value={allergyInput}
          onChange={e => setAllergyInput(e.target.value)}
          style={{ fontSize: "16px" }}
        />

        <Button onClick={() => addAllergy()} className="shrink-0">
          Add
        </Button>
      </div>
      <Separator className="my-4" />
      {userAllergies?.length === 0 ? (
        <>No allergies</>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-6">
            {userAllergies?.map(allergy => (
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <p className="text-sm font-medium leading-none">{allergy}</p>
                </div>
                <Button
                  onClick={() => deleteAllergy(allergy)}
                  variant="secondary"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
