// lib/store/auth-store.ts
import { create } from "zustand"
import Cookies from "js-cookie"

type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  accountType: "Admin" | "Writer"
  status: "Pending" | "Active" | "Suspended"
  image?: string
}

type AuthState = {
  user: User | null
  token: string | null
  otpData: {
    otpLevel: boolean
    id: string
  } | null
  setUser: (user: User) => void
  setToken: (token: string) => void
  setOtpData: (otpData: { otpLevel: boolean; id: string }) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  otpData: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("otp_data") || "null") : null,

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user))
    Cookies.set("user", JSON.stringify(user), { expires: 7 })
    set({ user })
  },

  setToken: (token) => {
    localStorage.setItem("token", token)
    Cookies.set("token", token, { expires: 7 })
    set({ token })
  },

  setOtpData: (otpData) => {
    localStorage.setItem("otp_data", JSON.stringify(otpData))
    set({ otpData })
  },

  clearAuth: () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("otp_data")
    Cookies.remove("user")
    Cookies.remove("token")
    set({ user: null, token: null, otpData: null })
  },
}))
