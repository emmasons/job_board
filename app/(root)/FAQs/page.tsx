import FAQs from "@/components/footer/FAQs";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Find answers to common questions about using JobsConnect.net. Get help with job searching, candidate sourcing, and other services.",
};

export default function Home() {
  return (
    <div className="w-full">
      <FAQs />
    </div>
  );
}
