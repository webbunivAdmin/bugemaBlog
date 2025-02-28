"use client"

import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/context/auth-context"
import Cookies from "js-cookie"
import { useAuthStore } from "@/lib/store"

const API_URI = process.env.NEXT_PUBLIC_API_URL

export function useSignUp() {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  const setToken = useAuthStore((state) => state.setToken)

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
      toast(error?.response?.data?.message ?? error.message)
    },
    onSuccess: (data) => {
      setUser(data.user)
      setToken(data.token)
      toast(data?.message)

      localStorage.setItem(
        "otp_data",
        JSON.stringify({
          otpLevel: true,
          id: data.user._id,
        }),
      )

      setTimeout(() => {
        router.push("/auth/otp-verification")
      }, 3000)
    },
  })
}

export function useSignIn() {
  const router = useRouter()
  const { signIn } = useAuth()

  return useMutation({
    mutationFn: async (formData: { email: string; password: string }) => {
      const { data } = await axios.post(`${API_URI}/auth/login`, formData)
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)
      Cookies.set("user", JSON.stringify(data.user), { expires: 7 })
      Cookies.set("token", JSON.stringify(data.token), { expires: 7 })
      return data
    },
    onError: (error: any) => {
      toast(error?.response?.data?.message ?? error.message)
    },
    onSuccess: (data) => {
      signIn(data.user)
      toast(data?.message)
      router.push("/dashboard")
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
      toast(error?.response?.data?.message ?? error.message)
    },
    onSuccess: (data) => {
      toast(data?.message)

      setTimeout(() => {
        localStorage.removeItem("otp_data")
        router.push("/auth/login")
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

