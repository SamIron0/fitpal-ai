"use client"

import { ChatbotUISVG } from "@/components/icons/chatbotui-svg"
import { IconArrowRight } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import Navbar from "@/components/ui/Navbar"
import mealIcon from "../../public/meal-icon.png"

export default function HomePage() {
  const { theme } = useTheme()

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-6 pt-24 md:pb-14 md:pt-32">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="leading-tighter mb-4 text-5xl font-extrabold tracking-tighter text-white md:text-6xl"
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
                className="mb-8 text-xl text-gray-600"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                FitpalAI lets you create and customize personalized meals based
                on your preferences, budget and what you already have in stock.
                Reach your nutritional goals with your new pal{" "}
              </p>{" "}
              <div className="px-8 pb-6">
                <div className="mx-auto flex h-12 w-[358px] items-center rounded-full  border  border-[#232325] bg-[#0D0D0E] sm:w-[370px] ">
                  <Link href="/signup" className="flex w-full p-3 ">
                    <div className="flex w-1/4 justify-start px-0.5 ">
                      <div className="circle-div">
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

      <div className="flex w-full items-center justify-center px-4 pt-32">
        <figure className="relative  z-[1] h-auto w-[50rem] max-w-full rounded-t-lg border-DEFAULT border-zinc-700 shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)]">
          <div className="relative flex max-w-[50rem] items-center rounded-t-lg bg-zinc-800 px-24 py-2 dark:bg-zinc-700">
            <div className="absolute start-4 top-2/4 flex -translate-y-1 space-x-1">
              <span className="size-2 rounded-full bg-zinc-600 dark:bg-zinc-600"></span>
              <span className="size-2 rounded-full bg-zinc-600 dark:bg-zinc-600"></span>
              <span className="size-2 rounded-full bg-zinc-600 dark:bg-zinc-600"></span>
            </div>
            <div className="flex size-full items-center justify-center rounded-sm bg-zinc-700 py-0.5 text-[.25rem] text-zinc-400 sm:text-[.5rem] dark:bg-zinc-600 dark:text-zinc-400">
              www.fitpalai.com
            </div>
          </div>

          <div className="bg-zinc-800 ">
            <img
              className="h-auto max-w-full "
              src="mockup1.png"
              alt="ImageMockup"
            />
          </div>
        </figure>
      </div>

      <footer className="mx-auto max-w-[1920px] bg-zinc-900 px-4">
        <div className="flex flex-row items-center justify-between space-y-2 bg-zinc-900 py-2">
          <div>
            <span>&copy; {new Date().getFullYear()} FitpalAI. </span>
          </div>
          <div className="flex items-center">
            <a
              className=""
              href="https://twitter.com/csi0x"
              aria-label="twitter link"
            >
              <img
                src="/x-logo.svg"
                alt="twitter"
                className="inline-block h-8 text-white"
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
