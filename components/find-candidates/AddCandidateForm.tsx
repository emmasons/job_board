"use client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  candidateId: string;
  iconColor?: string;
};

const AddCandidateForm = ({ candidateId, iconColor }: Props) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onClick = async () => {
    if (!candidateId) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/employer/add-candidate/${candidateId}`, {
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
          description: response.message,
        });
      } else {
        toast({
          variant: "default",
          title: "Success",
          description: "Candidate Added",
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
    <div className="inline-block cursor-pointer">
      <div onClick={onClick}>
        {isLoading ? (
          <Loader2
            className={cn(
              "animate-spin",
              iconColor ? "h-4 w-4" : `h-${iconColor} w-${iconColor}`,
            )}
          />
        ) : (
          <PlusCircle className={cn("h-4 w-4", iconColor)} />
        )}
      </div>
    </div>
  );
};

export default AddCandidateForm;
