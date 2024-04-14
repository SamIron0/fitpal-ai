import { cn } from "@/lib/utils"
import mistral from "@/public/providers/mistral.png"
import groq from "@/public/providers/groq.png"
import perplexity from "@/public/providers/perplexity.png"
import { DietProvider } from "@/types"
import { IconSparkles } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { FC, HTMLAttributes } from "react"
import { AnthropicSVG } from "../../../icons/anthropic-svg"
import { GoogleSVG } from "../../../icons/google-svg"
import { OpenAISVG } from "../../../icons/openai-svg"

interface DietIconProps extends HTMLAttributes<HTMLDivElement> {
  provider: DietProvider
  height: number
  width: number
}

export const DietIcon: FC<DietIconProps> = ({
  provider,
  height,
  width,
  ...props
}) => {
  const { theme } = useTheme()

  switch (provider as DietProvider) {
    case "paleo":
      return (
        <OpenAISVG
          className={cn(
            "rounded-sm bg-white p-1 text-black",
            props.className,
            theme === "dark" ? "bg-white" : "border-DEFAULT border-black"
          )}
          width={width}
          height={height}
        />
      )

    default:
      return <IconSparkles size={width} />
  }
}
