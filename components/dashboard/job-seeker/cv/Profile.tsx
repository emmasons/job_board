"use client";

import * as z from "zod";
import { useState } from "react";
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
import { Loader2 } from "lucide-react";
import {
  getGulfCountryCurrencyByCurrencyCode,
  gulfCountries,
} from "@/lib/utils";

interface ProfileProps {
  initialData: {
    // country: string | null;
    // occupation: string | null;
    educationLevelId: string | null;
    // course: string | null;
    // college: string | null;
    expectedSalary: string | null;
    currentSalary: string | null;

    // colegeLocation: string | null;
    experienceId: string | null;
    sectorId: string | null;
    id: string | null;
  };
  sectorList: ComboProps;
  educationLevelList: ComboProps;
  experienceList: ComboProps;
  isEditing: boolean;
  profilePercentage: number;
}

const formSchema = z.object({
  // country: z.string().min(1, {
  //   message: "Country is required",
  // }),

  // occupation: z.string().min(1, {
  //   message: "Occupation is required",
  // }),
  educationLevelId: z.string().min(1, {
    message: "Education level is required",
  }),
  expectedSalary: z.string().min(1, {
    message: "Salary expections required",
  }),
  currentSalary: z.string().min(1, {
    message: "current Salary required",
  }),
  currency: z.string().min(1, {
    message: "Currency is required",
  }),
  // course: z.string().optional(),
  // college: z.string().optional(),
  // colegeLocation: z.string().optional(),
  experienceId: z.string().min(1, {
    message: "Experience is required",
  }),
  sectorId: z.string().min(1, {
    message: "Sector is required",
  }),
});

export default function Profile({
  initialData,
  sectorList,
  educationLevelList,
  experienceList,
  isEditing,
  profilePercentage,
}: ProfileProps) {
  const router = useRouter();
  // const { countries } = useCountries();
  // const countryList = countries.map((country) => ({
  //   label: country.name,
  //   value: country.name,
  // }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const percentage =
    initialData.currentSalary && initialData.currentSalary.trim() !== ""
      ? 0
      : profilePercentage;

  const { isSubmitting, isValid, errors } = form.formState;
  const [loading, setLoading] = useState(false);
  const currencyList = gulfCountries.map((country) => ({
    label: `${getGulfCountryCurrencyByCurrencyCode(country)}(${country})`,
    value: getGulfCountryCurrencyByCurrencyCode(country),
  }));

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      let response: any;
      if (isEditing) {
        response = await fetch(`/api/job-seeker/profile/${initialData.id}/`, {
          method: "PATCH",
          body: JSON.stringify({ ...values, profilePercentage: percentage }),
        });
      } else {
        response = await fetch("/api/job-seeker/profile/", {
          method: "POST",
          body: JSON.stringify(values),
        });
      }

      const data = await response.json();
      const toastMessage = isEditing ? "Profile Updated" : "Profile Created";
      if (response.ok) {
        toast({
          title: "Success",
          description: toastMessage,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 rounded-md border p-4">
      <div className="flex items-center justify-between font-medium ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 w-full space-y-4"
          >
            {/* experience */}
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

            {/* industry */}
            {/* <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Add the department you worked in"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* salary */}
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="expectedSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Salary</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="What is your salary expectation"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Salary</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="What is your current salary"
                        {...field}
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
            </div>

            {/* sector */}
            <FormField
              control={form.control}
              name="sectorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Combobox options={sectorList} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Education details */}
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

            {/* <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter the name of the course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* <FormField
              control={form.control}
              name="college"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter the name of college you attended"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* <FormField
              control={form.control}
              name="colegeLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College Location</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter the college location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <div className="flex items-center gap-x-2">
              {loading ? (
                <Button type="submit" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </Button>
              ) : (
                <Button disabled={isSubmitting} type="submit">
                  {isEditing ? "Update" : "Create"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
