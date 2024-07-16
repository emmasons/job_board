"use client"

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
  profile: DesiredJob | null;
  profilePercentage: number;
};

const DesiredJobsForm = ({ title, profileId, profile, profilePercentage }: DesiredJobProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [desiredJob, setDesiredJob] = useState<DesiredJob | null>(profile);

  const toggleEdit = () => setIsEditing((current) => !current);
  const { toast } = useToast();

  const formSchema = z.object({
    designation: z.string().min(2, "Tell us your preferred designation."),
    location: z.string().min(2, "Tell us your preferred work location."),
    industry: z.string().min(2, "Tell us your preferred industry."),
  });

  const form = useForm<DesiredJob>({
    resolver: zodResolver(formSchema),
    defaultValues: desiredJob || {
      designation: "",
      location: "",
      industry: "",
    },
  });

  const onSubmit = (data: DesiredJob) => {
    setDesiredJob(data);
    setIsEditing(false);
    toast({
      description: "Profile updated successfully!",
    });
    // Here you would typically also send the data to your server
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-6">
        <div className="">
          <p className="text-xl font-semibold font-sans">{title}</p>
          <p className="text-sm py-2 text-zinc-500">
            Outline your professional career to Employers
          </p>
        </div>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? <>Cancel</> : desiredJob ? <>Edit <Pencil className="ml-2 h-4 w-4" /></> : <>Add <PlusCircle className="ml-2 h-4 w-4" /></>}
        </Button>
      </div>
      {!isEditing && desiredJob ? (
        <div className="relative mt-2">
          <div className="p-6">
            <p className="mb-3 text-sm text-slate-500">
              <span className="font-semibold">Preferred Designation:</span> {desiredJob.designation}
            </p>
            <p className="mb-3 text-sm text-slate-500">
              <span className="font-semibold">Preferred Location:</span> {desiredJob.location}
            </p>
            <p className="mb-3 text-sm text-slate-500">
              <span className="font-semibold">Preferred Industry:</span> {desiredJob.industry}
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
                      <label className="text-sm flex flex-col gap-2 w-80">
                        Designation
                        <Input {...field} placeholder="Preferred Designation"  />
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
                      <label className="text-sm flex flex-col gap-2 w-80">
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
                      <label className="text-sm flex flex-col gap-2 w-80">
                        Industry
                        <Input {...field} placeholder="Preferred Industry" />
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="rounded-full text-xs hover:scale-95">
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
