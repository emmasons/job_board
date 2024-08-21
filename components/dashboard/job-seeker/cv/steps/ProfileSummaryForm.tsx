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
  profileId: string;
  profilePercentage: number;
  initialData: {
    profileSummary: string | null;
  };
  isJobSeekerComponent: Boolean;
};

const ProfileSummaryForm = ({
  title,
  profileId,
  profilePercentage,
  initialData,
  isJobSeekerComponent = true,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const { toast } = useToast();
  const formSchema = z.object({
    profileSummary: z.string().min(2, "Add a profile summary"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileSummary: initialData.profileSummary || "",
    },
  });

  const percentage =
    initialData.profileSummary && initialData.profileSummary.trim() !== ""
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
      console.log(response);
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
          {isJobSeekerComponent && (
            <p className="text-sm text-zinc-500">
              Outline the key highlights of your professional career to
              Employers
            </p>
          )}
        </div>

        {isJobSeekerComponent && (
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
        )}
      </div>
      {!isEditing && (
        <p className="mt-2 text-sm">{initialData.profileSummary}</p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="profileSummary"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label className="text-sm">
                      Description
                      <textarea
                        disabled={isSubmitting}
                        placeholder="Talk about yourself, roles, responsibilities, achievements etc..."
                        className="mt-1 w-full rounded-md border p-2 outline-none"
                        rows={4}
                        {...field}
                      />
                    </label>
                    {/* <Input
                      disabled={isSubmitting}
                      placeholder="Talk about yourself, roles, responsibilities, achievements etc..."
                      {...field}
                    /> */}
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

export default ProfileSummaryForm;
