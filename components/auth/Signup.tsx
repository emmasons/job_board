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
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

const Signup = () => {
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
    },
  });

  const { isSubmitting, errors } = form.formState;

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const toggleIsPasswordHidden = () =>
    setIsPasswordHidden((current) => !current);

  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const toggleIsConfirmPasswordHidden = () =>
    setIsConfirmPasswordHidden((current) => !current);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/users/", {
        method: "POST",
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
        router.push(`/auth/email-verification-sent?t=${response.userId}`);
      }
    } catch (error) {
      console.log(error, errors);
    }
  }
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <h1 className="my-4 text-2xl font-bold text-secondary">Sasakazi</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary">Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="e.g xyz@gmail.com" {...field} />
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
    </div>
  );
};

export default Signup;
