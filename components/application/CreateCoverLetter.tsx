"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import RichTextEditor from "@/components/ckeditor/RichTextEditor";

interface CreateCoverLetterFormProps {
  initialData: {
    content: string;
    id?: string;
  };
  isEditing?: boolean;
  handleCoverLetterChange: (content: string | undefined) => void;
}

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Description is required",
  }),
});

export default function CreateCoverLetterForm({
  initialData,
  isEditing = false,
  handleCoverLetterChange,
}: CreateCoverLetterFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid, errors } = form.formState;

  const btnText = isEditing ? "Update Letter" : "Save Letter";

  form.watch((values) => {
    handleCoverLetterChange(values.content);
  });

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        <Form {...form}>
          <form className="mt-4 w-2/3 space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <RichTextEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
