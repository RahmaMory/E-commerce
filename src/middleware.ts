// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//     const token =request.cookies.get('next-auth.session-token');
//     if(!token){
//           return NextResponse.redirect(new URL('/login', request.url))
//     }
//   return NextResponse.next()
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/products' ,'/'],
// }

// // import { NextResponse } from 'next/server'
// // import type { NextRequest } from 'next/server'

// // export function middleware(request: NextRequest) {
// //   const { pathname } = request.nextUrl

// //   // استثني صفحات auth عشان متعملش loop
// //   if (pathname.startsWith('/login') || pathname.startsWith('/api/auth')) {
// //     return NextResponse.next()
// //   }

// //   const token =
// //     request.cookies.get('next-auth.session-token')?.value ||
// //     request.cookies.get('__Secure-next-auth.session-token')?.value

// //   if (!token) {
// //     return NextResponse.redirect(new URL('/login', request.url))
// //   }

// //   return NextResponse.next()
// // }

// // export const config = {
// //   matcher: ['/', '/products'],
// // }


// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   // استثناء صفحات auth وصفحة login عشان متعملش loop
//   if (pathname.startsWith("/login") || pathname.startsWith("/api/auth")) {
//     return NextResponse.next()
//   }

//   // جرب الكوكيز بالاسمين (local + production)
//   const token =
//     request.cookies.get("next-auth.session-token")?.value ||
//     request.cookies.get("__Secure-next-auth.session-token")?.value

//   // لو مفيش توكن → روح على login
//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/", "/products"], // المسارات اللي عايزة تحميها
// }


import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // استثناء login + api/auth
  if (pathname.startsWith("/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  // التحقق من التوكن بجيت توكن
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api/auth|login).*)"], // يحمي كل حاجة ما عدا login و api/auth
}
