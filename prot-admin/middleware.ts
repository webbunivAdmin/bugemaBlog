import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected and auth routes
const protectedRoutes = ["/dashboard"]
const authRoutes = {
  login: "/auth/login",
  register: "/auth/register",
  otp: "/auth/otp-verification",
  pending: "/auth/pending-account",
  suspended: "/auth/suspended-account",
}

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user")?.value
  const otpCookie = request.cookies.get("otp_data")?.value
  const path = request.nextUrl.pathname

  const redirect = (path: string) => NextResponse.redirect(new URL(path, request.url))

  const isAuthRoute = Object.values(authRoutes).some(route => path.startsWith(route))
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

  if (!userCookie && isProtectedRoute) {
    return redirect(authRoutes.login)
  }

  if (userCookie) {
    try {
      const user = JSON.parse(userCookie)

      switch (user.status) {
        case "Suspended":
          if (path !== authRoutes.suspended) {
            return redirect(authRoutes.suspended)
          }
          break

        case "Pending":
          if (path !== authRoutes.pending && path !== authRoutes.otp) {
            return redirect(authRoutes.pending)
          }
          break

        case "Active":
          if (isAuthRoute) {
            return redirect("/dashboard")
          }
          break
      }

      if (path === authRoutes.otp) {
        if (!otpCookie) {
          return redirect(authRoutes.login)
        }
      }
      if ((path === authRoutes.login || path === authRoutes.register) && user.status === "Active") {
        return redirect("/dashboard")
      }

    } catch (error) {
      const response = redirect(authRoutes.login)
      response.cookies.delete("user")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*"
  ]
}
