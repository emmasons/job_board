"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CreateCompanyFormProps {
  initialData: {
    companyName: string;
    companyEmail: string;
  };
}

const formSchema = z.object({
  companyName: z.string().min(1, {
    message: "Company name is required",
  }),
  companyEmail: z.string().min(1, {
    message: "Company email is required",
  }),
});

export default function CreateCompanyForm({
  initialData,
}: CreateCompanyFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid, errors } = form.formState;

  console.log(errors, "errors");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/company/", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();

      console.log(data, response, "data");

      if (response.ok) {
        toast({
          title: "Success",
          description: "Job Created",
          variant: "default",
          className: "bg-green-300 border-0",
        });
        router.push("/profile/dashboard/staff");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message,
        });
        router.refresh();
      }
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
      <div className="flex items-center justify-between font-medium">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="The name of your company"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyEmail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="The email of your company"
                      {...field}
                      type="email"
                    />
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
