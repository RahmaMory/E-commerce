// // // import NextAuth, { NextAuthOptions } from "next-auth"
// // // import CredentialsProvider from "next-auth/providers/credentials"

// // // //providers ...
// // // //strategy JWT session ...
// // // //pages login ...
// // // //encrytion ...
// // // //callbacks ....

// // export const OPTIONS : NextAuthOptions={

// //  providers: [
// //   CredentialsProvider({
// //     name: 'Credentials',
// //     credentials: {
// //       email: { label: "email", type: "email" },
// //       password: { label: "Password", type: "password" }
// //     },
// //     async authorize(credentials) {
   
// //       const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
// //         method: 'POST',
// //         body: JSON.stringify({
// //             email:credentials?.email,
// //             password:credentials?.password
// //         }),
// //         headers: { "Content-Type": "application/json" }
// //       })
// //       const user = await res.json()

// //       // If no error and we have user data, return it
// //       if (res.ok && user) {
// //         return user
// //       }
// //       // Return null if user data could not be retrieved
// //       return null
// //     }
// //   })
// // ],

// // session:{
// //     strategy:'jwt'
// // },
// // pages:{
// //      signIn: '/login',
// // },
// // callbacks:{
// //       async session({ session, token, user }) {
// //     return {...session , ...token , ...user}
// //   },
// //   async jwt({ token, user}) {
// //     return {...token , ...user}
// //   }
// // },

// // secret:process.env.AUTH_SECRET

// // }

// // const handler=NextAuth(OPTIONS)

// // export { handler as GET, handler as POST }

// import NextAuth, { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"

// export const OPTIONS: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
//           method: "POST",
//           body: JSON.stringify({
//             email: credentials?.email,
//             password: credentials?.password,
//           }),
//           headers: { "Content-Type": "application/json" },
//         })

//         const user = await res.json()

//         if (res.ok && user) {
//           return user
//         }
//         return null
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async session({ session, token, user }) {
//       return { ...session, ...token, ...user }
//     },
//     async jwt({ token, user }) {
//       return { ...token, ...user }
//     },
//   },

//   // هنا التعديل 👇
//   secret: process.env.NEXTAUTH_SECRET,
// }

// const handler = NextAuth(OPTIONS)

// export { handler as GET, handler as POST }


// // import NextAuth, { NextAuthOptions } from "next-auth"
// // import CredentialsProvider from "next-auth/providers/credentials"

// // export const OPTIONS: NextAuthOptions = {
// //   providers: [
// //     CredentialsProvider({
// //       name: "Credentials",
// //       credentials: {
// //         email: { label: "Email", type: "email" },
// //         password: { label: "Password", type: "password" },
// //       },
// //       async authorize(credentials) {
// //         const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             email: credentials?.email,
// //             password: credentials?.password,
// //           }),
// //         })

// //         const data = await res.json()

// //         if (!res.ok || !data?.token) {
// //           return null
// //         }

// //         // رجّع فورمات مناسب
// //         return {
// //           id: data.user._id,
// //           name: data.user.name,
// //           email: data.user.email,
// //           token: data.token,
// //         }
// //       },
// //     }),
// //   ],

// //   session: {
// //     strategy: "jwt",
// //   },

// //   pages: {
// //     signIn: "/login",
// //   },

// //   callbacks: {
// //     async jwt({ token, user }) {
// //       if (user) {
// //         token.id = user.id
// //         token.name = user.name
// //         token.email = user.email
// //         token.accessToken = user.token
// //       }
// //       return token
// //     },

// //     async session({ session, token }) {
// //       session.user = {
// //         id: token.id,
// //         name: token.name,
// //         email: token.email,
// //       }
// //       session.accessToken = token.accessToken
// //       return session
// //     },
// //   },

// //   secret: process.env.NEXTAUTH_SECRET,
// // }

// // const handler = NextAuth(OPTIONS)

// // export { handler as GET, handler as POST }
// // import NextAuth, { NextAuthOptions } from "next-auth"
// // import CredentialsProvider from "next-auth/providers/credentials"

// // export const OPTIONS: NextAuthOptions = {
// //   providers: [
// //     CredentialsProvider({
// //       name: "Credentials",
// //       credentials: {
// //         email: { label: "Email", type: "email" },
// //         password: { label: "Password", type: "password" },
// //       },
// //       async authorize(credentials) {
// //         const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
// //           method: "POST",
// //           body: JSON.stringify({
// //             email: credentials?.email,
// //             password: credentials?.password,
// //           }),
// //           headers: { "Content-Type": "application/json" },
// //         })

// //         const data = await res.json()

// //         if (res.ok && data.message === "success") {
// //           return {
// //             name: data.user.name,
// //             email: data.user.email,
// //             role: data.user.role,
// //             token: data.token, // نخزن التوكن
// //           }
// //         }

// //         return null
// //       },
// //     }),
// //   ],

// //   session: {
// //     strategy: "jwt",
// //   },
// //   pages: {
// //     signIn: "/login",
// //   },

// //   callbacks: {
// //     async jwt({ token, user }) {
// //       if (user) {
// //         token.name = user.name
// //         token.email = user.email
// //         token.role = user.role
// //         token.token = user.token
// //       }
// //       return token
// //     },
// //     async session({ session, token }) {
// //       session.user = {
// //         name: token.name as string,
// //         email: token.email as string,
// //         role: token.role as string,
// //         token: token.token as string,
// //       }
// //       return session
// //     },
// //   },

// //   secret: process.env.NEXTAUTH_SECRET,
// // }

// // const handler = NextAuth(OPTIONS)

// // export { handler as GET, handler as POST }


import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

//providers ...
//strategy JWT session ...
//pages login ...
//encrytion ...
//callbacks ....

export const OPTIONS : NextAuthOptions={

 providers: [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: "email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
   
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
        method: 'POST',
        body: JSON.stringify({
            email:credentials?.email,
            password:credentials?.password
        }),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()

      // If no error and we have user data, return it
      if (res.ok && user) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  })
],

session:{
    strategy:'jwt'
},
pages:{
     signIn: '/login',
},
callbacks:{
      async session({ session, token, user }) {
    return {...session , ...token , ...user}
  },
  async jwt({ token, user}) {
    return {...token , ...user}
  }
},

secret:process.env.NEXTAUTH_SECRET

}

const handler=NextAuth(OPTIONS)

export { handler as GET, handler as POST }

