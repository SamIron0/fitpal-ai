"use client"

import { FitpalAIContext } from "@/context/context"
import { useContext } from "react"

export default function WorkspacePage() {
  const { selectedWorkspace } = useContext(FitpalAIContext)

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="text-4xl">{selectedWorkspace?.name}</div>
    </div>
  )
}
