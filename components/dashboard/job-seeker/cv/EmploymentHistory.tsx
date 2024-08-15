import { EmploymentDetails } from "@prisma/client";
import React, { useState } from "react";
import EmploymentDetailsForm from "./steps/EmploymentDetailsForm";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  profileId: string;
  employmentHistory: EmploymentDetails[];
  isJobSeekerComponent: Boolean;
};

const EmploymentHistory = ({
  profileId,
  employmentHistory,
  isJobSeekerComponent = true,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
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

  const { isSubmitting, isValid, errors } = form.formState;
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const router = useRouter();
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
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, index) => currentYear - index,
  );
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = `/api/job-seeker/profile/${profileId}/employmentDetails`;
    // console.log("Profile ID:", profileId);

    try {
      const requestBody = {
        ...values,
        profilePercentage: 20,
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const response = await res.json();
      // console.log(response);
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
  return (
    <div className="p-7">
      <div className="flex items-center justify-between font-medium">
        Add History
        {isJobSeekerComponent && (
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add
              </>
            )}
          </Button>
        )}
      </div>
      {!isEditing ? (
        <div>
          {employmentHistory.map((history) => (
            <div key={history.id}>
              <EmploymentDetailsForm
                title="Employment Details"
                profileId={history.jobSeekerProfileId}
                profilePercentage={20}
                initialData={history}
                isJobSeekerComponent={isJobSeekerComponent}
              />
              
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>Fill the required fields</p>
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
                    "Add Employment"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default EmploymentHistory;
