"use client";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CreateServiceForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const formSchema = z.object({
    title: z
      .string()
      .min(2, {
        message: "Title is required",
      })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const request = await fetch(`/api/services/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const { message, id } = await request.json();

      if (!request.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: message,
        });
        return;
      } else {
        toast({
          title: "Success",
          description: "Service created",
          variant: "default",
          className: "bg-green-300 border-0",
        });
        router.push(`/profile/dashboard/admin/service/${id}`);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error.message}`,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Title</FormLabel>
              <FormControl>
                <Input placeholder="Service title" {...field} />
              </FormControl>
              <FormDescription>
                What service are you offering?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 flex items-center">
          <Button type="reset" variant="secondary" className="me-2">
            Cancel
          </Button>
          <Button
            className="bg-green-600"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateServiceForm;
