import { MainNav } from "@/components/dashboard/MainNav";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserNav } from "@/components/dashboard/UserNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
