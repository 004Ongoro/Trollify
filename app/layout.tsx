import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trollify - Create Fake Social Media Posts | Entertainment & Testing",
  description:
    "Generate ultra-realistic fake social media posts, accounts, and screenshots for entertainment and testing purposes. Supports X (Twitter), Facebook, and Instagram with authentic styling.",
  keywords:
    "fake social media, mock posts, social media generator, testing tools, entertainment, X Twitter, Facebook, Instagram",
  authors: [{ name: "Neontek" }],
  robots: "index, follow",
  openGraph: {
    title: "Trollify - Create Fake Social Media Posts",
    description:
      "Generate ultra-realistic fake social media posts for entertainment and testing with authentic platform styling.",
    type: "website",
    locale: "en_US",
    url: "https://trollify.app",
    siteName: "Trollify",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Trollify - Create Fake Social Media Posts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trollify - Create Fake Social Media Posts",
    description: "Generate ultra-realistic fake social media posts for entertainment and testing.",
    images: ["/og-image.png"],
    creator: "@neontek",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
