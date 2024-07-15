"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, PlusCircle } from "lucide-react";
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
};

const EmploymentDetailsForm = ({
  title,
  profileId,
  designation = "",
  company = "",
  location = "",
  description = "",
  profilePercentage,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [employmentList, setEmploymentList] = useState<EmploymentDetails[]>([]);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function fetchEmployments() {
      try {
        const res = await fetch(`/api/job-seeker/profile/${profileId}/employmentDetails`);
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
      designation: designation,
      company: company,
      location: location,
      currentlyWorking: currentlyWorking,
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      description: description,
    },
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const years = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, index) => currentYear - index
  );

  const { isSubmitting, isValid, errors } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(`/api/job-seeker/profile/${profileId}/employmentDetails`, {
        method: "POST",
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
          description: "Profile updated successfully.",
          className: "bg-green-500",
        });
        setEmploymentList([...employmentList, response]);
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
          <p className="text-xl font-semibold font-sans">{title}</p>
          <p className="text-sm py-2 text-zinc-500">
            Outline your professional career to Employers
          </p>
        </div>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? <>Cancel</> : <>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add
          </>}
        </Button>
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
                          setCurrentlyWorking(checked);
                          field.onChange(checked);
                        }}
                      />
                      <span className="ml-3 text-sm">I currently work here</span>
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" ">
              <span className="inline-flex text-sm">Working Since</span>
              <div className="flex flex-wrap space-x-4">
                <FormField
                  control={form.control}
                  name="startMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <select
                          className="bg-white text-slate-600 border rounded-md  p-2 text-sm outline-none"
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
                          className="bg-white text-slate-600 border text-sm rounded-md p-2 outline-none"
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
                {!currentlyWorking && (
                  <div className="flex space-x-4">
                    <span className="text-sm pt-2">to</span>
                    <FormField
                      control={form.control}
                      name="endMonth"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <select
                              className="bg-white text-slate-600 border text-sm rounded-md p-2 outline-none"
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
                              className="bg-white text-slate-600 border text-sm rounded-md p-2 outline-none"
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
              </div>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label className="flex flex-col text-sm">
                      Job Profile
                      <textarea
                        disabled={isSubmitting}
                        placeholder="Share your roles, responsibilities etc..."
                        {...field}
                        className="border rounded-md outline-none p-2"
                      />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
      )}
      {employmentList && (
        <div className="mt-4">
          {employmentList.map((employment) => (
            <div key={employment.id} className="mb-4 p-4 border rounded-md">
              <h3 className="font-semibold">{employment.designation}</h3>
              <p className="text-sm text-gray-600">{employment.company}</p>
              <p className="text-sm text-gray-600">{employment.location}</p>
              <p className="text-sm text-gray-600">{employment.startMonth} {employment.startYear} - {employment.currentlyWorking ? "Present" : `${employment.endMonth} ${employment.endYear}`}</p>
              <p className="text-sm">{employment.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmploymentDetailsForm;
