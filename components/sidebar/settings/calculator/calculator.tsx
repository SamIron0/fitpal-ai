import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const Calculator = () => {
  return (
    <div>
      <Label className="text-md mt-4" htmlFor="age">
        Age
      </Label>
      <Input
        className="mb-3 rounded-md border bg-inherit px-4 py-2"
        name="age"
        placeholder="20"
      />
    </div>
  )
}
