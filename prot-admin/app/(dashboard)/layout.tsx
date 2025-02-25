import type React from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DashboardNav } from "@/components/nav/dashboard-nav"
import { MainNav } from "@/components/nav/main-nav"
import { UserNav } from "@/components/nav/user-nav"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout mainNav={<MainNav />} sidebarNav={<DashboardNav />} userNav={<UserNav />}>
      {children}
    </DashboardLayout>
  )
}

