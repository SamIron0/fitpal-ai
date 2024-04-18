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
  calories: number
  setCalories: Function
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
  calories,
  setCalories,
  setFat,
  workouts,
  setWorkouts
}) => {
  const [fatInGram, setFatInGram] = useState(0)
  const [proteinInGram, setProteinInGram] = useState(0)
  const [carbsInGram, setCarbsInGram] = useState(0)
  /*
  useEffect(() => {
    setProtein(Math.round((percentProtein * 0.01 * calories) / 4))
    setCarbs(Math.round((percentCarbs * 0.01 * calories) / 4))
    setFat(Math.round((percentFat * 0.01 * calories) / 9))
  }, [calories])*/
  const onChangeFat = (value: number) => {
    setFat(value)
    const fatInGram = (value * 0.01 * calories) / 9
    setFatInGram(fatInGram)
  }
  const onChangeCarbs = (value: number) => {
    setCarbs(value)
    const carbsInGram = (value * 0.01 * calories) / 4
    setCarbsInGram(carbsInGram)
  }
  const onChangeProtein = (value: number) => {
    setProtein(value)
    const proteinInGram = (value * 0.01 * calories) / 4
    setProteinInGram(proteinInGram)
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

          <div className=" text-sm">{proteinInGram}g</div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {Math.round(protein)}%
          </div>
        </div>

        <Slider
          value={[protein]}
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

          <div className=" text-sm">{carbsInGram}g</div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {Math.round(carbs)}%
          </div>
        </div>

        <Slider
          value={[carbs]}
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

          <div className=" text-sm">{fatInGram}g</div>
          <div className="text-muted-foreground flex w-full justify-end text-sm">
            {Math.round(fat)}%
          </div>
        </div>

        <Slider
          value={[fat]}
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
