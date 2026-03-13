import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard', '/admin']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the route is protected
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (!isProtected) {
    return NextResponse.next()
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get('__Secure-better-auth.session_token')?.value ||
    request.cookies.get('better-auth.session_token')?.value

  if (!sessionCookie) {
    // Redirect to login with return URL
    return NextResponse.redirect(
      new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|static|public|.*\\..*).*)'],
}
