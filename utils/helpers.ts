import type { Tables } from "@/supabase/types"

type Price = Tables<"prices">

export const getURL = (path: string = "") => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
        process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ""
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
          "http://localhost:3000/"

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, "")
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, "")

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url
}

export const postData = async ({ url, data }: { url: string; data?: any }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data)
  })

  return res.json()
}

export const toDateTime = (secs: number) => {
  var t = new Date(+0) // Unix epoch start.
  t.setSeconds(secs)
  return t
}

export const calculateTrialEndUnixTimestamp = (
  trialPeriodDays: number | null | undefined
) => {
  // Check if trialPeriodDays is null, undefined, or less than 2 days
  if (
    trialPeriodDays === null ||
    trialPeriodDays === undefined ||
    trialPeriodDays < 2
  ) {
    return undefined
  }

  const currentDate = new Date() // Current date and time
  const trialEnd = new Date(
    currentDate.getTime() + (trialPeriodDays + 1) * 24 * 60 * 60 * 1000
  ) // Add trial days
  return Math.floor(trialEnd.getTime() / 1000) // Convert to Unix timestamp in seconds
}

const toastKeyMap: { [key: string]: string[] } = {
  status: ["status", "status_description"],
  error: ["error", "error_description"]
}

const getToastRedirect = (
  path: string,
  toastType: string,
  toastName: string,
  toastDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
): string => {
  const [nameKey, descriptionKey] = toastKeyMap[toastType]

  let redirectPath = `${path}?${nameKey}=${encodeURIComponent(toastName)}`

  if (toastDescription) {
    redirectPath += `&${descriptionKey}=${encodeURIComponent(toastDescription)}`
  }

  if (disableButton) {
    redirectPath += `&disable_button=true`
  }

  if (arbitraryParams) {
    redirectPath += `&${arbitraryParams}`
  }

  return redirectPath
}

export const getStatusRedirect = (
  path: string,
  statusName: string,
  statusDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
) =>
  getToastRedirect(
    path,
    "status",
    statusName,
    statusDescription,
    disableButton,
    arbitraryParams
  )

export const getErrorRedirect = (
  path: string,
  errorName: string,
  errorDescription: string = "",
  disableButton: boolean = false,
  arbitraryParams: string = ""
) =>
  getToastRedirect(
    path,
    "error",
    errorName,
    errorDescription,
    disableButton,
    arbitraryParams
  )

export const convertTime = (totalMinutes: number[] | undefined | null) => {
  if (totalMinutes === undefined || totalMinutes === null) {
    return "0 min"
  }
  let hr = ""
  let min = ""

  if (totalMinutes[0] > 0) {
    hr = `${totalMinutes[0]} hr `
  }
  if (totalMinutes[1] > 0) {
    min = `${totalMinutes[1]} min`
  }
  return `${hr}${min}`

  /*

    if (!totalMinutes) {
      return "0 min"
    }
    if(totalMinutes instanceof Array) {
      return `${totalMinutes[0]} hr ${totalMinutes[1]} min`
    }
    const hours = 
    const minutes = totalMinutes % 60
    if (hours > 0 && minutes > 0) {
      return `${hours} hr ${minutes} min`
    } else if( hours > 0 && m {
      return `${minutes} min`
    }
   */
}
