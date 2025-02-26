"use client"

import * as React from "react"
import { format } from "date-fns"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { useAuthStore } from "@/lib/store"
import { useComments, useCreateComment, useDeleteComment } from "@/lib/hooks/use-comments"

interface Comment {
  _id: string
  desc: string
  createdAt: string
  user: {
    _id: string
    name: string
    image: string
  }
}


interface CommentsProps {
  postId: string
}

export function Comments({ postId }: CommentsProps) {
  const [desc, setContent] = React.useState("")
  const user = useAuthStore((state) => state.user)
  const { data: comments = [], isLoading } = useComments(postId)
  // const commentId = comments.map((comment) => comment._id)
  // const { data: comment } = useComments(commentId)
  const { mutate: createComment, isPending: isCreating } = useCreateComment()
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!desc.trim()) return

    createComment(
      { postId, desc },
      {
        onSuccess: () => {
          setContent("")
        },
      },
    )
  }

  const handleDelete = (commentId: string) => {
    deleteComment({ postId, commentId })
  }

  return (
    <div className="space-y-6">
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            value={desc}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      ) : (
        <div className="rounded-lg border bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Please{" "}
            <Button variant="link" className="h-auto p-0 text-sm font-normal">
              login
            </Button>{" "}
            to comment
          </p>
        </div>
      )}

      <div className="space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-start gap-4 animate-pulse">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-24 rounded bg-muted" />
                  <div className="h-4 w-full rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="rounded-lg border bg-muted/50 p-8 text-center">
            <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="divide-y">
            {comments.map((comment) => (
              <div key={comment._id} className="space-y-2 py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.user.image} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{comment.user.name}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(comment.createdAt), "PPP")}</p>
                    </div>
                  </div>
                  {user?._id === comment.user._id && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          disabled={isDeleting}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete comment</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this comment? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(comment._id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={isDeleting}
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
                <p className="text-sm leading-relaxed">{comment.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

