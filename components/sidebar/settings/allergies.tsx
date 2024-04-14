"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface AllergiesProps {
  userAllergies: string[] | undefined | null;
  setUserAllergies: (allergies: string[] | undefined | null) => void;
}
export const Allergies = ({}: AllergiesProps) => {
  const [allergyInput, setAllergyInput] = useState<string>("");
   const deleteAllergy = async (allergy: string) => {
    setUserAllergies(userAllergies?.filter((a) => a !== allergy));
  };
  const addAllergy = async () => {
    setUserAllergies(userAllergies?.concat(allergyInput));
  };

  return (
    <div className="w-full">
      <div className="flex mt-4 space-x-2">
        <Input
          onClick={(e) => e.preventDefault()}
          placeholder="start typing..."
          value={allergyInput}
          onChange={(e) => setAllergyInput(e.target.value)}
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
            {userAllergies?.map((allergy, index) => (
              <div
                className="flex items-center justify-between space-x-4"
                key={index}
              >
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
  );
};
