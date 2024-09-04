import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/providers/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import WhatsAppButton from "@/components/integrations/Whatsapp";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
}); // Define Poppins font with weights

export const metadata: Metadata = {
  title: "Job Board",
  description:
    "A comprehensive authentication and role based authentication template.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(poppins.className, "h-full")}>
        <SessionProvider>
          <Toaster />
          {children}
        </SessionProvider>
        <WhatsAppButton
          phoneNumber={"+971503984645"}
          message={"Hello Jobsconnect!"}
        />
      </body>
    </html>
  );
}
