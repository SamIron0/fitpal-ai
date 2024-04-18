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
    setProtein(Math.round((percentProtein * 0.01 * calories) / 4))
    setCarbs(Math.round((percentCarbs * 0.01 * calories) / 4))
    setFat(Math.round((percentFat * 0.01 * calories) / 9))
  }, [calories])
  const onChangeFat = (value: number) => {
    setPercentFat(value)
    const fatInKcal = value * 0.01 * calories
    setFat(fatInKcal / 9)
  }
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

          <div className=" text-sm">
            {Math.round(percentProtein * 0.01 * calories)}g
          </div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {protein}%
          </div>
        </div>

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
      <div className="mt-6 space-y-3">
        <div className="mb-1 flex  items-center  space-x-1">
          <div className="text-muted-foreground text-sm font-semibold">
            Carbs:
          </div>

          <div className=" text-sm">
            {Math.round(percentCarbs * 0.01 * calories)}g
          </div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {carbs}%
          </div>
        </div>

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
      <div className="mt-6 space-y-3">
        <div className="mb-1 flex  items-center  space-x-1">
          <div className="text-muted-foreground text-sm font-semibold">
            Fat:
          </div>

          <div className=" text-sm">
            {Math.round(percentFat * 0.01 * calories)}g
          </div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {fat}%
          </div>
        </div>

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
