import { LLM } from "@/types"
import { FC } from "react"
import { DietIcon } from "./diet-icon"
import { IconInfoCircle } from "@tabler/icons-react"
import { WithTooltip } from "../ui/with-tooltip"

interface DietOptionProps {
  diet: LLM
  onSelect: () => void
}

export const DietOption: FC<DietOptionProps> = ({ diet, onSelect }) => {
  return (
    <WithTooltip
      display={
        <div>
          {diet.provider !== "ollama" && diet.pricing && (
            <div className="space-y-1 text-sm">
              <div>
                <span className="font-semibold">Input Cost:</span>{" "}
                {diet.pricing.inputCost} {diet.pricing.currency} per{" "}
                {diet.pricing.unit}
              </div>
              {diet.pricing.outputCost && (
                <div>
                  <span className="font-semibold">Output Cost:</span>{" "}
                  {diet.pricing.outputCost} {diet.pricing.currency} per{" "}
                  {diet.pricing.unit}
                </div>
              )}
            </div>
          )}
        </div>
      }
      side="bottom"
      trigger={
        <div
          className="hover:bg-accent flex w-full cursor-pointer justify-start space-x-3 truncate rounded p-2 hover:opacity-50"
          onClick={onSelect}
        >
          <div className="flex items-center space-x-2">
            <DietIcon provider={"paleo"} width={28} height={28} />
            <div className="text-sm font-semibold">{diet.modelName}</div>
          </div>
        </div>
      }
    />
  )
}
