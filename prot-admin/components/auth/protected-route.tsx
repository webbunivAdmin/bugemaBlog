"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/context/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ("Admin" | "Writer")[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }

    if (!isLoading && user && allowedRoles && !allowedRoles.includes(user.accountType)) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router, allowedRoles])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    )
  }

  if (!user || (allowedRoles && !allowedRoles.includes(user.accountType))) {
    return null
  }

  return <>{children}</>
}

