import { FC } from "react"
import { WithTooltip } from "../ui/with-tooltip"

interface DropDownOptionProps {
  value: string
  onSelect: () => void
}

export const DropdownOption: FC<DropDownOptionProps> = ({
  value,
  onSelect
}) => {
  return (
    <WithTooltip
      display={<></>}
      side="bottom"
      trigger={
        <div
          className="hover:bg-accent flex w-full cursor-pointer justify-start space-x-3 truncate rounded p-2 hover:opacity-50"
          onClick={onSelect}
        >
          <div className="flex items-center space-x-2">
            <div className="text-sm font-semibold">{value}</div>
          </div>
        </div>
      }
    />
  )
}
