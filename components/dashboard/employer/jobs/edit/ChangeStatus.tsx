"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { JOBSTATUS } from "@prisma/client";
import { useState } from "react";
import { Loader2, Pencil } from "lucide-react";

const FormSchema = z.object({
  status: z.enum([JOBSTATUS.DRAFT, JOBSTATUS.OPEN, JOBSTATUS.CLOSED], {
    required_error: "You need to set the Job status",
  }),
});

type Props = {
  jobId: string;
  initialData?: z.infer<typeof FormSchema>;
};

export function ChangeJobStatusForm({ jobId, initialData }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData,
  });
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/jobs/${jobId}/toggle-status`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data.message, null, 2)}
              </code>
            </pre>
          ),
          variant: "default",
          className: "bg-green-300 border-0",
        });
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data.message, null, 2)}
              </code>
            </pre>
          ),
        });
        router.refresh();
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify("Something went wrong", null, 2)}
            </code>
          </pre>
        ),
      });
    } finally {
      toggleEdit();
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <div className="inline-flex w-fit items-center justify-between bg-sky-100 font-medium">
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Change
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg">Set the Job status</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={`${JOBSTATUS.DRAFT}`} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Shelve this Job
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={`${JOBSTATUS.OPEN}`} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Open this job for applications
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={`${JOBSTATUS.CLOSED}`} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Close this job from applications
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      )}
    </Form>
  );
}
