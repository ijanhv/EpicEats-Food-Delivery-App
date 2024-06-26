"use client";
import { MainNav } from "@/components/dashboard/MainNav";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import { UserNav } from "@/components/dashboard/UserNav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ToasterSonner } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const figtree = Figtree({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={figtree.className}>
        <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <ToasterSonner />
            <div className="border-b dark:border-gray-600">
              <div className="flex h-16 items-center max-w-7xl    mx-auto px-5 sm:px-4 xl:px-0 ">
                <MainNav className="" />
                <div className="ml-auto flex items-center space-x-4">
                  <UserNav />
                </div>
              </div>
            </div>
            <div className="px-5 sm:px-4 xl:px-0 max-w-7xl mx-auto ">
              {children}
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
