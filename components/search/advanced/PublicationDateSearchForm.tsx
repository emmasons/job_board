"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
interface PublicationDateSearchFormProps {
  publicationDate: string;
  dataHandler: (data: z.infer<typeof formSchema>) => void;
}

const formSchema = z.object({
  publicationDate: z.string(),
});

const publicationDates = [
  {
    value: "1",
    label: "Within 24 hours",
  },
  {
    value: "7",
    label: "Within 7 days",
  },
  {
    value: "30",
    label: "Within 30 days",
  },
];

export default function PublicationDateSearchForm({
  publicationDate,
  dataHandler,
}: PublicationDateSearchFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      publicationDate: publicationDate,
    },
  });

  const { isSubmitting, isValid } = form.formState;
  form.watch((newValues) => {
    dataHandler(newValues);
  });

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <Form {...form}>
        <form className="mt-4 space-y-4">
          <FormField
            control={form.control}
            name="publicationDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Combobox
                    options={publicationDates}
                    {...field}
                    defaultText="Select a time frame"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
