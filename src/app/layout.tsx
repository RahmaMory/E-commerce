import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar-comp/Navbar";
import { AuthProvider } from "./context/AuthProvider";
import WishContextProvider, { WishlistProvider } from "./context/WishListContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zenya",
  description: "Zenya-Shop Smart, Live Better",
icons: {
  icon: "/favicon.ico",
}

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
                    <WishContextProvider>
           <Navbar/>
        {children}
                  </WishContextProvider>
        </AuthProvider>
        
       
      </body>
    </html>
  );
}


