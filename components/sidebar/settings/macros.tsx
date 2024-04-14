import { Slider } from "../../ui/slider"

interface MacrosProps {
  protein: number
  setProtein: Function
  carbs: number
  setCarbs: Function
  fat: number
  setFat: Function
}
export const Macros = ({
  protein,
  setProtein,
  carbs,
  setCarbs,
  fat,
  setFat
}: MacrosProps) => {
  return (
    <>
      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-1">
          <div className="text-muted-foreground mb-1 mt-2 text-sm font-semibold">
            Protein
          </div>

          <div></div>
        </div>

        <Slider
          value={[protein]}
          onValueChange={values => {
            setProtein(values[0])
          }}
          min={20}
          max={500}
          step={5}
        />
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-1">
          <div className="text-muted-foreground mb-1 mt-2 text-sm font-semibold">
            Carbs
          </div>

          <div></div>
        </div>

        <Slider
          value={[]}
          onValueChange={() => {}}
          min={20}
          max={500}
          step={5}
        />
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-1">
          <div className="text-muted-foreground mb-1 mt-2 text-sm font-semibold">
            Fats
          </div>

          <div></div>
        </div>

        <Slider
          value={[]}
          onValueChange={() => {}}
          min={20}
          max={500}
          step={5}
        />
      </div>
    </>
  )
}
