"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CircleSlash2, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

const FormSchema = z.object({
  alert: z.boolean(),
});

type Props = {
  createAlert: (
    userId: string,
    args: Record<string, string | string[] | undefined>,
  ) => Promise<boolean>;
  args: any;
  userId: string | undefined;
  alert: boolean;
  deleteAlert: (
    userId: string,
    args: Record<string, string | string[] | undefined>,
  ) => Promise<boolean>;
};

export function JobAlertSwitch({
  createAlert,
  args,
  userId,
  alert,
  deleteAlert,
}: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      alert: alert,
    },
  });
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();

  form.watch(async (value, { name, type }) => {
    setIsSubmitting(true);
    if (!userId) {
      setShowAlert(true);
      return;
    }
    try {
      if (value.alert) {
        createAlert(userId, args);
      } else {
        deleteAlert(userId, args);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  });

  if (showAlert && isSubmitting) {
    return (
      <AlertDialog open={true}>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="text-center">
                <CircleSlash2 className="h-8 w-8 text-red-500" />
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div>
                <p>You are currently not logged in</p>
                <p>
                  Please{" "}
                  <Link
                    href={`/auth/signin?callbackUrl=/${pathname}`}
                    className="text-primary"
                  >
                    login
                  </Link>{" "}
                  or{" "}
                  <Link href="/auth/signup/employer" className="text-primary">
                    register
                  </Link>{" "}
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  return (
    <Form {...form}>
      <form className="w-fit">
        <div>
          <div className="">
            {isSubmitting ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <FormField
                control={form.control}
                name="alert"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-center">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                        // disabled={isSubmitting || !userId || !args || alert}
                        // onChange={() => onChange(form.getValues())}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
