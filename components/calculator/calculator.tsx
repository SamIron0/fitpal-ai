import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { GenderSelect } from "./gender-select"
import { useState } from "react"

export const Calculator = () => {
  const [gender, onChangeGender] = useState("male")
  const [age, onChangeAge] = useState(25)
  return (
    <div>
      <Label className="text-md mt-4" htmlFor="age">
        Age
      </Label>
      <Slider
        value={[age]}
        onValueChange={values => {
          onChangeAge(values[0])
        }}
        min={10}
        max={100}
        step={1}
      />

      <Label className="text-md mt-4" htmlFor="age">
        Gender
      </Label>

      <GenderSelect
        onSelect={gender => onChangeGender(gender)}
        selectedGender={gender}
      />
    </div>
  )
}
