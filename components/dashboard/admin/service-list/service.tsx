"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Preview } from "@/components/ckeditor/RichTextRenderer";
import Link from "next/link";
import { Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface ServiceProps {
  title: string;
  description?: string | null;
  id: string;
}

const Service = ({ title, description, id }: ServiceProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const onDelete = async () => {
    try {
      setIsLoading(true);

      const request = await fetch(`/api/service/${id}/`, {
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
          description: "Service deleted",
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
    <div className="flex flex-col">
      <div className="rounded-lg bg-green-100 p-3 hover:bg-green-200">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-green-600">{title}</h4>
          <div className="flex items-center justify-end gap-5">
            <ConfirmModal onConfirm={onDelete}>
              <Trash
                className={cn(
                  "h-5 w-5 cursor-pointer",
                  isLoading && "animate-spin",
                )}
              />
            </ConfirmModal>
            <Link href={`/profile/dashboard/admin/service/${id}`}>
              <Eye className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <Preview value={description!} />
      </div>
    </div>
  );
};

export default Service;
