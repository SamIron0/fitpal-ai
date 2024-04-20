import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { DropDownSelect } from "../dropdown-select/dropdown-select"

export const Calculator = () => {
  const [gender, onChangeGender] = useState("male")
  const [weight, onChangeWeight] = useState(70)
  const [height, onChangeHeight] = useState(170)
  const [activity, onChangeActivity] = useState("sedentary")
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

      <DropDownSelect
        onSelect={value => onChangeGender(value)}
        selectedValue={gender}
        values={["male", "female"]}
      />

      <Label className="text-md mt-4" htmlFor="age">
        Activity Level
      </Label>

      <DropDownSelect
        onSelect={value => onChangeActivity(value)}
        selectedValue={activity}
        values={[
          "Sedentary(little to no exercise)",
          "Lightly active(sports 1-3 days/week)",
          "Moderately active (sports 3-5 days)",
          "Very active( sports 6-7 days/week)",
          "Extra active (very active and physical job)"
        ]}
      />

      <Label className="text-md mt-4" htmlFor="age">
        Weight
      </Label>
      <input
        type="number"
        id="numberInput"
        value={weight}
        onChange={() => {}}
      />
      <Label className="text-md mt-4" htmlFor="age">
        Height
      </Label>
      <input
        type="number"
        id="numberInput"
        value={height}
        onChange={() => {}}
      />
    </div>
  )
}
