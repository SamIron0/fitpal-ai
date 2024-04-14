import { FC, useContext, useState } from "react"
import { Button } from "../../ui/button"
import { DietSelect } from "./diet/diet-select"
import { Macros } from "./macros"
import { DietProvider } from "@/types"
import { Allergies } from "./allergies"
import { createSettings } from "@/db/settings"
import { TablesUpdate } from "@/supabase/types"
import { ChatbotUIContext } from "@/context/context"

interface SettingsProps {}
export const Settings: FC<SettingsProps> = () => {
  const [selectedDiet, setSelectedDiet] = useState<DietProvider>("none")
  const [protein, setProtein] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [fat, setFat] = useState(0)
  const [calories, setCalories] = useState(protein * 4 + carbs * 4 + fat * 9)
  const [workouts, setWorkouts] = useState(0)
  const [allergies, setAllergies] = useState<string[]>(["nut", "dairy"])
  const { settings } = useContext(ChatbotUIContext)

  const settingsUpdate: TablesUpdate<"settings"> = {
    id: settings?.id,
    protein,
    carbs,
    fat,
    workouts,
    allergies,
    diet: selectedDiet
  }
  const updateSettings = (selectedDiet: DietProvider) => {
    console.log(selectedDiet)
  }
  return (
    <>
      <Button
        className="mb-3 mt-4 flex  h-[36px] grow"
        onClick={() => updateSettings(selectedDiet)}
      >
        Save Changes{" "}
      </Button>
      <div className="text-muted-foreground mb-1 mt-4 text-sm font-semibold">
        Diet
      </div>
      <DietSelect onSelect={setSelectedDiet} selectedDiet={selectedDiet} />
      <Macros
        protein={protein}
        setProtein={setProtein}
        carbs={carbs}
        setCarbs={setCarbs}
        fat={fat}
        setFat={setFat}
        workouts={workouts}
        setWorkouts={setWorkouts}
      />
      <Allergies
        userAllergies={allergies}
        setUserAllergies={(allergies: string[]) => {
          setAllergies(allergies)
        }}
      />
      <Button
        className="mb-3 mt-4 flex  h-[36px] grow"
        onClick={() => updateSettings(selectedDiet)}
      >
        Save Changes{" "}
      </Button>
    </>
  )
}
