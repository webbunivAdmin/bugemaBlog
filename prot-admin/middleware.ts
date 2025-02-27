import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user")?.value
  const otpCookie = request.cookies.get("otp_data")?.value
  const path = request.nextUrl.pathname

  // Define path types
  const isAuthPage = path.startsWith("/auth")
  const isOTPPage = path.startsWith("/otp-verification")
  const isDashboardPage = path.startsWith("/dashboard")
  const isPendingPage = path === "/auth/pending-account"
  const isSuspendedPage = path === "/auth/suspended-account"

  // If no user cookie and trying to access protected routes
  if (!userCookie && !isAuthPage && !isOTPPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // If there is a user
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie)

      // Handle suspended users
      if (user.status === "Suspended") {
        if (!isSuspendedPage) {
          return NextResponse.redirect(new URL("/auth/suspended-account", request.url))
        }
      }

      // Handle pending users
      if (user.status === "Pending") {
        if (!isPendingPage && !isOTPPage) {
          return NextResponse.redirect(new URL("/auth/pending-account", request.url))
        }
      }

      // Handle active users
      if (user.status === "Active") {
        if (isPendingPage || isSuspendedPage) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
        }
      }

      // Prevent authenticated users from accessing auth pages
      if (isAuthPage && !isOTPPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }

      // Handle OTP verification access
      if (isOTPPage && !otpCookie) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
      }
    } catch (error) {
      // If user cookie is invalid, clear it and redirect to login
      const response = NextResponse.redirect(new URL("/auth/login", request.url))
      response.cookies.delete("user")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/auth/otp-verification", "/auth/pending-account", "/auth/suspended-account"],
}

