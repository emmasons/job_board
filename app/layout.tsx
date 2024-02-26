import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/providers/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Auth Templete",
  description:
    "A comprehensive authentication and role based authentication template.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const additionalClassName = "h-full";
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "h-full")}>
        <SessionProvider>
          <Toaster />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
