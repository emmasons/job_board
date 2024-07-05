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
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox component
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";

type Props = {
  title: string;
  designation: string;
  company: string;
  location: string;
  description: string;
  profileId: string;
  profilePercentage: number;
  initialData: {
    employmentDetails: {
      id: string;
      designation: string | null;
      company: string | null;
      location: string | null;
      description: string | null;
      currentlyWorking: boolean;
      startMonth: string;
      startYear: string;
      endMonth: string | null;
      endYear: string | null;
      jobSeekerProfileId: string;
    } | null;
    };
};

const EmploymentDetailsForm = ({
  title,
  profileId,
  designation,
  company,
  location,
  description,
  profilePercentage,
  initialData,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  const formSchema = z.object({
    designation: z.string().min(2, "Designation is required"),
    company: z.string().min(2, "Company name is required"),
    location: z.string().min(2, "Location is required"),
    currentlyWorking: z.boolean().optional(),
    startMonth: z.string().nonempty("Start month is required"),
    startYear: z.string().nonempty("Start year is required"),
    endMonth: z.string().optional(),
    endYear: z.string().optional(),
    jobProfile: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      designation: designation || "",
      company: company || "",
      location: location || "",
      currentlyWorking: currentlyWorking,
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      jobProfile: description || "",
    },
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, index) => 1900 + index
  );

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
          profilePercentage:
            values.designation && values.designation.trim() !== "" ? 100 : profilePercentage,
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
          description: "Profile updated successfully.",
          className: "bg-green-500",
        });
        toggleEdit();
        router.refresh();
      }
    } catch (error) {
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
            Outline your professional career to Employers
          </p>
        </div>

        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? <>Cancel</> : <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </>}
        </Button>
      </div>
      {!isEditing && <p className="mt-2 text-sm">{initialData.employmentDetails}</p>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Tell us your designation / job role"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Tell us your company name"
                      {...field}
                    />
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
                    <Input
                      disabled={isSubmitting}
                      placeholder="Tell us your employer location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentlyWorking"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      disabled={isSubmitting}
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        setCurrentlyWorking(checked);
                        field.onChange(checked);
                      }}
                      label="I currently work here"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="startMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <select
                        disabled={isSubmitting}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <option value="">Select Month</option>
                        {months.map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startYear"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <select
                        disabled={isSubmitting}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <option value="">Select Year</option>
                        {years.map((year, index) => (
                          <option key={index} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {!currentlyWorking && (
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="endMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <select
                          disabled={isSubmitting}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value="">Select Month</option>
                          {months.map((month, index) => (
                            <option key={index} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <select
                          disabled={isSubmitting}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value="">Select Year</option>
                          {years.map((year, index) => (
                            <option key={index} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      disabled={isSubmitting}
                      placeholder="Provide a description of your job profile"
                      {...field}
                      className="form-textarea"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default EmploymentDetailsForm;
