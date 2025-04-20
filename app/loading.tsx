import { Logo } from "@/components/navbar/Logo";
import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-100">
      <Logo />
      <p className="text-secondary">Where talent and jobs meet.</p>
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
};

export default loading;
