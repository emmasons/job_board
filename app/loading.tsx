import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-100">
      <Loader2 className="h-20 w-20 animate-spin text-primary" />
    </div>
  );
};

export default loading;
