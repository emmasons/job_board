"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  isOpen: z.boolean(),
});

type Props = {
  jobId: string;
  initialData: {
    isOpen: boolean;
  };
};

export function SwitchJobStatusForm({ jobId, initialData }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData,
  });
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const subscription = form.watch(async (value, { name, type }) => {
      setIsSubmitting(true);
      try {
        const response = await fetch(`/api/jobs/${jobId}/toggle-status`, {
          method: "PATCH",
          body: JSON.stringify(value),
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
        setIsSubmitting(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, jobId, router]);

  return (
    <Form {...form}>
      <div className="inline-flex items-center rounded-md">
        <p className="rounded-bl-sm rounded-tl-sm bg-zinc-500 p-2 text-white">
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Status"
          )}
        </p>
        <p
          className={cn(
            "rounded-br-sm rounded-tr-sm p-2 text-white",
            initialData.isOpen ? "bg-green-500" : "bg-red-500",
          )}
        >
          {initialData.isOpen ? "Open" : "Closed"}
        </p>
      </div>
      <form className="w-fit space-y-4">
        <div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="isOpen"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-center rounded-lg border p-4">
                  <div className="space-y-0.5"></div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                      disabled={isSubmitting}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
