'use client'

import { SessionProvider } from "next-auth/react";
import CartContextProvider from "./CartContext";
import { Toaster } from "react-hot-toast";


export function AuthProvider({children}:{children:React.ReactNode}){

    return <SessionProvider>
        <CartContextProvider>
               {children}
        </CartContextProvider>
        <Toaster
  position="top-right"
  reverseOrder={false}
/>
    </SessionProvider>

}