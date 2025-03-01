"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"

export function useAuthRedirect() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    } else if (user.status === "Suspended") {
      router.push("/auth/suspended-account")
    } else if (user.status === "Pending") {
      router.push("/auth/pending-account")
    }
  }, [user, router])

  return user
}

