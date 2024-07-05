import { IconLoader2 } from "@tabler/icons-react"

export default function Loading() {
  return (
    <div className=" w-full p-4 flex flex-col overflow-y-auto">
      <div className="flex size-full flex-col items-center justify-center">
        <div className="w-full py-6 max-w-4xl mx-auto">
          <div className="mb-8 h-10 w-3/4 bg-input animate-pulse rounded"></div>
          <div className="grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex w-48 flex-col">
                <div className="mb-2 h-48 w-full rounded-lg bg-input animate-pulse"></div>
                <div className="h-6 w-3/4 bg-input animate-pulse rounded mb-2"></div>
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-input animate-pulse rounded mr-2"></div>
                  <div className="h-4 w-1/2 bg-input animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
