"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { Role } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";
import { ComboProps } from "@/types/db";
import { useCountries } from "use-react-countries";

type Props = {
  role: Role;
  sectorList: ComboProps;
};

const EmployerSignup = ({ role, sectorList }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const formSchema = z
    .object({
      email: z.string().email("Please provide a valid email address"),
      password: z
        .string()
        .min(8, "Password must have a minimum of 8 characters")
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).*$/,
          "Password must have a combination of lowercase and uppercase letters, a special character and at least one number.",
        ),
      confirmPassword: z.string().min(8),
      firstName: z.string().min(1, "Please provide your first name"),
      lastName: z.string().min(1, "Please provide your last name"),
      phoneNumber: z.string().min(2, "Please provide your phone number"),
      city: z.string().min(1, "Please provide your city"),
      country: z.string().min(1, "Please provide your country"),
      postalCode: z.string().min(1, "Please provide your postal code"),
      addressLineOne: z.string().min(1, "Please provide your address line one"),
      addressLineTwo: z.string().optional(),
      companyName: z.string().min(1, "Please provide your company name"),
      sectorId: z.string().min(1, "Please provide your sector"),
      terms: z.boolean().refine((val) => val, {
        message: "You must accept the terms and conditions",
      }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      terms: false,
      country: "",
      city: "",
      postalCode: "",
      addressLineOne: "",
      addressLineTwo: "",
      companyName: "",
      sectorId: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const toggleIsPasswordHidden = () =>
    setIsPasswordHidden((current) => !current);

  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const toggleIsConfirmPasswordHidden = () =>
    setIsConfirmPasswordHidden((current) => !current);
  const { countries } = useCountries();
  const countryList = countries.map((country) => ({
    label: country.name,
    value: country.name,
  }));

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("role", role);
      formData.append("country", values.country);
      formData.append("city", values.city);
      formData.append("postalCode", values.postalCode);
      formData.append("addressLineOne", values.addressLineOne);
      formData.append("addressLineTwo", values.addressLineTwo);
      formData.append("companyName", values.companyName);
      formData.append("sectorId", values.sectorId);

      const res = await fetch("/api/users/", {
        method: "POST",
        body: formData,
      });
      const response = await res.json();
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      } else {
        router.push(`/auth/email-verification-sent?t=${response.userId}`);
      }
    } catch (error) {
      console.log(error, errors);
    }
  }
  return (
    <>
      <h1 className="my-4 text-2xl font-bold text-secondary">
        Register as an Employer
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="gap-4 md:flex">
            <div className="basis-1/2 space-y-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g Jason" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g Bourne" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g +234801234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g xyz@gmail.com" {...field} />
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
                      <Input placeholder="e.g Sharja" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={isPasswordHidden ? "password" : "text"}
                        />
                        {isPasswordHidden ? (
                          <EyeOff
                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={toggleIsPasswordHidden}
                          />
                        ) : (
                          <Eye
                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={toggleIsPasswordHidden}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={isConfirmPasswordHidden ? "password" : "text"}
                        />
                        {isConfirmPasswordHidden ? (
                          <EyeOff
                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={toggleIsConfirmPasswordHidden}
                          />
                        ) : (
                          <Eye
                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={toggleIsConfirmPasswordHidden}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="basis-1/2 space-y-2">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                name="addressLineOne"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line One</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Address Line Two</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
            </div>
          </div>
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Terms and conditions</FormLabel>
                  <FormDescription>
                    I agree to the
                    <Link
                      href="/terms"
                      className="font-semibold text-primary hover:text-secondary"
                    >
                      {" "}
                      terms{" "}
                    </Link>
                    and
                    <Link
                      href="/privacy"
                      className="font-semibold text-primary hover:text-secondary"
                    >
                      {" "}
                      privacy policy.
                    </Link>
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} variant="secondary">
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Signup"
            )}
          </Button>
        </form>
      </Form>
      <div className="py-4">
        <p className="text-secondary">
          If you already have an account{" "}
          <Link
            href="/auth/signin"
            className="font-semibold text-blue-700 hover:text-blue-500"
          >
            click here
          </Link>
          &nbsp;to sign in
        </p>
      </div>
    </>
  );
};

export default EmployerSignup;
