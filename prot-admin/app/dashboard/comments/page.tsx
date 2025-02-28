"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Trash, CheckCircle, XCircle } from "lucide-react"

const comments = [
  { id: 1, author: "John Doe", post: "Getting Started with Next.js", content: "Great article!", status: "Approved" },
  {
    id: 2,
    author: "Jane Smith",
    post: "React Hooks Explained",
    content: "This helped me a lot, thanks!",
    status: "Pending",
  },
  {
    id: 3,
    author: "Bob Johnson",
    post: "CSS Grid Layout",
    content: "Could you elaborate more on grid areas?",
    status: "Approved",
  },
]

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredComments = comments.filter(
    (comment) =>
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.post.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
          {filteredComments.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell>{comment.author}</TableCell>
              <TableCell>{comment.post}</TableCell>
              <TableCell>{comment.content}</TableCell>
              <TableCell>{comment.status}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View</span>
                    </DropdownMenuItem>
                    {comment.status === "Pending" && (
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <span>Approve</span>
                      </DropdownMenuItem>
                    )}
                    {comment.status === "Approved" && (
                      <DropdownMenuItem>
                        <XCircle className="mr-2 h-4 w-4" />
                        <span>Unapprove</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
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

