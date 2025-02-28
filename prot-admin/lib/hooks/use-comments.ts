"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

const API_URI = process.env.NEXT_PUBLIC_API_URL

export interface Comment {
  _id: string
  desc: string
  post: string
  user: {
    _id: string
    name: string
    image?: string
  }
  createdAt: string
  updatedAt: string
}

interface CreateCommentData {
  desc: string
  postId: string
}

export function useComments(postId: string) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URI}/posts/comments/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return data.data as Comment[]
    },
    enabled: !!postId,
  })
}

export function useCreateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ postId, desc }: CreateCommentData) => {
      const response = await axios.post(
        `${API_URI}/posts/comment/${postId}`,
        { desc },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.postId] })
      toast.success("Comment added successfully")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to add comment")
    },
  })
}

export function useDeleteComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ postId, commentId }: { postId: string; commentId: string }) => {
      const response = await axios.delete(`${API_URI}/posts/comment/${postId}/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.postId] })
      toast.success("Comment deleted successfully")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to delete comment")
    },
  })
}


export function useCommentById(commentId: string) {
  return useQuery({
    queryKey: ["comments", commentId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URI}/posts/comment-id/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return data.data as Comment[]
    },
    enabled: !!commentId,
  })
}