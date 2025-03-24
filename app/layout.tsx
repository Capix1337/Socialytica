//@/app/layout.tsx

import { ClerkProvider } from '@clerk/nextjs'
import { ProfileCompletionProvider } from '@/lib/contexts/ProfileCompletionContext'
import { ProfileCompletionDialog } from '@/components/profile/ProfileCompletionDialog'
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/Navbar/Navbar"
import { Footer } from "@/components/footer"
import { AuthGuestHandler } from '@/components/auth/AuthGuestHandler'
import "./globals.css"
import { Inter } from "next/font/google"
import { metadata } from './metadata'

const inter = Inter({ subsets: ["latin"] })

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite", 
                "name": "Socialytica",
                "url": "https://socialytica.net",
                "description": "Discover what truly drives your relationship and move forward with clarity",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://socialytica.net/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
        </head>
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <ProfileCompletionProvider>
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
            <ProfileCompletionDialog />
            <AuthGuestHandler />
            <Toaster position="top-center" />
          </ProfileCompletionProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}