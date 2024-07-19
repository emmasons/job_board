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
import { Pencil, PlusCircle } from "lucide-react";
import { DesiredJob } from "@prisma/client";

type DesiredJobProps = {
  title: string;
  profileId: string;
  designation: string;
  location: string;
  industry: string;
  profilePercentage: number;
  description: String | null;
  isJobSeekerComponent: Boolean;
};

const DesiredJobsForm = ({
  title,
  profileId,
  profilePercentage,
  isJobSeekerComponent = true,
}: DesiredJobProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [desiredJob, setDesiredJob] = useState<DesiredJob | null>(null);
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
      designation: "",
      location: "",
      industry: "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `/api/job-seeker/profile/${profileId}/desiredJob`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (res.ok) {
          const data = await res.json();
          if (data) {
            setDesiredJob(data);
            form.reset(data); // Pre-fill the form with the fetched data
          }
        } else {
          console.error("Failed to fetch desired job data");
        }
      } catch (error) {
        console.error("Error fetching desired job data:", error);
      }
    }

    fetchData();
  }, [profileId, form]);

  const toggleEdit = () => setIsEditing((current) => !current);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(
        `/api/job-seeker/profile/${profileId}/desiredJob`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );

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
        setDesiredJob(response);
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
    <div className="space-y-4">
      <div className="flex items-center justify-between p-6">
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
      {!isEditing && desiredJob ? (
        <div className="relative mt-2">
          <div className="p-6">
            <p className="mb-3 text-sm text-slate-500">
              <span className="font-semibold">Preferred Designation:</span>{" "}
              {desiredJob.designation}
            </p>
            <p className="mb-3 text-sm text-slate-500">
              <span className="font-semibold">Preferred Location:</span>{" "}
              {desiredJob.location}
            </p>
            <p className="mb-3 text-sm text-slate-500">
              <span className="font-semibold">Preferred Industry:</span>{" "}
              {desiredJob.industry}
            </p>
          </div>
        </div>
      ) : (
        isEditing && (
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
                          <Input
                            {...field}
                            placeholder="Preferred Designation"
                          />
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
                <Button
                  type="submit"
                  className="rounded-full text-xs hover:scale-95"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )
      )}
    </div>
  );
};

export default DesiredJobsForm;
