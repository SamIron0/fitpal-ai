import { Toaster } from "@/components/ui/sonner"
import { GlobalState } from "@/components/utility/global-state"
import { Providers } from "@/components/utility/providers"
import TranslationsProvider from "@/components/utility/translations-provider"
import initTranslations from "@/lib/i18n"
import { Database } from "@/supabase/types"
import { createServerClient } from "@supabase/ssr"
import { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import { ReactNode } from "react"
import "./globals.css"
import ToasterProvider from "@/components/utility/toasterProvider"
import { Analytics } from "@vercel/analytics/react"
import { Dashboard } from "@/components/ui/dashboard"

const inter = Inter({ subsets: ["latin"] })
const APP_NAME = "Fitpal AI"
const APP_DEFAULT_TITLE = "Fitpal AI"
const APP_TITLE_TEMPLATE = "%s - Fitpal AI"
const APP_DESCRIPTION =
  " Find Recipes from Ingredients You Have. Enter the ingredients you have or keywords, and we will help you find delicious recipes in no time."

interface RootLayoutProps {
  children: ReactNode
  params: {
    locale: string
  }
}

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: APP_DEFAULT_TITLE
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
}

export const viewport: Viewport = {
  themeColor: "#000000"
}

export default async function RootLayout({
  children,
  params: { locale }
}: RootLayoutProps) {
  const cookieStore = cookies()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )
  const session = (await supabase.auth.getSession()).data.session

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{APP_DEFAULT_TITLE}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-title" content={APP_DEFAULT_TITLE} />
        <meta name="theme-color" content={"#000000"} />
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DM7XC7YDQT"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-DM7XC7YDQT');
              `
          }}
        ></script>
      </head>
      <body className={inter.className + "bg-background"}>
        <ToasterProvider />
        <Providers attribute="class" defaultTheme="dark">
          <Toaster richColors position="top-center" duration={3000} />
          <div className="flex h-dvh flex-col items-center overflow-x-hidden bg-background text-foreground">
            {session ? <GlobalState>{children}</GlobalState> : children}
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
