import { toast } from "react-hot-toast"
import { FC, useContext, useState } from "react"
import { Button } from "../../ui/button"
import { DietSelect } from "../../diet/diet-select"
import { Macros } from "./macros"
import { DietProvider } from "@/types/diet"
import { Allergies } from "./allergies"
import { updateSettings } from "@/db/settings"
import { TablesUpdate } from "@/supabase/types"
import { ChatbotUIContext } from "@/context/context"

interface SettingsProps {}
export const Settings: FC<SettingsProps> = () => {
  const { settings } = useContext(ChatbotUIContext)
  const [selectedDiet, setSelectedDiet] = useState<DietProvider>(settings?.diet)
  const [protein, setProtein] = useState(Math.round(settings?.protein) || 0)
  const [carbs, setCarbs] = useState(Math.round(settings?.carbs) || 0)
  const [fat, setFat] = useState(Math.round(settings?.fat) || 0)
  const [calories, setCalories] = useState(settings?.calories || 0)
  const [workouts, setWorkouts] = useState(settings?.workouts || 0)
  const [allergies, setAllergies] = useState<string[]>(
    settings?.allergies || []
  )
  const { setChatSettings, chatSettings, setSettings } =
    useContext(ChatbotUIContext)
  //console.log("settings:", settings)
  const settingsUpdate: TablesUpdate<"settings"> = {
    id: settings?.id,
    protein,
    carbs,
    fat,
    calories,
    workouts,
    allergies,
    diet: selectedDiet,
    workspace_id: settings?.workspace_id,
    user_id: settings?.user_id
  }
  const handleSaveChanges = async (id: string, settings: any) => {
    // update context
    if (!settings) {
      return
    }
    const toastId = toast.loading("Saving...")
    setSettings(settings)
    // update thtee db
    await updateSettings(id, settings)
    setChatSettings({
      includeWorkspaceInstructions:
        chatSettings?.includeWorkspaceInstructions || false,
      includeProfileContext: chatSettings?.includeProfileContext || false,
      contextLength: chatSettings?.contextLength || 4096,
      temperature: chatSettings?.temperature || 0.7,
      model: chatSettings?.model || "gpt-3.5-turbo",
      prompt: chatSettings?.prompt || "",
      embeddingsProvider: chatSettings?.embeddingsProvider || "openai",
      contextIsOutdated: true
    })
    toast.remove(toastId)
    toast.success("Settings saved!")
  }
  return (
    <>
      <Button
        className="mb-3 mt-4 flex  h-[36px] grow"
        onClick={() => handleSaveChanges(settings.id, settingsUpdate)}
        disabled={JSON.stringify(settings) === JSON.stringify(settingsUpdate)}
      >
        Save Changes{" "}
      </Button>
      <div className="mb-1 mt-4 text-sm font-semibold text-muted-foreground">
        Diet
      </div>
      <DietSelect onSelect={setSelectedDiet} selectedDiet={selectedDiet} />
      <Macros
        protein={protein}
        setProtein={setProtein}
        carbs={carbs}
        setCarbs={setCarbs}
        fat={fat}
        calories={calories}
        setCalories={setCalories}
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
        className="mb-3 mt-12 flex  h-[36px] grow"
        onClick={() => handleSaveChanges(settings.id, settingsUpdate)}
        disabled={JSON.stringify(settings) === JSON.stringify(settingsUpdate)}
      >
        Save Changes{" "}
      </Button>
    </>
  )
}
