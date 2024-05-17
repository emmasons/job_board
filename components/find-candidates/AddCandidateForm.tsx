"use client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  candidateId: string;
};

const AddCandidateForm = ({ candidateId }: Props) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    }
  };
  return (
    <div>
      <Button
        onClick={onClick}
        className="inline-flex items-center justify-center"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        ) : (
          <PlusCircle className="mr-2 h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default AddCandidateForm;
