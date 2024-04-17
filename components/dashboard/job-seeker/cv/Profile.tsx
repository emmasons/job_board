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

interface ProfileProps {
  initialData: {
    country: string;
    occupation: string;
    educationLevelId: string;
    experienceId: string;
    sectorId: string;
  };
  sectorList: ComboProps;
  educationLevelList: ComboProps;
  experienceList: ComboProps;
}

const formSchema = z.object({
  country: z.string().min(1, {
    message: "Country is required",
  }),

  occupation: z.string().min(1, {
    message: "Occupation is required",
  }),
  educationLevelId: z.string().min(1, {
    message: "Education level is required",
  }),

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
}: ProfileProps) {
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/job-seeker/profile/", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Job Created",
          variant: "default",
          className: "bg-green-300 border-0",
        });
        router.push("/profile/dashboard/job-seeker/cv");
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
      <div className="flex items-center justify-between font-medium ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 w-2/3 space-y-4"
          >
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
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
