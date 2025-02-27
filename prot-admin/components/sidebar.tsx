"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FileText, Users, MessageSquare, Settings, BarChart, LogOut, ChevronDown } from "lucide-react"
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const adminMenuItems = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: BarChart, label: "Analytics", href: "/dashboard/analytics" },
    ],
  },
  {
    label: "Content",
    items: [
      { icon: FileText, label: "Posts", href: "/dashboard/posts" },
      { icon: MessageSquare, label: "Comments", href: "/dashboard/comments" },
    ],
  },
  {
    label: "Management",
    items: [
      { icon: Users, label: "Users", href: "/dashboard/users" },
      { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ],
  },
]

const writerMenuItems = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: BarChart, label: "Analytics", href: "/dashboard/analytics" },
    ],
  },
  {
    label: "Content",
    items: [
      { icon: FileText, label: "My Posts", href: "/dashboard/posts" },
      { icon: MessageSquare, label: "Comments", href: "/dashboard/comments" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  // For demonstration purposes, we'll assume the user is an admin
  const isAdmin = true
  const menuGroups = isAdmin ? adminMenuItems : writerMenuItems

  return (
    <SidebarComponent>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronDown className="h-4 w-4" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <p className="text-xs text-center text-muted-foreground">© 2024 Blog Admin. All rights reserved.</p>
      </SidebarFooter>
    </SidebarComponent>
  )
}

