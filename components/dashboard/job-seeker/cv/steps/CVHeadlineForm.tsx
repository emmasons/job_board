"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";

type Props = {
  title: String;
  description: String;
  profilePercentage: Number;
  initialData: {
    cvHeadLine: string | null;
  };
  profileId: string;
};

const CVHeadlineForm = ({
  title,
  profilePercentage,
  initialData,
  profileId,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const { toast } = useToast();
  const formSchema = z.object({
    cvHeadLine: z.string().min(2, "Your CV Headline is required."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cvHeadLine: initialData.cvHeadLine || "",
    },
  });

  const percentage =
    initialData.cvHeadLine && initialData.cvHeadLine.trim() !== ""
      ? 0
      : profilePercentage;

  const { isSubmitting, isValid, errors } = form.formState;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(`/api/job-seeker/profile/${profileId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          profilePercentage: percentage,
        }),
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
          description: "Profile updated successfuly.",
          className: "bg-green-500",
        });
        toggleEdit();
        router.refresh();
      }
    } catch (error) {
      console.log(error, errors);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  }

  return (
    <div className="bg-pes-light-blue flex h-full w-full flex-col justify-start rounded-md border p-4">
      <div className="flex items-center justify-between font-medium">
        <div className="mb-4">
          <p>{title}</p>
          <p className="text-sm text-zinc-500">
            Keep it updated for better job opportunities
          </p>
        </div>

        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="mt-2 text-sm">{initialData.cvHeadLine}</p>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="cvHeadLine"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g Certified Nurse"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CVHeadlineForm;
