"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const UploadProdLogsToCloud = () => {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const uploadProdLogsToCloud = async () => {
    setIsUploading(true);
    try {
      const response = await fetch("/api/logging/upload", {
        method: "POST",
      });
      const data = await response.json();
      console.log(response, data.status);
      if (data.status !== 200) {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });

        return;
      }

      toast({
        title: "Success",
        description: "Logs uploaded",
        variant: "default",
      });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <Button onClick={uploadProdLogsToCloud}>
        {isUploading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Upload Logs"
        )}
      </Button>
    </div>
  );
};

export default UploadProdLogsToCloud;
