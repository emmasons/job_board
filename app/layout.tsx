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
  metadataBase: new URL("https://jobsconnect.net"),
  title: {
    default:
      "Find Jobs in Kuwait, Dubai, Saudi Arabia, Oman, Qatar, and Bahrain",
    template: `%s | Jobsconnect.net`,
  },
  description:
    "Explore top job search websites and job boards for finding employment across the Gulf region. Discover job vacancies and career opportunities in Kuwait, Dubai, Saudi Arabia.",
  keywords: [
    "Jobs",
    "Kuwait jobs",
    "Dubai jobs",
    "Saudi Arabia jobs",
    "Qatar jobs",
    "Oman jobs",
    "jobsconnect.net",
    "jobs",
    "career openings",
    "job",
    "vacancies",
    "careers in gulf",
    "job search",
    "jobs in gulf",
    "jobs gulf",
    "job site",
    "middle east job sites",
    "it jobs in Gulf",
    "jobs gulf",
    "job search in middle east",
    "jobs in middle east",
    "online jobs",
    "accounting jobs in gulf",
    "part time jobs gulf",
    "banking jobs gulf",
    "finance jobs gulf",
    "marketing jobs in gulf.",
    "Jobs Connect",
    "Jobs Connect Limited",
    "Recruitment Agency",
    "Job Agency",
    "jobsconnect.net",
    "Work in The Gulf",
    "The Gulf Jobs",
    "Gulf Region Jobs",
    "Gulf Jobs",
    "Gulf Jobs search",
    "Gulf Jobs salary",
  ],
  twitter: {
    card: "summary_large_image",
    site: "@InfiniteTalent1",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  openGraph: {
    siteName: "jobsconnect.net",
    url: "https://jobsconnect.net",
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
          phoneNumber={"+971503984645"}
          message={"Hello Jobsconnect!"}
        />
      </body>
    </html>
  );
}
