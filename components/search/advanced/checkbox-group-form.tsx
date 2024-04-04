"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState, useCallback } from "react";
import qs from "query-string";

export type Item = {
  id: string;
  label: string;
};

type Props = {
  items: {
    label: string;
    id: string;
  }[];
  defaultValues: string[];
  searchParamLabel: string;
};

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function CheckboxGroupForm({
  items,
  defaultValues,
  searchParamLabel,
}: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: defaultValues,
    },
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const title = searchParams.get("title");
  const location = searchParams.get("location");
  const workSchedule = searchParams.get("workSchedule");
  const countriesFilter = searchParams.get("countriesFilter");

  const formValues = form.watch();

  useEffect(() => {
    const selectedItemsSequence = formValues.items.join(",");
    console.log(
      workSchedule,
      "workSchedule",
      countriesFilter,
      "countriesFilter",
    );
    let query = {
      title: title,
      location: location,
      workSchedule: workSchedule,
      countriesFilter: countriesFilter,
    };

    query[searchParamLabel] = selectedItemsSequence;

    const searchParamsObject = Object.entries(query).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: searchParamsObject,
      },
      { skipEmptyString: true, skipNull: true },
    );

    if (selectedItemsSequence) router.push(url);
  }, [
    countriesFilter,
    formValues.items,
    location,
    pathname,
    router,
    searchParamLabel,
    title,
    workSchedule,
  ]);

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
