import { Toaster } from "@/components/ui/sonner"
import { GlobalState } from "@/components/utility/global-state"
import { Providers } from "@/components/utility/providers"
import { Database } from "@/supabase/types"
import { createServerClient } from "@supabase/ssr"
import { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import { ReactNode } from "react"
import "./globals.css"
import ToasterProvider from "@/components/utility/toasterProvider"
import { Analytics } from "@vercel/analytics/react"
import Navbar from "@/components/ui/Navbar"

const inter = Inter({ subsets: ["latin"] })
const APP_NAME = "Fitpal AI"
const APP_DEFAULT_TITLE = "Fitpal AI"
const APP_TITLE_TEMPLATE = "%s - Fitpal AI"
const APP_DESCRIPTION =
  "Find curated recipes by entering your ingredients into our AI-powered search engine. Search using natural language or ingredients and get the closest recipes."

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
        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-title" content={APP_DEFAULT_TITLE} />
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

      <body className={inter.className}>
        <ToasterProvider />
        <Providers attribute="class" defaultTheme="dark">
          <Toaster richColors position="top-center" duration={3000} />
          <Navbar user={session?.user} />
          <div className="flex h-dvh flex-col items-center overflow-x-hidden bg-black text-foreground">
            {session ? <GlobalState>{children}</GlobalState> : children}
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
