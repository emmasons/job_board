"use client";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Pencil, PlusCircle, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmploymentDetails } from "@prisma/client";

type Props = {
  title: string;
  profileId: string;
  initialData: EmploymentDetails;
  profilePercentage: number;

  isJobSeekerComponent: Boolean;
};

const EmploymentDetailsForm = ({
  title,
  profileId,
  initialData,
  profilePercentage,
  isJobSeekerComponent = true,
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
    description: z.string().min(2, "Description is required"),
    startMonth: z.string().nonempty("Start month is required"),
    startYear: z.string().nonempty("Start year is required"),
    endMonth: z.string().optional(),
    endYear: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      designation: initialData.designation || "",
      company: initialData.company || "",
      location: initialData.location || "",
      currentlyWorking: false,
      startMonth: initialData.startMonth,
      startYear: initialData.startYear,
      endMonth: initialData.startMonth,
      endYear: initialData.endMonth || "",
      description: initialData.description || "",
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
    { length: currentYear - 1990 + 1 },
    (_, index) => currentYear - index,
  );

  // const percentage = employmentList.length > 0 ? 0 : profilePercentage;

  const { isSubmitting, isValid, errors } = form.formState;

  const url = `/api/job-seeker/profile/${profileId}/employmentDetails/${initialData.id}`;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // const url = `/api/job-seeker/profile/${profileId}/employmentDetails/${initialData.id}`;
    // `/api/job-seeker/profile/${profileId}/employmentDetails`;
    console.log(profileId);
    try {
      const requestBody = {
        ...values,
        // profilePercentage: percentage,
      };

      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
          description: "Employment details saved successfully.",
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

  async function deleteEmploymentDetails() {
    // `/api/job-seeker/profile/${profileId}/employmentDetails`;

    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete employment details");
      } else {
        toast({
          variant: "default",
          title: "Success",
          description: "Employment details deleted successfully.",
          className: "bg-green-500",
        });

        toggleEdit();

        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }
  // Function to calculate total months between two dates and format as "x Years, y Months"
  const calculateTotalMonths = (
    startDate: string,
    endDate: string | null,
    currentlyWorking: boolean,
  ): string => {
    const start = new Date(startDate);
    let end: Date;

    if (currentlyWorking) {
      end = new Date(); // Use current date if employment is ongoing
    } else {
      end = new Date(endDate!); // Convert endDate to Date object if it exists
    }

    // Calculate differences in years and months
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    // Adjust years and months if months difference is negative
    if (months < 0) {
      years--;
      months += 12;
    }

    // Format the result
    let result = "";
    if (years > 0) {
      result += `${years} ${years === 1 ? "Year" : "Years"}`;
      if (months > 0) {
        result += `, ${months} ${months === 1 ? "Month" : "Months"}`;
      }
    } else {
      result += `${months} ${months === 1 ? "Month" : "Months"}`;
    }

    return result;
  };

  return (
    <div className="bg-pes-light-blue flex h-full w-full flex-col justify-start rounded-md border p-4">
      <div className="flex items-center justify-between font-medium">
        <div className="mb-4">
          <p className="text-lg capitalize">
            {initialData.company}: {initialData.designation}
          </p>
          {/* {isJobSeekerComponent && (
            <p className="py-2 text-sm text-zinc-500">
              Outline your professional career to Employers
            </p>
          )} */}
        </div>
      </div>
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label className="text-sm">
                      Designation
                      <Input
                        disabled={isSubmitting}
                        placeholder="Tell us your designation / job role"
                        {...field}
                      />
                    </label>
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
                    <label className="text-sm">
                      Company
                      <Input
                        disabled={isSubmitting}
                        placeholder="Tell us your company name"
                        {...field}
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
                    <label className="text-sm">
                      Employer Location
                      <Input
                        disabled={isSubmitting}
                        placeholder="Tell us your employer location"
                        {...field}
                      />
                    </label>
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
                    <label className="text-sm">
                      <Checkbox
                        disabled={isSubmitting}
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          const isChecked = Boolean(checked);
                          field.onChange(isChecked);
                          setCurrentlyWorking(isChecked);
                        }}
                      />
                      <span className="ml-2">I currently work here</span>
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap gap-4 text-slate-400">
              <FormField
                control={form.control}
                name="startMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <label className="text-sm">
                        <select
                          disabled={isSubmitting}
                          className="mt-1 w-32 rounded-md border bg-white p-2 outline-none"
                          {...field}
                        >
                          <option value="">Select Month</option>
                          {months.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </label>
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
                      <label className="text-sm">
                        <select
                          disabled={isSubmitting}
                          className="mt-1 w-32 rounded-md border bg-white p-2 outline-none"
                          {...field}
                        >
                          <option value="">Select Year</option>
                          {years.map((year) => (
                            <option key={year} value={year.toString()}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!currentlyWorking && (
                <>
                  <span className="pt-3 text-sm">to</span>
                  <FormField
                    control={form.control}
                    name="endMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <label className="text-sm">
                            <select
                              disabled={isSubmitting}
                              className="mt-1 w-32 rounded-md border bg-white p-2 outline-none"
                              {...field}
                            >
                              <option value="">Select Month</option>
                              {months.map((month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              ))}
                            </select>
                          </label>
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
                          <label className="text-sm">
                            <select
                              disabled={isSubmitting}
                              className="mt-1 w-32 rounded-md border bg-white p-2 outline-none"
                              {...field}
                            >
                              <option value="">Select Year</option>
                              {years.map((year) => (
                                <option key={year} value={year.toString()}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label className="text-sm">
                      Description
                      <textarea
                        disabled={isSubmitting}
                        placeholder="Tell us more about your job role"
                        className="mt-1 w-full rounded-md border p-2 outline-none"
                        rows={4}
                        {...field}
                      />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-5">
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="rounded-3xl"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Update Details"
                )}
              </Button>
              {isEditing && (
                <Button variant="ghost" onClick={deleteEmploymentDetails}>
                  Remove this Employment
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
      <div className="my-4">
        {/* <p className="mb-4 text-lg ">Employment History</p> */}

        <div
          key={initialData.jobSeekerProfileId}
          className="mb-2 flex justify-between  "
        >
          <div className="flex flex-wrap items-center gap-6">
            <div className="rounded-full bg-blue-50 p-4 ">
              <Briefcase className="h-6 " />
            </div>

            <div>
              <p className="font-medium">{initialData.designation}</p>
              <span className="flex gap-2">
                <p className="text-sm text-zinc-700">{initialData.company},</p>
                <p className="text-sm text-zinc-700">{initialData.location}</p>
              </span>
              <p className="text-sm text-gray-600">
                {initialData.startMonth} {initialData.startYear} -{" "}
                {initialData.currentlyWorking
                  ? "Present"
                  : `${initialData.endMonth} ${initialData.endYear}`}{" "}
                (
                {calculateTotalMonths(
                  `${initialData.startMonth} 1, ${initialData.startYear}`,
                  initialData.currentlyWorking
                    ? null
                    : `${initialData.endMonth} 1, ${initialData.endYear}`,
                  initialData.currentlyWorking,
                )}
                )
              </p>
              <p className="pt-4 text-sm text-zinc-700">
                {/* {employment.description} */}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            {!isJobSeekerComponent && (
              <Button onClick={toggleEdit} variant="ghost">
                {isEditing ? (
                  "Cancel"
                ) : (
                  <>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploymentDetailsForm;
