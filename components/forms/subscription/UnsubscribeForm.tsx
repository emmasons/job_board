"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Subscription } from "@prisma/client";
import { getSubscriptionHeading } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  email?: string;
  subscriptions: Subscription[];
};

export function UnsubscribeForm({ email, subscriptions }: Props) {
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email("Please provide a valid email address"),
    ids: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      ids: [],
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });
      const response = await res.json();
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        });
      } else {
        toast({
          variant: "default",
          title: "Success",
          description: "Subscribed successfuly.",
          className: "bg-green-500",
        });
        router.push("/");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 w-full space-y-4 bg-slate-50 p-10"
      >
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">Unsubscribe</FormLabel>
            <FormDescription>
              Please select the items you want to unsubscribe.
            </FormDescription>
          </div>
          {subscriptions.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="ids"
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== item.id,
                                ),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {getSubscriptionHeading(item.type)}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="bg-secondary hover:bg-secondary/70"
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Unsubscribe"
          )}
        </Button>
      </form>
    </Form>
  );
}
