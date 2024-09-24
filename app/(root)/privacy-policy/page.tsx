import PrivacyPolicy from "@/components/footer/privacyPolicy";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn about Jobsconnect.net's commitment to protecting your privacy. Read our privacy policy to understand how we handle and safeguard your personal information.",
};

export default function Home() {
  return (
    <div className="w-full">
      <PrivacyPolicy />
    </div>
  );
}
