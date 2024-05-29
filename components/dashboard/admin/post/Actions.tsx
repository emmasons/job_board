"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { useConfettiStore } from "@/hooks/useConfettiStore";
import { useToast } from "@/components/ui/use-toast";

interface ActionsProps {
  disabled: boolean;
  postId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, postId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        const request = await fetch(`/api/blog/post/${postId}/unpublish`, {
          method: "PATCH",
        });

        const response = await request.json();

        if (!request.ok) {
          toast({
            variant: "destructive",
            title: "Error",
            description: response.message,
          });
          return;
        } else {
          toast({
            title: "Success",
            description: "Blog unpublished",
            variant: "default",
            className: "bg-green-300 border-0",
          });
        }
      } else {
        const request = await fetch(`/api/blog/post/${postId}/publish`, {
          method: "PATCH",
        });
        const response = await request.json();

        if (!request.ok) {
          toast({
            variant: "destructive",
            title: "Error",
            description: response.message,
          });
          return;
        } else {
          toast({
            title: "Success",
            description: "Blog published",
            variant: "default",
            className: "bg-green-300 border-0",
          });
          confetti.onOpen();
        }
      }

      router.refresh();
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const request = await fetch(`/api/blog/post/${postId}`, {
        method: "DELETE",
      });

      const response = await request.json();

      if (!request.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
        return;
      } else {
        toast({
          title: "Success",
          description: "Blog published",
          variant: "default",
          className: "bg-green-300 border-0",
        });
        router.refresh();
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
