"use client"

import AdminPostsTable from "@/components/posts/admin-posts"
import WriterPostsTable from "@/components/posts/writer-posts"
import { useAuth } from "@/lib/context/auth-context"

export default function PostsPage() {
  const { user } = useAuth()
  const isAdmin = user?.accountType === "Admin"

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">

      {isAdmin ? <AdminPostsTable /> : <WriterPostsTable />}
    </div>
  )
}

