"use client"

import { useState } from "react"
import { useComments, useDeleteComment, useApproveComment, useUnapproveComment } from "@/lib/hooks/use-comments"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Trash, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import Link from "next/link"

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { data: comments, isLoading, error } = useComments()
  const { mutate: deleteComment } = useDeleteComment()
  const { mutate: approveComment } = useApproveComment()
  const { mutate: unapproveComment } = useUnapproveComment()

  const filteredComments =
    comments?.filter(
      (comment) =>
        comment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.desc.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  const handleDelete = (id: string) => {
    deleteComment(id, {
      onSuccess: () => toast.success("Comment deleted successfully"),
      onError: () => toast.error("Failed to delete comment"),
    })
  }

  const handleApprove = (id: string) => {
    approveComment(id, {
      onSuccess: () => toast.success("Comment approved"),
      onError: () => toast.error("Failed to approve comment"),
    })
  }

  const handleUnapprove = (id: string) => {
    unapproveComment(id, {
      onSuccess: () => toast.success("Comment unapproved"),
      onError: () => toast.error("Failed to unapprove comment"),
    })
  }

  if (error) return <div>Failed to load comments</div>

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Comments</h1>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search comments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Post</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
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
                    <Skeleton className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))
            : filteredComments.map((comment) => (
                <TableRow key={comment._id}>
                  <TableCell>{comment.user.name}</TableCell>
                  <TableCell>{comment.post.title}</TableCell>
                  <TableCell>{comment.desc}</TableCell>
                  <TableCell>
                    <Badge variant={comment.status === "Approved" ? "default" : "secondary"}>{comment.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/posts/view/${comment.post._id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Post</span>
                          </Link>
                        </DropdownMenuItem>
                        {comment.status === "Pending" && (
                          <DropdownMenuItem onClick={() => handleApprove(comment._id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Approve</span>
                          </DropdownMenuItem>
                        )}
                        {comment.status === "Approved" && (
                          <DropdownMenuItem onClick={() => handleUnapprove(comment._id)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            <span>Unapprove</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleDelete(comment._id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  )
}

