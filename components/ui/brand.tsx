"use client"

import Link from "next/link"
import { FC } from "react"
import { FitpalAISVG } from "../icons/fitpalai-svg"

interface BrandProps {
  theme?: "dark" | "light"
}

export const Brand: FC<BrandProps> = ({ theme = "dark" }) => {
  return (
    <Link
      className="flex cursor-pointer flex-col items-center hover:opacity-50"
      href="https://www.fitpalai.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="text-4xl font-bold tracking-wide">Fitpal AI</div>
    </Link>
  )
}
