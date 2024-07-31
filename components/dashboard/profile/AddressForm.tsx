"use client";

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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Pencil, X } from "lucide-react";
import { useState } from "react";
import { Address } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";
import { ComboProps } from "@/types/db";
import { useCountries } from "use-react-countries";

type FormProps = {
  initialData: Address;
  userId: string;
};

const AddressForm = ({ userId, initialData }: FormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const { toast } = useToast();
  const formSchema = z.object({
    city: z.string().min(2, "City is required."),
    postalCode: z.string().min(2, "Postal code is required."),
    country: z.string().min(2, "Country is required."),

    addressLineOne: z.string().min(2, "Address line one is required."),
    addressLineTwo: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: initialData.city,
      postalCode: initialData.postalCode,
      country: initialData.country,
      addressLineOne: initialData.addressLineOne,
      addressLineTwo: initialData.addressLineTwo || "",
    },
  });

  const { isSubmitting, isValid, errors } = form.formState;

  const { countries } = useCountries();
  const countryList = countries.map((country) => ({
    label: country.name,
    value: country.name,
  }));

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(`/api/users/${userId}/address/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
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
          description: "Address updated successfuly.",
          className: "bg-green-500",
        });
        toggleEdit();
        router.refresh();
      }
    } catch (error: any) {
      console.log(error, errors);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.toString(),
      });
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-start  border bg-blue-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Address
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>
              <X className="mr-2 h-4 w-4" />{" "}
            </>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div>
          <p className="mt-2 text-sm">{initialData.addressLineOne}</p>
          <p className="mt-2 text-sm">{initialData.addressLineTwo}</p>
          <p className="mt-2 text-sm">{initialData.city}</p>
          <p className="mt-2 text-sm">{initialData.postalCode}</p>
          <p className="mt-2 text-sm">{initialData.country}</p>
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="addressLineOne"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Address line one"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLineTwo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address line two</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Address line two"
                      {...field}
                    />
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
                      placeholder="City"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
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

            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Update Address"
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AddressForm;
