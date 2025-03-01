import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/lib/context/auth-context"
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "./providers"


export const metadata: Metadata = {
  title: "Bugema University Newsletter",
  description: "Bugema University Newsletter",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}

