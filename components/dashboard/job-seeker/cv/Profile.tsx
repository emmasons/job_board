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

interface ProfileProps {
  initialData: {
    country: string | null;
    occupation: string | null;
    educationLevelId: string | null;
    experienceId: string | null;
    sectorId: string | null;
    id: string | null;
  };
  sectorList: ComboProps;
  educationLevelList: ComboProps;
  experienceList: ComboProps;
  isEditing: boolean;
  percentage: Number;
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
  isEditing,
  percentage,
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
  const [loading, setLoading] = useState(false);

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
