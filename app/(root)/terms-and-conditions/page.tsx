import TermsAndConditions from "@/components/footer/terms";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Review the terms and conditions for using talentra.io. Understand our policies and guidelines for accessing job search and recruitment services.",
};

export default function Home() {
  return (
    <div className="w-full">
      <TermsAndConditions />
    </div>
  );
}
