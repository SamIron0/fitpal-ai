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
    setCarbs(value * 0.01 * calories)
  }
  const onChangeProtein = (value: number) => {
    setPercentProtein(value)
    setProtein(value * 0.01 * calories)
  }
  const onChangeFat = (value: number) => {
    setPercentFat(value)
    setFat(value * 0.01 * calories)
  }
  return (
    <>
      <div className="space-y-1">
        <Label>
          <div>Calories</div>
          <div className=" text-sm">{calories}</div>
        </Label>

        <Input
          value={calories}
          onChange={e => setCalories(Number(e.target.value))}
        />
      </div>

      <div className="mt-5 space-y-2">
        <Label className="flex items-center">
          <div>Protein</div>
          <div className=" text-sm">{protein}</div>
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

      <div className="space-y-1">
        <Label>
          <div>Carbs</div>
          <div className=" text-sm">{carbs}</div>
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
      <div className="space-y-1">
        <Label>
          <div>Fat</div>
          <div className=" text-sm">{fat}</div>
        </Label>

        <Slider
          value={[carbs]}
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
