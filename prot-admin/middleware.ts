import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const user = request.cookies.get("user")?.value
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")
  const isOTPPage = request.nextUrl.pathname.startsWith("/otp-verification")

  if (!user && !isAuthPage && !isOTPPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/dashbard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth)/:path*", "/otp-verification"],
}

