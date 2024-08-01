"use client";

import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/ConfirmModal";

interface ActionsProps {
  jobId: string;
  isScraped: boolean;
}

export const Actions = ({ jobId, isScraped }: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isScraped) {
        const response = await fetch(
          `/api/admin/jobs/${jobId}/set-scrapped-status/`,
          {
            method: "PUT",
            body: JSON.stringify({ isScraped: false }),
          },
        );
        const data = await response.json();
        if (response.status === 200) {
          toast({
            title: "Success",
            description: "This course is no longer available for applications.",
            variant: "default",
            className: "bg-green-300 border-0",
          });
        } else {
          toast({
            title: "Error",
            description: data,
            variant: "destructive",
          });
        }
      } else {
        const response = await fetch(
          `/api/admin/jobs/${jobId}/set-scrapped-status/`,
          {
            method: "PUT",
            body: JSON.stringify({ isScraped: true }),
          },
        );
        const data = await response.json();
        if (response.status === 200) {
          toast({
            title: "Success",
            description: "This course is now available for applications.",
            variant: "default",
            className: "bg-green-300 border-0",
          });
        } else {
          toast({
            title: "Error",
            description: data,
            variant: "destructive",
          });
        }
      }

      router.refresh();
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/jobs/${jobId}/`, {
        method: "DELETE",
      });
      const { message, status } = await response.json();

      if (status === 200) {
        toast({
          title: "Success",
          description: "Resource deleted successfuly.",
          variant: "default",
          className: "bg-green-300 border-0",
        });
      } else {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      }
      router.push("/profile/dashboard/employer/jobs/");
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={isLoading}
        variant="outline"
        size="sm"
      >
        {isScraped ? "Publish" : "Unpublish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading} className="hover:bg-red-700">
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      </ConfirmModal>
    </div>
  );
};
