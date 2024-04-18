import { FC, useEffect, useState } from "react"
import { Slider } from "../../ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface MacrosProps {
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
  protein,
  setProtein,
  carbs,
  setCarbs,
  fat,
  setFat,
  workouts,
  setWorkouts
}) => {
  const [calories, setCalories] = useState(protein * 4 + carbs * 4 + fat * 9)

  const [percentProtein, setPercentProtein] = useState(
    Math.round(((protein * 4) / calories) * 100)
  )
  const [percentCarbs, setPercentCarbs] = useState(
    Math.round(((carbs * 4) / calories) * 100)
  )
  const [percentFat, setPercentFat] = useState(
    Math.round(((fat * 9) / calories) * 100)
  )
  useEffect(() => {
    setProtein((percentProtein * 0.01 * calories) / 4)
    setCarbs((percentCarbs * 0.01 * calories) / 4)
    setFat((percentFat * 0.01 * calories) / 9)
  }, [calories])
  return (
    <>
      <div className="mt-6 space-y-1">
        <Label className="flex items-center">
          <div>Calories(kcal): </div>
        </Label>

        <Input
          value={calories}
          onChange={e => setCalories(Number(e.target.value))}
        />
      </div>

      <div className="mt-8 space-y-3">
        <div className="mb-1  flex   items-center space-x-1">
          <div className="text-muted-foreground text-sm font-semibold">
            Protein:
          </div>

          <div className=" text-sm">{protein}g</div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {percentProtein}%
          </div>
        </div>

        <Slider
          value={[protein]}
          onValueChange={values => {
            setProtein(values[0])
          }}
          min={10}
          max={600}
          step={2}
        />
      </div>
      <div className="mt-6 space-y-3">
        <div className="mb-1 flex  items-center  space-x-1">
          <div className="text-muted-foreground text-sm font-semibold">
            Carbs:
          </div>

          <div className=" text-sm">{carbs}g</div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {percentCarbs}%
          </div>
        </div>

        <Slider
          value={[carbs]}
          onValueChange={values => {
            setCarbs(values[0])
          }}
          min={10}
          max={1000}
          step={2}
        />
      </div>
      <div className="mt-6 space-y-3">
        <div className="mb-1 flex  items-center  space-x-1">
          <div className="text-muted-foreground text-sm font-semibold">
            Fat:
          </div>

          <div className=" text-sm">{fat}g</div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {percentFat}%
          </div>
        </div>

        <Slider
          value={[fat]}
          onValueChange={values => {
            setFat(values[0])
          }}
          min={10}
          max={500}
          step={2}
        />
      </div>
      <div className="mt-5 space-y-3">
        <div className="mb-1 flex items-center  space-x-1">
          <div className="text-muted-foreground  text-sm font-semibold">
            Workouts/week:
          </div>{" "}
          <div className=" text-sm">{workouts}</div>
        </div>

        <Slider
          value={[workouts]}
          onValueChange={values => {
            setWorkouts(values[0])
          }}
          min={0}
          max={7}
          step={1}
        />
      </div>
    </>
  )
}
