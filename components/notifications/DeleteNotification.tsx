"use client";

import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/ConfirmModal";

interface DeleteNotificationProps {
  notificationId: string;
}

export const DeleteNotification = ({
  notificationId,
}: DeleteNotificationProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/notifications/${notificationId}/`, {
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

  return (
    <div className="flex items-center gap-x-2">
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
