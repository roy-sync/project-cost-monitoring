"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";
import { SessionProvider } from "next-auth/react";
import { Header } from "@/components/main-header";
import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionProvider>
          <Providers>
            <Header />
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
