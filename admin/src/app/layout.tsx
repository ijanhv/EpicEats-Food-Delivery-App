"use client";
import { MainNav } from "@/components/dashboard/MainNav";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import { UserNav } from "@/components/dashboard/UserNav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

// const inter = Inter({ subsets: ["latin"] });
// const lora = Lora({ subsets: ["latin"] });
// const source_sans_3 = Source_Sans_3({ subsets: ["latin"] });
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
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
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
