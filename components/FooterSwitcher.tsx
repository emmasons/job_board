// components/FooterSwitcher.tsx
"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Footer2 from "@/components/Footer2";

export default function FooterSwitcher() {
  const pathname = usePathname();

  if (pathname.startsWith("/generate-cv") || pathname.startsWith("/cv/edit/") || pathname.startsWith("/cv/tailor/")) {
    return <Footer2 />;
  }

  return <Footer />;
}
