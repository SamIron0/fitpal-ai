import { Slider } from "../../ui/slider"

export const Macros = ({}) => {
  return (
    <>
      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-1">
          <div>Protein:</div>

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
      <div className="text-muted-foreground font-bolds mb-1 mt-2 text-sm">
        Carbs
      </div>
      <div className="text-muted-foreground font-bolds mb-1 mt-2 text-sm">
        Fat
      </div>
    </>
  )
}
