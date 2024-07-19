"use client";

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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Pencil, PlusCircle, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmploymentDetails } from "@prisma/client";

type Props = {
  title: string;
  profileId: string;
  designation?: string;
  company?: string;
  location?: string;
  description?: string;
  profilePercentage: number;
  isJobSeekerComponent: Boolean;
};

const EmploymentDetailsForm = ({
  title,
  profileId,
  designation,
  company,
  location,
  description,
  profilePercentage,
  isJobSeekerComponent = true,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<EmploymentDetails | null>(
    null,
  );
  const [employmentList, setEmploymentList] = useState<EmploymentDetails[]>([]);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function fetchEmployments() {
      try {
        const res = await fetch(
          `/api/job-seeker/profile/${profileId}/employmentDetails`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch employment details");
        }
        const data = await res.json();
        setEmploymentList(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    }

    fetchEmployments();
  }, [profileId, toast]);

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
      designation: "",
      company: "",
      location: "",
      currentlyWorking: false,
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      description: "",
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

  const { isSubmitting, isValid, errors } = form.formState;

  const handleEdit = (employment: EmploymentDetails) => {
    setEditingItem(employment);
    form.reset({
      designation: employment.designation || "",
      company: employment.company || "",
      location: employment.location || "",
      currentlyWorking: employment.currentlyWorking,
      startMonth: employment.startMonth,
      startYear: employment.startYear,
      endMonth: employment.endMonth || "",
      endYear: employment.endYear || "",
      description: employment.description || "",
    });
    setCurrentlyWorking(employment.currentlyWorking);
    setIsEditing(true);
  };

  const handleDelete = async (employmentId: string) => {
    try {
      const res = await fetch(
        `/api/job-seeker/profile/${profileId}/employmentDetails/${employmentId}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        const response = await res.json();
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      } else {
        toast({
          variant: "default",
          title: "Success",
          description: "Employment detail deleted successfully.",
          className: "bg-green-500",
        });
        setEmploymentList((prev) =>
          prev.filter((item) => item.id !== employmentId),
        );
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = editingItem
      ? `/api/job-seeker/profile/${profileId}/employmentDetails/${editingItem.id}`
      : `/api/job-seeker/profile/${profileId}/employmentDetails`;

    const method = editingItem ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
          description: "Employment details saved successfully.",
          className: "bg-green-500",
        });
        if (editingItem) {
          setEmploymentList((prev) =>
            prev.map((item) => (item.id === response.id ? response : item)),
          );
        } else {
          setEmploymentList([...employmentList, response]);
        }
        toggleEdit();
        setEditingItem(null);
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
          <p className="font-sans text-xl font-semibold">{title}</p>
          {isJobSeekerComponent && (
            <p className="py-2 text-sm text-zinc-500">
              Outline your professional career to Employers
            </p>
          )}
        </div>
        {isJobSeekerComponent && (
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              "Cancel"
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add
              </>
            )}
          </Button>
        )}
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
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editingItem ? "Save" : "Add Employment"}
              </Button>
              {editingItem && (
                <Button
                  variant="ghost"
                  onClick={() => handleDelete(editingItem.id)}
                >
                  Remove this Employment
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
      <div className="my-4">
        <p className="mb-4 text-lg font-semibold">Employment History</p>
        {employmentList.length > 0 ? (
          employmentList.map((employment) => (
            <div
              key={employment.id}
              className="mb-2 flex justify-between border-b py-4 "
            >
              <div className="flex items-center gap-6">
                <div className="rounded-full bg-blue-50 p-4 ">
                  <Briefcase className="h-6 " />
                </div>

                <div>
                  <p className="font-medium">{employment.designation}</p>
                  <span className="flex gap-2">
                    <p className="text-sm text-zinc-700">
                      {employment.company},
                    </p>
                    <p className="text-sm text-zinc-700">
                      {employment.location}
                    </p>
                  </span>
                  <p className="text-sm text-gray-600">
                    {employment.startMonth} {employment.startYear} -{" "}
                    {employment.currentlyWorking
                      ? "Present"
                      : `${employment.endMonth} ${employment.endYear}`}{" "}
                    (
                    {calculateTotalMonths(
                      `${employment.startMonth} 1, ${employment.startYear}`,
                      employment.currentlyWorking
                        ? null
                        : `${employment.endMonth} 1, ${employment.endYear}`,
                      employment.currentlyWorking,
                    )}
                    )
                  </p>
                  <p className="pt-4 text-sm text-zinc-700">
                    {employment.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                {isJobSeekerComponent && (
                  <Button
                    variant="ghost"
                    onClick={() => handleEdit(employment)}
                  >
                    Edit
                    <Pencil className="h-3" />
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-500">
            No employment history available.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmploymentDetailsForm;
