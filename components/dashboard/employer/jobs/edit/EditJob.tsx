"use client";

import * as z from "zod";
import { useCountries } from "use-react-countries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Combobox } from "@/components/ui/combobox";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ComboProps } from "@/types/db";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2, Pencil } from "lucide-react";
import RichTextEditor from "@/components/ckeditor/RichTextEditor";
import { JOBTYPE } from "@prisma/client";
import { useState } from "react";

interface EditJobFormProps {
  initialData: {
    title: string;
    description: string;
    city: string;
    workSchedule: string;
    country: string;
    startDate: Date;
    occupation: string;
    educationLevelId: string;
    contractType: string;
    numberOfPositions: string;
    experienceId: string;
    sectorId: string;
    salary: string;
  };
  sectorList: ComboProps;
  contractTypeList: ComboProps;
  workScheduleList: ComboProps;
  educationLevelList: ComboProps;
  experienceList: ComboProps;
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
  workSchedule: z.string().min(1, {
    message: "Work schedule is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),

  startDate: z.coerce.date(),
  occupation: z.string().min(1, {
    message: "Occupation is required",
  }),
  educationLevelId: z.string().min(1, {
    message: "Education level is required",
  }),
  contractType: z.string().min(1, {
    message: "Contract type is required",
  }),
  numberOfPositions: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  experienceId: z.string().min(1, {
    message: "Experience is required",
  }),
  sectorId: z.string().min(1, {
    message: "Sector is required",
  }),
  salary: z.string().min(1, {
    message: "Salary is required",
  }),
  jobType: z.string().min(1, {
    message: "Job type is required",
  }),
});

const jobTypes = Object.values(JOBTYPE).map((type) => ({
  value: type,
  label: type,
}));

export default function EditJobForm({
  initialData,
  sectorList,
  contractTypeList,
  workScheduleList,
  educationLevelList,
  experienceList,
}: EditJobFormProps) {
  const router = useRouter();
  const { countries } = useCountries();
  const countryList = countries.map((country) => ({
    label: country.name,
    value: country.name,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid, errors } = form.formState;

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`/api/jobs/${initialData.id}/`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Job Saved",
          variant: "default",
          className: "bg-green-300 border-0",
        });
        router.refresh();
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
      <div className="inline-flex items-center justify-between bg-white font-medium">
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Job
            </>
          )}
        </Button>
      </div>
      {isEditing && (
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
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Occupation: e.g. 'Sales'"
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
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. '$2500/month'"
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
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
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
                name="city"
                render={({ field }) => (
                  <FormItem>
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
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Job</FormLabel>
                    <FormControl>
                      <Combobox options={jobTypes} {...field} />
                    </FormControl>
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
                      <Combobox options={countryList} {...field} />
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
                name="contractType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract Type</FormLabel>
                    <FormControl>
                      <Combobox options={contractTypeList} {...field} />
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
              <div className="flex items-center gap-x-2">
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}