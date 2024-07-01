import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FC } from "react"
import { Slider } from "../ui/slider"
import { DataSelect } from "../diet/data-select"
import { AllergiesProvider, DietProvider } from "@/types/settings"

interface PreferencesStepProps {
  allergies: string[]
  setAllergies: (value: string[]) => void
  diet: string
  setDiet: (value: string) => void
  workouts: number
  setWorkouts: (value: number) => void
}

export const PreferencesStep: FC<PreferencesStepProps> = ({
  allergies,
  setAllergies,
  diet,
  setDiet,
  workouts,
  setWorkouts
}) => {
  return (
    <div className="mb-4 space-y-4 flex flex-col">
      <div className=" space-y-1">
        <Label className="flex items-center">
          <div>Diet {"  "}</div>
        </Label>

        <DataSelect
          data={[
            "Anything",
            "Paleo",
            "Vegan",
            "Gluten-free",
            "Ketogenic",
            "Pescatarian",
            "Mediterranean",
            "Vegetarian"
          ]}
          onSelect={setDiet}
          selectedData={diet as DietProvider}
        />
      </div>
      <div className=" space-y-1">
        <Label className="flex items-center">
          <div>Allergies {"  "}</div>
        </Label>

        <DataSelect
          data={["Nuts", "None"]}
          onSelect={data => setAllergies([data])}
          selectedData={diet as AllergiesProvider}
        />
      </div>
    </div>
  )
}
