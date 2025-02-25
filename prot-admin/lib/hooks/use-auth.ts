"use client"

import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const API_URI = process.env.NEXT_PUBLIC_API_URL

export function useSignUp() {
  const router = useRouter()

  return useMutation({
    mutationFn: async (formData: {
      firstName: string
      lastName: string
      email: string
      password: string
      image?: string
      accountType: "Admin" | "Writer"
    }) => {
      const { data } = await axios.post(`${API_URI}/auth/register`, formData)
      return data
    },
    onError: (error: any) => {
      toast( error?.response?.data?.message ?? error.message)
    },
    onSuccess: (data) => {
      toast(data?.message)

      localStorage.setItem(
        "otp_data",
        JSON.stringify({
          otpLevel: true,
          id: data.user._id,
        }),
      )

      setTimeout(() => {
        router.push("/otp-verification")
      }, 3000)
    },
  })
}

export function useSignIn() {
  const router = useRouter()

  return useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      const { data } = await axios.post(`${API_URI}/auth/login`, formData)
      localStorage.setItem("user", JSON.stringify(data))
      return data
    },
    onError: (error: any) => {
      toast(error?.response?.data?.message ?? error.message)
    },
    onSuccess: (data) => {
      toast(data?.message)

      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    },
  })
}

export function useVerification() {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ id, otp }: { id: string; otp: string }) => {
      const { data } = await axios.post(`${API_URI}/users/verify/${id}/${otp}`)
      return data
    },
    onError: (error: any) => {
      toast( error?.response?.data?.message ?? error.message)
    },
    onSuccess: (data) => {
      toast(data?.message)

      setTimeout(() => {
        localStorage.removeItem("otp_data")
        router.push("/login")
      }, 1000)
    },
  })
}

export function useResendOTP() {
  const router = useRouter()

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.post(`${API_URI}/users/resend-link/${id}`)
      return data
    },
    onError: (error: any) => {
      toast(error?.response?.data?.message ?? error.message)
    },
    onSuccess: (data) => {
      toast(data?.message)

      localStorage.setItem(
        "otp_data",
        JSON.stringify({
          otpLevel: true,
          id: data.user._id,
        }),
      )

      setTimeout(() => {
        router.refresh()
      }, 1000)
    },
  })
}

