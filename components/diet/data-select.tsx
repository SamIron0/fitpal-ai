import { FitpalAIContext } from "@/context/context"
import { DietProvider } from "@/types/settings"
import { AllergiesProvider } from "@/types/settings"
import { IconChevronDown } from "@tabler/icons-react"
import { FC, useContext, useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { DietIcon } from "./diet-icon"
import { DietOption } from "./diet-option"

interface DataSelectProps {
  onSelect: (data: DietProvider | AllergiesProvider) => void
  data: DietProvider[] | AllergiesProvider[]
  selectedData: string
}

export const DataSelect: FC<DataSelectProps> = ({
  onSelect,
  selectedData,
  data
}) => {
  const { profile, setProfile } = useContext(FitpalAIContext)

  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string>(selectedData)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100) // FIX: hacky
    }
  }, [isOpen])

  const handleSelectData = (data: DietProvider | AllergiesProvider) => {
    setSelected(data)
    onSelect(data)
    setIsOpen(false)
  }
  if (!profile) return null

  return (
    <>
      {" "}
      <DropdownMenu
        open={isOpen}
        onOpenChange={isOpen => {
          setIsOpen(isOpen)
        }}
      >
        <DropdownMenuTrigger
          className="w-full justify-start border-2 bg-background px-3 py-5"
          asChild
          disabled={false}
        >
          {
            <Button
              ref={triggerRef}
              className="flex items-center justify-between"
              variant="ghost"
            >
              <div className="flex items-center">
                {selected ? (
                  <>
                    <DietIcon provider={selected} />
                    <div className="ml-2 flex items-center">{selected}</div>
                  </>
                ) : (
                  <div className="flex items-center">Select a diet</div>
                )}
              </div>

              <IconChevronDown />
            </Button>
          }
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="flex flex-col space-y-2 overflow-auto p-2"
          style={{ width: triggerRef.current?.offsetWidth }}
          align="start"
        >
          {data.map(x_data => (
            <DietOption
              key={x_data}
              diet={x_data}
              onSelect={() => handleSelectData(x_data)}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
