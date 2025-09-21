import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token =request.cookies.get('next-auth.session-token');
    if(!token){
          return NextResponse.redirect(new URL('/login', request.url))
    }
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/products' ,'/'],
}

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   // استثني صفحات auth عشان متعملش loop
//   if (pathname.startsWith('/login') || pathname.startsWith('/api/auth')) {
//     return NextResponse.next()
//   }

//   const token =
//     request.cookies.get('next-auth.session-token')?.value ||
//     request.cookies.get('__Secure-next-auth.session-token')?.value

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/', '/products'],
// }
