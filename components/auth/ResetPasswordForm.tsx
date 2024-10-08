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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

type FormProps = {
  email: string;
};

const ResetPasswordForm = ({ email }: FormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const formSchema = z.object({
    password: z
      .string()
      .min(8, "Password must have a minimum of 8 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).*$/,
        "Password must have a combination of lowercase and uppercase letters, a special character and at least one number.",
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must have a minimum of 8 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).*$/,
        "Password must have a combination of lowercase and uppercase letters, a special character and at least one number.",
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting, isValid, errors } = form.formState;
  const [isPasswordOneHidden, setIsPasswordOneHidden] = useState(true);
  const [isPasswordTwoHidden, setIsPasswordTwoHidden] = useState(true);

  const toggleIsPasswordOneHidden = () =>
    setIsPasswordOneHidden((current) => !current);
  const toggleIsPasswordTwoHidden = () =>
    setIsPasswordTwoHidden((current) => !current);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { password, confirmPassword } = values;
    if (confirmPassword !== password) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      const data = { email, password };
      try {
        const res = await fetch("/api/users/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const response = await res.json();
        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Error",
            description: response.message,
          });
        } else {
          router.push("/profile/settings/");
        }
      } catch (error) {
        console.log(error, errors);
      }
    }
  }
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <h1 className="my-4 text-2xl font-bold text-secondary">
        Reset Your Password
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      type={isPasswordOneHidden ? "password" : "text"}
                    />
                    {isPasswordOneHidden ? (
                      <EyeOff
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={toggleIsPasswordOneHidden}
                      />
                    ) : (
                      <Eye
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={toggleIsPasswordOneHidden}
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
                <FormLabel className="text-secondary">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={isPasswordTwoHidden ? "password" : "text"}
                    />
                    {isPasswordTwoHidden ? (
                      <EyeOff
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={toggleIsPasswordTwoHidden}
                      />
                    ) : (
                      <Eye
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={toggleIsPasswordTwoHidden}
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
              "Reset Password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
