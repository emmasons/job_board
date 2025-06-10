"use client";

import * as z from "zod";
import { useState } from "react";
import { useCountries } from "use-react-countries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Combobox } from "@/components/ui/combobox";
import { Combobox2 } from "@/components/ui/combobox2";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ComboProps } from "@/types/db";
import { format } from "date-fns";
import {
  cn,
  getGulfCountryCurrencyByCurrencyCode,
  allCountries,
} from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import RichTextEditor from "@/components/ckeditor/RichTextEditor";
import { JOBTYPE, PREFERRED_APPLICANT_GENDER } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";


interface CreateJobFormProps {
  initialData: {
    title: string;
    description: string;
    city: string;
    workSchedule: string;
    country: string;
    startDate: any;
    educationLevelId: string;
    numberOfPositions: number;
    experienceId: string;
    sectorId: string;
    salary: string;
    companyName2: string;
    companyEmail2: string;
    howToApply2: string;
    preferredApplicantGender: PREFERRED_APPLICANT_GENDER;
    id?: string;
    isExternal: boolean;
    externalLink: string;
  };
  sectorList: ComboProps;
  workScheduleList: ComboProps;
  educationLevelList: ComboProps;
  experienceList: ComboProps;
  isEditingJob: boolean;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  city: z.string().min(1, {
    message: "City is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),

  startDate: z.preprocess(
    (val) => (val ? new Date(val) : null),
    z.union([z.date(), z.literal(null)])
  ),
  educationLevelId: z.string().min(1, {
    message: "Education level is required",
  }),
  numberOfPositions: z.preprocess((val) => Number(val), z.number()),
  experienceId: z.string().min(1, {
    message: "Experience is required",
  }),
  sectorId: z.string().min(1, {
    message: "Sector is required",
  }),
  workSchedule: z.string().min(1, {
    message: "Work schedule is required",
  }),
  salary: z.string().min(1, {
    message: "Salary is required",
  }),
  currency: z.string().min(1, {
    message: "Currency is required",
  }),
  salaryPeriod: z.string().optional(),
  preferredApplicantGender: z.string().optional(),
  companyName2: z.string().optional(),
  companyEmail2: z.string().optional(),
  howToApply2: z.string().optional(),
  isExternal: z.boolean().optional(),
  externalLink: z.string().optional(),
});


export default function CreateJobForm({
  initialData,
  sectorList,
  workScheduleList,
  educationLevelList,
  experienceList,
  isEditingJob = false,
}: CreateJobFormProps) {
  const router = useRouter();

  
  const { countries } = useCountries();

  const countryList = countries
    .map((country) => ({
      label: country.name,
      value: country.name,
    }));

  const currencyList = allCountries.map((country) => ({
    label: `${getGulfCountryCurrencyByCurrencyCode(country)}(${country})`,
    value: getGulfCountryCurrencyByCurrencyCode(country),
  }));

  const periodList = [
    {
      value: "Hour",
      label: "Per hour",
    },
    {
      value: "Week",
      label: "Per week",
    },
    {
      value: "Month",
      label: "Per month",
    },
    {
      value: "Year",
      label: "Per year",
    },
  ];

  const preferredApplicantGenderList = Object.values(
    PREFERRED_APPLICANT_GENDER
  ).map((gender) => ({
    value: gender,
    label: gender.toLowerCase().replace("_", " "),
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid, errors } = form.formState;

  const [specifyGender, setSpecifyGender] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const btnText = isEditingJob ? "Save Job" : "Create Job";
  const url = isEditingJob ? `/api/jobs/${initialData.id}` : "/api/jobs";
  const httpMethod = isEditingJob ? "PATCH" : "POST";
  const successMessage = isEditingJob ? "Job Updated" : "Job Created";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(url, {
        method: httpMethod,
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: successMessage,
          variant: "default",
          className: "bg-green-300 border-0",
        });
        router.push(`/profile/dashboard/employer/jobs/${data.id}`);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message,
        });
      }

      router.refresh();
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong!",
      });
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 w-2/3 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Job Title: e.g. 'Sales Representative'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <RichTextEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfPositions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Positions</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. '3'"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="gap-4 md:flex">
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'USD 2500'"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Combobox options={currencyList} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salaryPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Period</FormLabel>
                    <FormControl>
                      <Combobox options={periodList} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date (optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Combobox2 options={countryList} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="City: e.g. 'Melbourne'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sectorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector</FormLabel>
                  <FormControl>
                    <Combobox options={sectorList} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workSchedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Schedule</FormLabel>
                  <FormControl>
                    <Combobox options={workScheduleList} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="educationLevelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Level</FormLabel>
                  <FormControl>
                    <Combobox options={educationLevelList} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Combobox options={experienceList} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mb-4">
              <p className="text-base font-medium">Is this a premium job?</p>
              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsPremium(true)}
                  className={`px-4 py-1 rounded border ${isPremium ? 'bg-primary/70 text-white' : 'bg-white'}`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setIsPremium(false)}
                  className={`px-4 py-1 rounded border ${!isPremium ? 'bg-primary/70 text-white' : 'bg-white'}`}
                >
                  No
                </button>
              </div>
            </div>
            {isPremium && (
              <>
                <FormField
                  control={form.control}
                  name="companyName2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyEmail2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter company email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="howToApply2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How to Apply Instructions</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Send your CV to hr@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}


            <div className="mb-4">
              <p className="text-base font-medium">Do you want to specify a preferred gender?</p>
              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setSpecifyGender(true)}
                  className={`px-4 py-1 rounded border ${specifyGender ? 'bg-primary/70 text-white' : 'bg-white'}`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setSpecifyGender(false)}
                  className={`px-4 py-1 rounded border ${!specifyGender ? 'bg-primary/70 text-white' : 'bg-white'}`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Hidden field to keep value as 'ALL' when not specifying */}
            {!specifyGender && (
              <input type="hidden" {...form.register("preferredApplicantGender")} value="ALL" />
            )}

            {/* Show the field only if user chose to specify */}
            {specifyGender && (
              <FormField
                control={form.control}
                name="preferredApplicantGender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Gender</FormLabel>
                    <FormControl>
                      <Combobox options={preferredApplicantGenderList} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="isExternal"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check this box if you want this job to be applied
                      externally.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {form.watch("isExternal") && (
              <FormField
                control={form.control}
                name="externalLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>External Link</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'https://example.com'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex items-center gap-x-2">
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <span>{btnText}</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
