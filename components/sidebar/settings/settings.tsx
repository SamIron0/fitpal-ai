import { FC, useState } from "react"
import { Button } from "../../ui/button"
import { DietSelect } from "./diet/diet-select"
import { Macros } from "./macros"
import { DietProvider } from "@/types"

interface SettingsProps {}
export const Settings: FC<SettingsProps> = () => {
  const [selectedDiet, setSelectedDiet] = useState<DietProvider>("none")
  const updateSettings = (selectedDiet: DietProvider) => {
    console.log(selectedDiet)
  }
  return (
    <>
      <Button
        className="mb-3 flex  h-[36px] grow"
        onClick={() => updateSettings(selectedDiet)}
      >
        Save{" "}
      </Button>
      <div className="text-muted-foreground font-bolds mb-1 text-sm">Diet</div>
      <DietSelect onSelect={setSelectedDiet} selectedDiet={selectedDiet} />
      <Macros />
    </>
  )
}
