"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
  {
    title: "Overview",
    href: "/dashboard",
  },
  {
    title: "Posts",
    href: "/dashboard/posts",
  },
  {
    title: "Comments",
    href: "/dashboard/comments",
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-4">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary" : "text-muted-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

