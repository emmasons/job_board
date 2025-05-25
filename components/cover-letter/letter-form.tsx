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
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import RichTextEditor from "@/components/ckeditor/RichTextEditor";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  jobTitle: z.string().min(1, { message: "Job title is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  // coverLetter: z
  //   .string()
  //   .min(1, { message: "Cover letter content is required" }),
  companyName: z.string().min(1, { message: "Company name is required" }),
  hiringManager: z.string().optional(),
});

interface CoverLetterFormProps {
  initialData?: z.infer<typeof formSchema>;
  templateId: string;
  onDataChange?: (data: z.infer<typeof formSchema>) => void;
}

export default function CoverLetterForm({
  initialData,
  templateId,
  onDataChange,
}: CoverLetterFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      jobTitle: "",
      address: "",
      email: "",
      phoneNumber: "",
      // coverLetter: "",
      companyName: "",
      hiringManager: "",
    },
  });

  const { isSubmitting } = form.formState;

  form.watch((data) => {
    onDataChange?.(data);
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`/api/cover-letter/${templateId}`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Cover letter generated successfully",
          variant: "default",
          className: "bg-green-300 border-0",
        });
        router.push(`/cover-letter/${data.id}`);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message,
        });
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
    <div className="mt-6 rounded-md border p-4 bg-slate-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 w-2/3 space-y-4"
        >
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Your job title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Your address"
                      {...field}
                    />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Company name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="hiringManager"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hiring Manager</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Hiring manager's name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter Content</FormLabel>
                <FormControl>
                  <RichTextEditor {...field} showPreview={false} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </form>
      </Form>
    </div>
  );
}
