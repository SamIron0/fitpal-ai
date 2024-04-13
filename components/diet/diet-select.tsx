import { ChatbotUIContext } from "@/context/context"
import { LLMID, DietProvider } from "@/types"
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

interface DietSelectProps {
  selectedDiet: string
  onSelectDiet: (diet: DietProvider) => void
}

export const DietSelect: FC<DietSelectProps> = ({
  selectedDiet,
  onSelectDiet
}) => {
  const { profile } = useContext(ChatbotUIContext)

  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState<"hosted" | "local">("hosted")

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100) // FIX: hacky
    }
  }, [isOpen])

  const handleSelectDiet = (diet: DietProvider) => {
    onSelectDiet(diet)
    setIsOpen(false)
  }
  if (!profile) return null

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={isOpen => {
        setIsOpen(isOpen)
        setSearch("")
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
              {selectedDiet ? (
                <>
                  <DietIcon provider={"paleo"} width={26} height={26} />
                  <div className="ml-2 flex items-center">{selectedDiet}</div>
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
        className="space-y-2 overflow-auto p-2"
        style={{ width: triggerRef.current?.offsetWidth }}
        align="start"
      >
        <div>hello</div>{" "}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
