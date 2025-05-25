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
import RichTextEditor from "@/components/ckeditor/RichTextEditor";
import { useEffect } from "react";

interface CreateCoverLetterFormProps {
  content: string;
  isEditing?: boolean;
  handleCoverLetterChange: (content: string | undefined) => void;
}

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Description is required",
  }),
});

export default function CreateCoverLetterForm({
  content,
  isEditing = false,
  handleCoverLetterChange,
}: CreateCoverLetterFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.setValue("content", content);
    form.reset({ content });
  }, [content, form]);

  form.watch((values) => {
    handleCoverLetterChange(values.content);
  });

  return (
    <div className="w-full max-w-full rounded-md border bg-slate-100 p-4">
      <Form {...form}>
        <form className="mt-4 space-y-4 w-full">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RichTextEditor {...field} showPreview={false} />
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
