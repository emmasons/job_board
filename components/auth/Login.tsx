"use client";

import { useForm } from "react-hook-form";
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
import { signIn } from "next-auth/react";
import { ChevronRight, Eye, EyeOff, Info } from "lucide-react";
import Link from "next/link";
import { toast } from "../ui/use-toast";
import { Icon } from "@iconify/react";
import { useState } from "react";

type LoginProps = {
  callbackUrl?: string;
  error?: string;
};

const Login = ({ callbackUrl, error }: LoginProps) => {
  const formSchema = z.object({
    email: z.string().email("Please provide a valid email address"),
    password: z.string().min(1, "Please provide your password"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isSubmitting, isValid, errors } = form.formState;

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const toggleIsPasswordHidden = () =>
    setIsPasswordHidden((current) => !current);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { email, password } = values;
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: callbackUrl ?? "/profile/settings",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || errors,
      });
    }
  }
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <h1 className="my-4 text-2xl font-bold text-secondary">Job Board</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {!!error && (
            <div className="flex items-center gap-4">
              <Info className="h-4 w-4 font-bold text-red-500" />
              <p className="font-bold text-red-500">
                Invalid email password combination
              </p>
            </div>
          )}
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
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            variant="secondary"
            className="bg-[#041631] text-white"
          >
            Login
          </Button>
          <div></div>
        </form>
      </Form>
      <div className="flex flex-col items-start py-4">
        <p className="text-secondary">
          <Link
            href="/auth/send-reset-password-link"
            className="font-semibold text-[#1676f9] hover:text-[#2362ba]"
          >
            Forgot your password?
          </Link>
        </p>

        <p className="mt-4 font-semibold text-secondary">
          Dont have an account? &nbsp;
        </p>
        <Link
          href="/auth/signup/employer"
          className="mb-4 inline-flex w-auto items-center rounded-md bg-slate-200 p-4 text-sky-700 hover:text-sky-500"
        >
          <p>Register as an Employer</p>
          <ChevronRight />
        </Link>

        <Link
          href="/auth/signup/job-seeker"
          className="mb-4 inline-flex w-auto items-center rounded-md bg-slate-200 p-4 text-sky-700 hover:text-sky-500"
        >
          <p>Register as a Job Seeker</p>
          <ChevronRight />
        </Link>
      </div>
      {/* <div className="flex flex-col items-center">
        <p>Or login with your socials</p>
        <div className="flex">
          <Button variant="ghost">
            <Icon
              icon="mdi:google"
              onClick={() => signIn("google")}
              className="h-8 w-8"
            />
          </Button>
          <Button variant="ghost">
            <Icon
              icon="mdi:github"
              onClick={() => signIn("github")}
              className="h-8 w-8"
            />
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default Login;
