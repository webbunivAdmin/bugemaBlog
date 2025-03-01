"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Users, MessageSquare, Settings, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/context/auth-context"

const menuItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "Posts",
        href: "/dashboard/posts",
        icon: FileText,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Users",
        href: "/dashboard/users",
        icon: Users,
        adminOnly: true,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const { user } = useAuth()
  const isAdmin = user?.accountType === "Admin"

  const filteredMenuItems = menuItems
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.adminOnly || isAdmin),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <div className="flex flex-col gap-4 p-2">
      {filteredMenuItems.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <h4 className="px-2 text-xs font-semibold uppercase text-muted-foreground">{group.title}</h4>
          <div className="flex flex-col gap-1">
            {group.items.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                asChild
                className={cn("w-full justify-start", pathname === item.href && "bg-muted")}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

