"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, ArrowRight, LogOut, AlertCircle } from "lucide-react"
import { useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/context/auth-context"

export default function PendingAccountPage() {
  const router = useRouter()
    const { user } = useAuth()
  const logout = useAuthStore((state) => state.clearAuth)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    } else if (user.status === "Active") {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  if (!user) return null

  const statusMessages = {
    Pending: {
      title: "Account Pending Approval",
      description: "Your account is currently pending administrator approval.",
      icon: Clock,
      steps: [
        "An administrator will review your account application",
        "You'll receive an email when your account is approved",
        "You can then log in and access the dashboard",
      ],
    },
    Suspended: {
      title: "Account Suspended",
      description: "Your account has been suspended. Please contact support for more information.",
      icon: AlertCircle,
      steps: [
        "Review our terms of service and community guidelines",
        "Contact support to appeal your suspension",
        "Wait for a response from our team",
      ],
    },
  }

  const status = user.status as keyof typeof statusMessages
  const { title, description, icon: StatusIcon, steps } = statusMessages[status]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/10">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="p-3 rounded-full bg-muted">
              <StatusIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={status === "Pending" ? "secondary" : "destructive"}>{user.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Account Type</span>
                <span className="text-sm font-medium">{user.accountType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm font-medium">{user.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Name</span>
                <span className="text-sm font-medium">
                   {user.name}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4 space-y-3">
            <h3 className="font-semibold">What happens next?</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              {steps.map((step, index) => (
                <p key={index}>
                  {index + 1}. {step}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Go to Homepage
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

