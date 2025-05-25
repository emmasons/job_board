import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/providers/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import WhatsAppButton from "@/components/integrations/Whatsapp";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
}); // Define Poppins font with weights

export const metadata: Metadata = {
  metadataBase: new URL("https://talentra.io"),
  title: {
    default: "Find Visa Sponsorship Jobs Worldwide | Talentra",
    template: `%s | Talentra.io`,
  },
  description:
    "Discover global job opportunities that offer visa sponsorship. Talentra connects job seekers with employers around the world who support international relocation.",
  keywords: [
    "Visa sponsorship jobs",
    "International jobs",
    "Relocation jobs",
    "Jobs abroad",
    "Skilled migration",
    "Work overseas",
    "Sponsorship jobs USA",
    "Sponsorship jobs UK",
    "Jobs in Europe with visa sponsorship",
    "Work in Canada",
    "Work in Australia",
    "Job sponsorship",
    "Global hiring",
    "Remote jobs with relocation",
    "Talentra",
    "talentra.io",
    "International recruitment",
    "Job relocation support",
    "Immigration jobs",
    "Worldwide job search",
    "Global career opportunities",
    "H1B jobs",
    "Skilled worker visa jobs",
  ],
  twitter: {
    card: "summary_large_image",
    site: "@InfiniteTalent1",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  openGraph: {
    siteName: "talentra.io",
    url: "https://talentra.io",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <Analytics />
      </head>
      <body className={cn(poppins.className, "h-full")}>
        <SessionProvider>
          <Toaster />
          {children}
        </SessionProvider>
        <WhatsAppButton
          phoneNumber={"+971507092468"}
          message={"Hello Talentra!"}
        />
      </body>
    </html>
  );
}
