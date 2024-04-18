import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FC, useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Slider } from "../ui/slider"

interface MacrosStepProps {
  protein: number
  setProtein: (value: number) => void
  carbs: number
  setCarbs: (value: number) => void
  fat: number
  setFat: (value: number) => void
  calories: number
  setCalories: (value: number) => void
  height: number
  setHeight: (value: number) => void
  weight: number
  setWeight: (value: number) => void
  age: number
  setAge: (value: number) => void
  gender: string
  setGender: (value: string) => void
  activityLevel: number
  setActivityLevel: (value: number) => void
}

export const MacrosStep: FC<MacrosStepProps> = ({
  protein,
  setProtein,
  carbs,
  setCarbs,
  fat,
  setFat,
  calories,
  setCalories,
  height,
  weight,
  setHeight,
  setWeight,
  age,
  setAge,
  gender,
  setGender,
  activityLevel,
  setActivityLevel
}) => {
  const [percentProtein, setPercentProtein] = useState(25)
  const [percentCarbs, setPercentCarbs] = useState(50)
  const [percentFat, setPercentFat] = useState(25)

  useEffect(() => {
    setProtein(percentProtein * 0.01 * calories)
    setCarbs(percentCarbs * 0.01 * calories)
    setFat(percentFat * 0.01 * calories)
  }, [calories])
  const onChangeCarbs = (value: number) => {
    setPercentCarbs(value)
    const carbsInKcal = value * 0.01 * calories
    setCarbs(carbsInKcal / 4)
  }
  const onChangeProtein = (value: number) => {
    setPercentProtein(value)
    const proteinInKcal = value * 0.01 * calories
    setProtein(proteinInKcal / 4)
  }
  const onChangeFat = (value: number) => {
    setPercentFat(value)
    const fatInKcal = value * 0.01 * calories
    setFat(fatInKcal / 9)
  }
  return (
    <>
      <div className="space-y-1">
        <Label className="flex items-center">
          <div>Calories(kcal): </div>
        </Label>

        <Input
          value={calories}
          onChange={e => setCalories(Number(e.target.value))}
          placeholder="e.g 2000"
        />
      </div>

      <div className="mt-5 space-y-2">
        <Label className="flex items-center">
          <div className="mr-2">Protein: {"  "}</div>{" "}
          <div className=" text-sm">~{(protein / 4).toFixed(2)}g</div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {Math.round(percentProtein)}%
          </div>
        </Label>

        <Slider
          value={[percentProtein]}
          onValueChange={values => {
            onChangeProtein(values[0])
          }}
          min={10}
          max={100}
          step={1}
        />
      </div>

      <div className=" space-y-1">
        <Label className="flex items-center">
          <div className="mr-2">Carbs: {"  "}</div>{" "}
          <div className=" text-sm">~{(carbs / 4).toFixed(2)}g</div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {Math.round(percentCarbs)}%
          </div>
        </Label>

        <Slider
          value={[percentCarbs]}
          onValueChange={values => {
            onChangeCarbs(values[0])
          }}
          min={10}
          max={100}
          step={1}
        />
      </div>
      <div className=" space-y-1">
        <Label className="flex items-center">
          <div className="mr-2">Fats: {"  "}</div>{" "}
          <div className=" text-sm">~{(fat / 9).toFixed(2)}g</div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {Math.round(percentFat)}%
          </div>
        </Label>

        <Slider
          value={[percentFat]}
          onValueChange={values => {
            onChangeFat(values[0])
          }}
          min={10}
          max={100}
          step={1}
        />
      </div>
    </>
  )
}
