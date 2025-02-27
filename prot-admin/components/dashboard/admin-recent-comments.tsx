"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { format } from "date-fns"
import Link from "next/link"
import { CheckCircle, XCircle, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface RecentComment {
  id: string
  author: {
    name: string
    image?: string
  }
  post: {
    id: string
    title: string
  }
  content: string
  status: "Approved" | "Pending" | "Rejected"
  createdAt: string
}

export function AdminRecentComments() {
  const {
    data: recentComments,
    isLoading,
    error,
  } = useQuery<RecentComment[]>({
    queryKey: ["adminRecentComments"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/comments/recent-admin`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return data
    },
  })

  if (error) return <div>Error loading recent comments</div>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Author</TableHead>
          <TableHead>Post</TableHead>
          <TableHead>Comment</TableHead>
          <TableHead>Status</TableHead>
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
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
              </TableRow>
            ))
          : recentComments?.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={comment.author.image} />
                      <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{comment.author.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/posts/view/${comment.post.id}`} className="hover:underline">
                    {comment.post.title}
                  </Link>
                </TableCell>
                <TableCell className="max-w-[300px] truncate">{comment.content}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      comment.status === "Approved"
                        ? "default"
                        : comment.status === "Pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {comment.status}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(comment.createdAt), "MMM dd, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {comment.status === "Pending" && (
                      <>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      </>
                    )}
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  )
}

