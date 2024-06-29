import { FC, useContext, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { FitpalAIContext } from "@/context/context"
import { Tables } from "@/supabase/types"
import { ContentType, DataItemType, DataListType } from "@/types"
import { updateAssistant } from "@/db/assistants"
import { updateCollection } from "@/db/collections"
import { updateModel } from "@/db/models"
import { updatePrompt } from "@/db/prompts"
import { updateTool } from "@/db/tools"
import { updateChat } from "@/db/chats"
import { updateCalculator } from "@/db/calculator"
import { updatePreset } from "@/db/presets"
import { cn } from "@/lib/utils"
import { Settings } from "./settings/settings"

interface SidebarDataListProps {
  contentType: ContentType
  data: DataListType
  folders: Tables<"folders">[]
  searchTerm: string
  setSearchTerm: Function
}

export const SidebarDataList: FC<SidebarDataListProps> = ({
  contentType,
  data,
  folders,
  searchTerm,
  setSearchTerm
}) => {
  const {
    setChats,
    setPresets,
    setCalculator,
    setPrompts,
    setFiles,
    setCollections,
    setAssistants,
    setTools,
    setModels,
    subscription
  } = useContext(FitpalAIContext)

  const divRef = useRef<HTMLDivElement>(null)

  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <>
      <div ref={divRef} className="mt-2 flex flex-col overflow-auto">
        {contentType === "presets" && <Settings />}
      </div>
    </>
  )
}
