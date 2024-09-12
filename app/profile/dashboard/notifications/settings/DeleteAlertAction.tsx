"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";

type Props = {
  deleteAlert: (id: string) => void;
  id: string;
};

const DeleteAlertAction = ({ deleteAlert, id }: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteAlert(id);
      toast({
        title: "Success",
        description: "Alert deleted successfully.",
        variant: "default",
        className: "bg-green-500",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <Button
        variant="default"
        className="hover:bg-red-500"
        onClick={() => handleDelete()}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default DeleteAlertAction;
