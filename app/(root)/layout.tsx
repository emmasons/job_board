import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Infinite Talent Limited Job Board",
    template: `%s | Infinite Talent Limited Job Board`,
  },
  description: "Infinite Talent Limited Job Board.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col ">
      <div className="fixed inset-y-0 z-50 h-[80px] w-full">
        <Navbar />
      </div>
      <main className="flex-1 pt-[80px]">{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
