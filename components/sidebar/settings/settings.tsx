import { FC, useState } from "react";
import { Button } from "../../ui/button";
import { DietSelect } from "./diet/diet-select";
import { Macros } from "./macros";
import { DietProvider } from "@/types";
import { Allergies } from "./allergies";

interface SettingsProps {}
export const Settings: FC<SettingsProps> = () => {
  const [selectedDiet, setSelectedDiet] = useState<DietProvider>("none");
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [calories, setCalories] = useState(0);
  const [workouts, setWorkouts] = useState(0);

  const updateSettings = (selectedDiet: DietProvider) => {
    console.log(selectedDiet);
  };
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
        userAllergies={["nut", "dairy"]}
        setUserAllergies={(allergies: string[]) => {
          console.log(value);
        }}
      />
    </>
  );
};
