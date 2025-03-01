"use client"

import { format } from "date-fns"
import Link from "next/link"
import { Eye, MessageSquare, Edit } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store"
import { useWriterRecentPosts } from "@/lib/hooks/use-dashboard"

export function WriterRecentPosts() {
  const user = useAuthStore((state) => state.user)
  const { data: writerPosts, isLoading, error } = useWriterRecentPosts(user?._id ?? "")

  if (error) return <div>Error loading your posts</div>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Views</TableHead>
          <TableHead>Comments</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[50px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[50px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
              </TableRow>
            ))
          : writerPosts?.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {post.cat}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      post.state === "Published" ? "success" : post.state === "Pending" ? "secondary" : "outline"
                    }
                  >
                    {post.state}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3 text-muted-foreground" />
                    {post.views.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3 text-muted-foreground" />
                    {post.commentsCount}
                  </div>
                </TableCell>
                <TableCell>{format(new Date(post.createdAt), "MMM dd, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/dashboard/posts/${post.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/dashboard/posts/edit/${post.id}`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  )
}

