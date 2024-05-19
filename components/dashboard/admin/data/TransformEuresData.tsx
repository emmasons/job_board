"use client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2, PlusCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const TransformEuresData = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/data/eures/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message || "Something went wrong",
        });
      } else {
        toast({
          variant: "default",
          title: "Success",
          description: "Success",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };
  return (
    <div>
      <Button
        onClick={onClick}
        className="inline-flex items-center justify-center"
      >
        {isLoading ? (
          <RotateCcw className="mr-2 h-6 w-6 animate-spin" />
        ) : (
          <span className="inline-flex items-center gap-2 font-semibold">
            <RotateCcw className="mr-2 h-6 w-6" />
            Transform Eures Data
          </span>
        )}
      </Button>
    </div>
  );
};

export default TransformEuresData;
