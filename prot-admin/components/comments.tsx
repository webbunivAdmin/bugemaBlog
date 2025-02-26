"use client"

import * as React from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/lib/store"

interface Comment {
  _id: string
  content: string
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
  const [comment, setComment] = React.useState("")
  const queryClient = useQueryClient()
  const user = useAuthStore((state) => state.user)

  const { data: comments = [], isLoading } = useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${postId}/comments`)
      if (!response.ok) throw new Error("Failed to fetch comments")
      return response.json()
    },
  })

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: async (content: string) => {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
      if (!response.ok) throw new Error("Failed to add comment")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] })
      setComment("")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return
    addComment(comment)
  }

  return (
    <div className="space-y-6">
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      ) : (
        <p className="text-center text-muted-foreground">Please login to comment</p>
      )}

      <div className="space-y-6">
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-muted-foreground">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="space-y-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.user.image} alt={comment.user.name} />
                  <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{comment.user.name}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(comment.createdAt), "PPP")}</p>
                </div>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

