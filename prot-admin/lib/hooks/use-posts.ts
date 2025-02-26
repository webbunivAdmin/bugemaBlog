"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

const API_URI = process.env.NEXT_PUBLIC_API_URL

export interface Post {
  _id: string
  title: string
  content: string
  slug: string
  image?: string
  category: string
  status: boolean
  state: "Draft" | "Published"
  author: {
    _id: string
    name: string
    image?: string
  }
  createdAt: string
  updatedAt: string
}

interface CreatePostData {
  title: string
  content: string
  image?: string
  category: string
}

interface UpdatePostData {
  postId: string
  data: Partial<Post>
}

export function usePosts(status?: string) {
  return useQuery({
    queryKey: ["posts", { status }],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (status) params.append("status", status)

      const { data } = await axios.get(`${API_URI}/posts?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return data.data as Post[]
    },
  })
}

export function usePost(postId: string) {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URI}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return data.data as Post
    },
    enabled: !!postId,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreatePostData) => {
      const response = await axios.post(`${API_URI}/posts`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      toast.success("Post created successfully")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to create post")
    },
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ postId, data }: UpdatePostData) => {
      const response = await axios.patch(`${API_URI}/posts/${postId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      toast.success("Post updated successfully")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to update post")
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await axios.delete(`${API_URI}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      toast.success("Post deleted successfully")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to delete post")
    },
  })
}

export function usePublishPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (postId: string) => {
      const response = await axios.patch(
        `${API_URI}/posts/${postId}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      toast.success("Post status updated successfully")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to update post status")
    },
  })
}
