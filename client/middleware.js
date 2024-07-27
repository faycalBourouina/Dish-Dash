import { NextResponse } from 'next/server'

 export async function middleware(request) {
  const sessionCookie = request.cookies.get('session')
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/favorite/:path*',
}