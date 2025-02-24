"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FileText, Users, MessageSquare, Settings, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"

const adminMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Posts", href: "/dashboard/posts" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: MessageSquare, label: "Comments", href: "/dashboard/comments" },
  { icon: BarChart, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

const writerMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "My Posts", href: "/dashboard/posts" },
  { icon: MessageSquare, label: "Comments", href: "/dashboard/comments" },
  { icon: BarChart, label: "Analytics", href: "/dashboard/analytics" },
]

export function Sidebar() {
  const pathname = usePathname()
  // For demonstration purposes, we'll assume the user is an admin
  const isAdmin = true
  const menuItems = isAdmin ? adminMenuItems : writerMenuItems

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Blog Admin</h2>
      </div>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${pathname === item.href ? "bg-gray-700" : ""}`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <Button variant="outline" className="w-full">
          Logout
        </Button>
      </div>
    </div>
  )
}

