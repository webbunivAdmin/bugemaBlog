"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  mainNav?: React.ReactNode
  sidebarNav?: React.ReactNode
  userNav?: React.ReactNode
}

export function DashboardLayout({ children, mainNav, sidebarNav, userNav }: DashboardLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const router = useRouter()

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r bg-background lg:fixed lg:inset-y-0 lg:flex lg:flex-col">
        <div className="flex flex-col">
          {/* Sidebar Header */}
          <div className="border-b border-border/50 px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-8 w-8 p-1.5 text-primary-foreground"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold leading-none tracking-tight">Blog Admin</h3>
                <p className="text-xs text-muted-foreground">Content Management</p>
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-auto py-2">{sidebarNav}</div>

          {/* Sidebar Footer */}
          <div className="border-t border-border/50 px-3 py-4">{userNav}</div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            {/* Sidebar Header */}
            <div className="border-b border-border/50 px-6 py-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-8 w-8 p-1.5 text-primary-foreground"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold leading-none tracking-tight">Blog Admin</h3>
                  <p className="text-xs text-muted-foreground">Content Management</p>
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-auto py-2">{sidebarNav}</div>

            {/* Sidebar Footer */}
            <div className="border-t border-border/50 px-3 py-4">{userNav}</div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="flex h-14 items-center gap-4 px-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            {mainNav}
          </div>
        </header>
        <main className="flex-1">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

