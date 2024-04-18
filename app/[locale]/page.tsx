"use client"

import { IconArrowRight } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import Navbar from "@/components/ui/Navbar"
import mealIcon from "../../public/meal-icon.png"

export default function HomePage() {
  const { theme } = useTheme()

  return (
    <div className="flex w-full flex-col justify-center">
      <Navbar />

      <div className="mx-auto px-4 sm:max-w-4xl sm:px-6">
        {/* Hero content */}
        <div className="pb-6 pt-24 md:pb-14 md:pt-32">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="leading-tighter mb-4 text-4xl font-extrabold tracking-tighter text-white md:text-5xl"
              data-aos="zoom-y-out"
            >
              The most{" "}
              <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text pr-2 text-transparent">
                customizable
              </span>
              meal generator
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-600"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                FitpalAI lets you create and customize personalized meals based
                on your preferences, budget and what you already have in stock.
                Reach your nutritional goals with your new pal{" "}
              </p>{" "}
              <div className="px-8 pb-6">
                <div className="mx-auto flex h-12 w-[358px] items-center rounded-full  border  border-[#232325] bg-[#0D0D0E] sm:w-[370px] ">
                  <Link href="/login" className="flex w-full p-3 ">
                    <div className="flex w-1/4 justify-start px-0.5 ">
                      <div className="size-10 ">
                        <img src={mealIcon.src} alt="meal image" />
                      </div>
                    </div>
                    <div className="w-11/20 flex w-full flex-col items-center justify-center pl-1">
                      <p className=" absolute text-sm text-white">
                        Introducing FitpalAI Beta - Join
                      </p>
                    </div>
                    <div className=" flex w-1/5 items-center justify-end pr-2 ">
                      <svg
                        className="text-dark:text-white size-3 text-white hover:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 8 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
