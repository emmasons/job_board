"use client";

import { useState } from "react";

type PlanName = "FREE" | "BASIC" | "STANDARD" | "PREMIUM";

type Props = {
  cvId: string;
  fileUrl: string;
  paymentStatus: "paid" | "unpaid";
  subscription: {
    id: string;
    plan: {
      name: PlanName;
    };
    status: "ACTIVE" | "CANCELLED" | "EXPIRED" | "TRIAL";
    downloadCount: number;
  } | null;
};

export default function CvDownloadButton({
  cvId,
  fileUrl,
  paymentStatus,
  subscription,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!subscription || subscription.status !== "ACTIVE") {
      alert("You need an active subscription to download this CV.");
      return;
    }

    const plan = subscription.plan.name;
    const downloadCount = subscription.downloadCount ?? 0;

    const downloadLimit = plan === "FREE" ? 1 : plan === "BASIC" ? 10 : Infinity;

    if (paymentStatus === "paid") {
      return triggerDownload(fileUrl);
    }

    if (downloadCount >= downloadLimit) {
      alert(`You’ve reached your ${plan} plan download limit.`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/cv/mark-paid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      triggerDownload(fileUrl);
    } catch (err: any) {
      alert(err.message || "Failed to mark CV as paid.");
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "";
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/80 transition disabled:opacity-60"
    >
      {loading ? "Processing..." : "Download"}
    </button>
  );
}
