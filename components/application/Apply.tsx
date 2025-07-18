"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  jobId: string;
  coverLetter?: string;
  isExternal?: boolean;
  externalLink?: string;
};

const Apply = (props: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { jobId, coverLetter, isExternal, externalLink } = props;
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/applications/`, {
        method: "POST",
        body: JSON.stringify({ jobId, coverLetter }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong!",
        });
      } else {
        toast({
          variant: "default",
          title: "Success",
          description: "Application submitted successfully!",
        });
        window.location.reload();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };
  return isExternal ? (
    <Button>
      <a href={externalLink} target="_blank" rel="noopener noreferrer">
        Apply Now
      </a>
    </Button>
  ) : (
    <Button onClick={onSubmit} className="w-fit bg-primary font-semibold">
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply Now"}
    </Button>
  );
};

export default Apply;
