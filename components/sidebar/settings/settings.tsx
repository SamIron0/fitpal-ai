import { FC, useContext, useState } from "react"
import { Button } from "../../ui/button"
import { DietSelect } from "./diet/diet-select"
import { Macros } from "./macros"
import { DietProvider } from "@/types"
import { Allergies } from "./allergies"
import { createSettings, updateSettings } from "@/db/settings"
import { TablesUpdate } from "@/supabase/types"
import { ChatbotUIContext } from "@/context/context"

interface SettingsProps {}
export const Settings: FC<SettingsProps> = () => {
  const { settings } = useContext(ChatbotUIContext)
  const [selectedDiet, setSelectedDiet] = useState<DietProvider>(settings?.diet)
  const [protein, setProtein] = useState(settings?.protein || 0)
  const [carbs, setCarbs] = useState(settings?.carbs || 0)
  const [fat, setFat] = useState(settings?.fat || 0)
  const [calories, setCalories] = useState(protein * 4 + carbs * 4 + fat * 9)
  const [workouts, setWorkouts] = useState(settings?.workouts || 0)
  const [allergies, setAllergies] = useState<string[]>(
    settings?.allergies || []
  )

  const settingsUpdate: TablesUpdate<"settings"> = {
    id: settings?.id,
    protein,
    carbs,
    fat,
    workouts,
    allergies,
    diet: selectedDiet
  }

  return (
    <>
      <Button
        className="mb-3 mt-4 flex  h-[36px] grow"
        onClick={() => updateSettings(settings.id, settingsUpdate)}
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
        onClick={() => updateSettings(settings.id, settingsUpdate)}
      >
        Save Changes{" "}
      </Button>
    </>
  )
}
