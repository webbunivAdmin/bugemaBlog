"use client"

import { format } from "date-fns"
import Link from "next/link"
import { Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useWriterRecentComments } from "@/lib/hooks/use-dashboard"
import { useAuth } from "@/lib/context/auth-context"

export function WriterRecentComments() {
  const { user } = useAuth()
  const { data: writerComments, isLoading, error } = useWriterRecentComments(user?._id ?? "")

  if (error) return <div>Error loading comments on your posts</div>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Author</TableHead>
          <TableHead>Post</TableHead>
          <TableHead>Comment</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[300px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
              </TableRow>
            ))
          : writerComments?.map((comment) => (
              <TableRow key={comment._id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={comment.user.image} />
                      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{comment.user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/posts/view/${comment.post._id}`} className="hover:underline">
                    {comment.post.title}
                  </Link>
                </TableCell>
                <TableCell className="max-w-[300px] truncate">{comment.desc}</TableCell>
                <TableCell>{format(new Date(comment.createdAt), "MMM dd, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="ghost">
                    <Link href={`/dashboard/posts/view/${comment.post._id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Post
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  )
}

