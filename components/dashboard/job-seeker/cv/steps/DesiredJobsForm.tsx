"use client";

// imports
import { useEffect, useState } from "react";
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
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { DesiredJob } from "@prisma/client";

type DesiredJobProps = {
  title: string;
  profileId: string;
  profilePercentage: Number;
  initialData: {
    designation: string | null | undefined;
    location: string | null | undefined;
    industry: string | null | undefined;
    description: string | null;
  };

  isJobSeekerComponent: Boolean;
};

const DesiredJobsForm = ({
  title,
  profileId,
  profilePercentage,
  initialData,
  isJobSeekerComponent = true,
}: DesiredJobProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const { toast } = useToast();

  const formSchema = z.object({
    designation: z.string().min(2, "Tell us your preferred designation."),
    location: z.string().min(2, "Tell us your preferred work location."),
    industry: z.string().min(2, "Tell us your preferred industry."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      designation: initialData?.designation || "",
      location: initialData?.location || "",
      industry: initialData?.industry || "",
    },
  });

  console.log("Initial Data", initialData)
  const percentage =
    initialData?.designation && initialData?.designation.trim() !== ""
      ? 0
      : profilePercentage;

  const { isSubmitting, isValid, errors } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(
        `/api/job-seeker/profile/${profileId}/desiredJob`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values, 
            profilePercentage: percentage,
          }),     
        },
      );
      //  console.log(values);
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
          description: "Profile updated successfully.",
          className: "bg-green-500",
        });
        toggleEdit();
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between py-4">
        <div className="">
          <p className="font-sans text-xl font-semibold">{title}</p>
          <p className="py-2 text-sm text-zinc-500">
            Outline your professional career to Employers
          </p>
        </div>
        {isJobSeekerComponent && (
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                Edit <Pencil className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
      {!isEditing && (
        <div className="relative">
          <div className="">
            <span className="flex gap-8">
              <p className="mb-3 min-w-40 text-sm text-slate-500">
                Preferred Designation:
              </p>
              <p className="text-md font-mono capitalize">
                {initialData?.designation}
              </p>
            </span>
            <span className="flex gap-8">
              <p className="mb-3 min-w-40 text-sm text-slate-500">
                Preferred Location:
              </p>
              <p className="text-md font-mono capitalize">
                {initialData?.location}
              </p>
            </span>
            <span className="flex gap-8">
              <p className="mb-3 min-w-40 text-sm text-slate-500">
                Preferred Industry:
              </p>
              <p className="text-md font-mono capitalize">
                {initialData?.industry}
              </p>
            </span>
          </div>
        </div>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 p-6">
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <label className="flex w-80 flex-col gap-2 text-sm">
                        Designation
                        <Input {...field} placeholder="Preferred Designation" />
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <label className="flex w-80 flex-col gap-2 text-sm">
                        Location
                        <Input {...field} placeholder="Preferred Location" />
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <label className="flex w-80 flex-col gap-2 text-sm">
                        Industry
                        <Input {...field} placeholder="Preferred Industry" />
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                {isSubmitting ? (
                  <Button type="submit" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </Button>
                ) : (
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="rounded-full text-xs hover:scale-95"
                  >
                    {isEditing ? "Save" : "Create"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default DesiredJobsForm;
