import { FC, useState } from "react"
import { Slider } from "../../ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface MacrosProps {
  calories: number
  setCalories: Function
  protein: number
  setProtein: Function
  carbs: number
  setCarbs: Function
  fat: number
  setFat: Function
  workouts: number
  setWorkouts: Function
}
export const Macros: FC<MacrosProps> = ({
  calories,
  setCalories,
  protein,
  setProtein,
  carbs,
  setCarbs,
  fat,
  setFat,
  workouts,
  setWorkouts
}) => {
  const [percentProtein, setPercentProtein] = useState(
    ((protein * 4) / calories) * 100
  )
  const [percentCarbs, setPercentCarbs] = useState(
    ((carbs * 4) / calories) * 100
  )
  const [percentFat, setPercentFat] = useState(((fat * 9) / calories) * 100)
  return (
    <>
      <div className="space-y-1">
        <Label className="flex items-center">
          <div>Calories(kcal): </div>
        </Label>

        <Input
          value={calories}
          onChange={e => setCalories(Number(e.target.value))}
        />
      </div>

      <div className="mt-5 space-y-2">
        <Label className="flex items-center">
          <div className="mr-2">Protein: {"  "}</div>{" "}
          <div className=" text-sm">~{protein}g</div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {percentProtein}%
          </div>
        </Label>

        <Slider
          value={[percentProtein]}
          onValueChange={values => {
            setProtein(values[0])
          }}
          min={10}
          max={100}
          step={1}
        />
      </div>

      <div className=" space-y-1">
        <Label className="flex items-center">
          <div className="mr-2">Carbs: {"  "}</div>{" "}
          <div className=" text-sm">{carbs}g</div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {percentCarbs}%
          </div>
        </Label>

        <Slider
          value={[percentCarbs]}
          onValueChange={values => {
            setCarbs(values[0])
          }}
          min={10}
          max={100}
          step={1}
        />
      </div>
      <div className=" space-y-1">
        <Label className="flex items-center">
          <div className="mr-2">Fats: {"  "}</div>{" "}
          <div className=" text-sm">~{fat}g</div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {percentFat}%
          </div>
        </Label>

        <Slider
          value={[percentFat]}
          onValueChange={values => {
            setFat(values[0])
          }}
          min={10}
          max={100}
          step={1}
        />
      </div>
    </>
  )
}
