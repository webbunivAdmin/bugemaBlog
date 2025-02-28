"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Loader2, Eye, Pencil, Trash2, Send } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable } from "@/components/ui/data-table"
import { usePosts, useDeletePost, usePublishPosts, type Post, useUnPublishPost } from "@/lib/hooks/use-posts"
import { useAuthStore } from "@/lib/store"

export default function AdminPostsTable() {
  const [statusFilter, setStatusFilter] = React.useState<string>("")
  const { data: posts = [], isLoading } = usePosts(statusFilter)
  const { mutate: deletePost } = useDeletePost()
  const { mutate: publishPost } = usePublishPosts()
  const { mutate: unPublishPost } = useUnPublishPost()
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.accountType === "Admin"

  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <Badge variant="outline">{row.original.cat}</Badge>,
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => {
        const author = row.original.user
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={author.image} alt={author.name} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <span>{author.name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.state === "Published" ? "success" : "secondary"}>{row.original.state}</Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const post = row.original
        const canPublish = isAdmin && post.state === "Pending"
        const canUnPublish = isAdmin && (post.state === "Idle" || post.state === "Published")
        const canEdit = isAdmin

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/posts/${post._id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Post
                </Link>
              </DropdownMenuItem>
              {canEdit && (
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/posts/edit/${post._id}`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Post
                  </Link>
                </DropdownMenuItem>
              )}
              {canPublish && (
                <DropdownMenuItem onClick={() => publishPost(post._id)}>
                  <Send className="mr-2 h-4 w-4" />
                  {post.state === "Pending" ? "Publish" : "Unpublish"}
                </DropdownMenuItem>
              )}
              {canUnPublish && (
                <DropdownMenuItem onClick={() => unPublishPost(post._id)}>
                  <Send className="mr-2 h-4 w-4" />
                  {post.state === "Published" ? "Unpublish" : "Publish"}
                </DropdownMenuItem>
              )}
              {(isAdmin) && (
                <>
                  <DropdownMenuSeparator />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Post
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the post and remove it from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deletePost(post._id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Posts</h2>
          <p className="text-muted-foreground">
            Manage your blog posts here. {isAdmin && "You can publish or unpublish posts."}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/posts/new">Create Post</Link>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <Input placeholder="Search posts..." className="w-[150px] lg:w-[250px]" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter("")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Published")}>Published</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Idle")}>Idle</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <DataTable columns={columns} data={posts} />
      </div>
    </div>
  )
}

