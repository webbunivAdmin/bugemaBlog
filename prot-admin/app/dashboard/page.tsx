"use client"
import { useAuth } from "@/lib/context/auth-context"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { WriterDashboard } from "@/components/dashboard/writer-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()
  const isAdmin = user?.accountType === "Admin"

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {isAdmin ? <AdminDashboard /> : <WriterDashboard />}
    </div>
  )
}

