"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, ArrowRight, LogOut, Mail } from "lucide-react"
import { useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/lib/context/auth-context"

export default function SuspendedAccountPage() {
  const router = useRouter()
  const { user } = useAuth()
  const logout = useAuthStore((state) => state.clearAuth)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
    } else if (user.status === "Active") {
      router.push("/dashboard")
    } else if (user.status === "Pending") {
      router.push("/pending-account")
    }
  }, [user, router])

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  const handleContactSupport = () => {
    window.location.href = `mailto:support@example.com?subject=Account Suspension Appeal - ${user?.email}`
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/10">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="p-3 rounded-full bg-destructive/10">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Account Suspended</h1>
            <p className="text-muted-foreground">
              Your account has been suspended due to a violation of our terms of service.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Restricted</AlertTitle>
            <AlertDescription>
              Your account access has been temporarily restricted. Please contact support for more information.
            </AlertDescription>
          </Alert>

          <div className="rounded-lg border bg-card p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="destructive">Suspended</Badge>
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
                  {user.firstName} {user.lastName}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4 space-y-3">
            <h3 className="font-semibold">How to Appeal</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. Review our terms of service and community guidelines</p>
              <p>2. Prepare information about your account activity</p>
              <p>3. Contact support with your appeal</p>
              <p>4. Wait for our team to review your case</p>
            </div>
          </div>

          <Button className="w-full" onClick={handleContactSupport}>
            <Mail className="mr-2 h-4 w-4" />
            Contact Support
          </Button>
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

