"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

const API_URI = process.env.NEXT_PUBLIC_API_URL

interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  accountType: "Admin" | "Writer"
  status: "Pending" | "Active" | "Suspended"
  image?: string
  createdAt: string
}

interface UpdateUserData {
  userId: string
  data: Partial<User>
}

export function useUsers(status?: string, search?: string) {
    return useQuery({
      queryKey: ["users", { status, search }],
      queryFn: async () => {
        const params = new URLSearchParams()
        if (status) params.append("status", status)
        if (search) params.append("search", search)
  
        const { data } = await axios.get(`${API_URI}/users/all?${params}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
  
        return data.data
      },
    })
  }
  

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, data }: UpdateUserData) => {
      const { data: responseData } = await axios.patch(`${API_URI}/users/${userId}`, data)
      return responseData
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("User updated successfully")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to update user")
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await axios.delete(`${API_URI}/users/${userId}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("User deleted successfully")
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to delete user")
    },
  })
}

export function useApproveUser() {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async (userId: string) => {
        const { data } = await axios.patch(`${API_URI}/users/approve/${userId}`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        return data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] })
        toast.success("User approved successfully")
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message ?? "Failed to approve user")
      },
    })
  }
  
  export function useSuspendUser() {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async (userId: string) => {
        const { data } = await axios.patch(`${API_URI}/users/suspend/${userId}`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        return data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] })
        toast.success("User status updated successfully")
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message ?? "Failed to update user status")
      },
    })
  }
  
  export function useChangeAccountType() {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async (userId: string) => {
        const { data } = await axios.patch(`${API_URI}/users/makeadmin/${userId}`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        return data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] })
        toast.success("User account type updated successfully")
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message ?? "Failed to change account type")
      },
    })
  }

  export function useMakeWriter() {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async (userId: string) => {
        const { data } = await axios.patch(`${API_URI}/users/makewriter/${userId}`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        return data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] })
        toast.success("User account type updated successfully")
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message ?? "Failed to change account type")
      },
    })
  }
  

  export interface UpdateProfileData {
    firstName: string
    lastName: string
    image?: string
  }
  
  export function useUpdateProfile() {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async (data: UpdateProfileData) => {
        const { data: response } = await axios.put(`${API_URI}/users/update-user`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        return response.data
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["user"] })
        toast.success("Profile updated successfully")
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message ?? "Failed to update profile")
      },
    })
  }