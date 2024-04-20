import { ChatbotUIContext } from "@/context/context"
import { IconChevronDown } from "@tabler/icons-react"
import { FC, useContext, useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { GenderOption } from "./gender-option"
interface GenderSelectProps {
  onSelect: (gender: string) => void
  selectedGender: string
}

export const GenderSelect: FC<GenderSelectProps> = ({
  onSelect,
  selectedGender
}) => {
  const { profile, setProfile } = useContext(ChatbotUIContext)

  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(selectedGender)
  const genders = ["male", "female"]
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100) // FIX: hacky
    }
  }, [isOpen])

  const handleSelectGender = (gender: string) => {
    setSelected(gender)
    onSelect(gender)
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
          className="bg-background w-full justify-start border-2 px-3 py-5"
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
                    <div className="ml-2 flex items-center">{selected}</div>
                  </>
                ) : (
                  <div className="flex items-center">Select Age</div>
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
          {genders.map(gender => (
            <GenderOption
              key={gender}
              gender={gender}
              onSelect={() => handleSelectGender(gender)}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
