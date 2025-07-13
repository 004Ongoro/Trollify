import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trollify - Create Fake Social Media Posts",
  description:
    "Generate ultra-realistic fake social media posts, accounts, and screenshots for entertainment and testing purposes. Supports X, Facebook, and Instagram.",
  keywords: "fake social media, mock posts, social media generator, testing tools, entertainment",
  authors: [{ name: "Neontek" }],
  robots: "index, follow",
  openGraph: {
    title: "Trollify - Create Fake Social Media Posts",
    description: "Generate ultra-realistic fake social media posts for entertainment and testing.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trollify - Create Fake Social Media Posts",
    description: "Generate ultra-realistic fake social media posts for entertainment and testing.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
