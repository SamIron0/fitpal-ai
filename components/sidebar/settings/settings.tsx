import { toast } from "sonner"
import { FC, useContext, useEffect, useState } from "react"
import { Button } from "../../ui/button"
import { DataSelect } from "../../diet/data-select"
import { Macros } from "./macros"
import { AllergiesProvider, DietProvider } from "@/types/settings"
import { updateSettings } from "@/db/settings"
import { TablesUpdate } from "@/supabase/types"
import { FitpalAIContext } from "@/context/context"
import { LoginDrawer } from "@/components/login/login-drawer"
import { createClient } from "@/lib/supabase/client"

interface SettingsProps {}
export const Settings: FC<SettingsProps> = () => {
  const { settings, setChatSettings, chatSettings, setSettings } =
    useContext(FitpalAIContext)

  const [selectedDiet, setSelectedDiet] = useState<string>(settings?.diet)
  const [protein, setProtein] = useState(Math.round(settings?.protein) || 0)
  const [carbs, setCarbs] = useState(Math.round(settings?.carbs) || 0)
  const [fat, setFat] = useState(Math.round(settings?.fat) || 0)
  const [calories, setCalories] = useState(settings?.calories || 0)
  const [workouts, setWorkouts] = useState(settings?.workouts || 0)
  const [user_allergies, setUser_allergies] = useState(
    settings?.allergies || []
  )
  const onSetUser_allergies = (allergy: string) => {
    user_allergies[0] = allergy
    setUser_allergies(user_allergies)
  }

  const [session, setSession] = useState<any>(null)

  //console.log("settings:", settings)
  const settingsUpdate: TablesUpdate<"settings"> = {
    id: settings?.id,
    protein,
    carbs,
    fat,
    calories,
    workouts,
    allergies: user_allergies,
    diet: selectedDiet,
    workspace_id: settings?.workspace_id,
    user_id: settings?.user_id
  }
  const supabase = createClient()
  const diets: DietProvider[] = [
    "Anything",
    "Paleo",
    "Vegan",
    "Gluten-free",
    "Ketogenic",
    "Pescatarian",
    "Mediterranean",
    "Vegetarian"
  ]
  const allergens: AllergiesProvider[] = ["Nuts"]
  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession()
      if (error) {
        console.error("Error getting session:", error)
      } else {
        setSession(session)
        // Do something with the session
      }
    }

    getSession()
  }, []) // Run the effect only once, when the component mounts

  const handleSaveChanges = async (id: string, settings: any) => {
    // update context
    if (settings.id === undefined || settings.id === "") {
      return
    }
    const toastId = toast.loading("Saving...")
    setSettings(settings)
    // update thtee db
    await updateSettings(id, settings)

    toast.dismiss(toastId)
    toast.success("Settings saved!")
  }
  return (
    <>
      {session ? (
        <Button
          className="mb-3 mt-4 flex  h-[36px] grow"
          onClick={() => handleSaveChanges(settings.id, settingsUpdate)}
          disabled={JSON.stringify(settings) === JSON.stringify(settingsUpdate)}
        >
          Save Changes{" "}
        </Button>
      ) : (
        <LoginDrawer>
          {" "}
          <Button className="mb-3 mt-4 flex  h-[36px] grow">
            Save Changes{" "}
          </Button>
        </LoginDrawer>
      )}
      <div className="mb-1 mt-4 text-sm font-semibold text-muted-foreground">
        Diet
      </div>
      <DataSelect
        data={diets}
        onSelect={setSelectedDiet}
        selectedData={selectedDiet}
      />
      <div className="mb-1 mt-8 text-sm font-semibold text-muted-foreground">
        Allergies
      </div>
      <DataSelect
        data={allergens}
        onSelect={onSetUser_allergies}
        selectedData={user_allergies[0]}
      />
    </>
  )
}
