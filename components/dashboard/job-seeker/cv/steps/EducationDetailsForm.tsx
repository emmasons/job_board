"use client";

import { useState } from "react";
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
import { EducationDetails } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Combobox } from "@/components/ui/combobox";
import { Briefcase, Pencil, BookOpenText, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ComboProps } from "@/types/db";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  title: string;
  initialData: EducationDetails;
  profileId: string;
  profilePercentage: number;
  isJobSeekerComponent: Boolean;
};

const EducationDetailsForm = ({
  title,
  initialData,
  profileId,
  profilePercentage,
  isJobSeekerComponent = true,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const { toast } = useToast();

  const formSchema = z.object({
    level: z.string().min(1, {
      message: "Education level is required",
    }),
    course: z.string().min(2, "Company name is required"),
    college: z.string().min(2, "College name is required"),
    collegeLocation: z.string().min(1, "College Location is required"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: initialData.level || "",
      course: initialData.course || "",
      college: initialData.college || "",
      collegeLocation: initialData.collegeLocation || "",
    },
  });
  const { isSubmitting, isValid, errors } = form.formState;
  const url = `/api/job-seeker/profile/${profileId}/educationDetails/${initialData.id}`;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const requestBody = {
        ...values,
        // profilePercentage: isPercentage,
      };
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
          description: "Education details saved successfully.",
          className: "bg-green-500",
        });
        toggleEdit();
        router.refresh();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  }
  async function deleteEducationDetails() {
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete education details");
      } else {
        toast({
          variant: "default",
          title: "Success",
          description: "Education details deleted successfully.",
          className: "bg-green-500",
        });
        toggleEdit();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="bg-pes-light-blue flex h-full w-full flex-col justify-start rounded-md border p-4">
      <div className="flex items-center justify-between font-medium">
        <div className="mb-4">
          <p className="text-lg capitalize">
            {initialData.level}: {initialData.course}
          </p>
        </div>
      </div>
      
      {isEditing &&(
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Education level */}
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Education Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pre-primary">Pre primary</SelectItem>
                      <SelectItem value="primary school">Primary School</SelectItem>
                      <SelectItem value="junior secondary">
                        Junior Secondary School
                      </SelectItem>
                      <SelectItem value="senior secondary">
                        Senior Secondary School
                      </SelectItem>
                      <SelectItem value="bachelors">
                        Bachelors or Equivalent level
                      </SelectItem>
                      <SelectItem value="masters">
                        Masters or Equivalent level
                      </SelectItem>
                      <SelectItem value="higher education">
                        Doctoral or Equivalent level
                      </SelectItem>
                      <SelectItem value="higher">Not Specified</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="college"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>course</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Tell us the course you studied"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="collegeLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>college location</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Indicate the location of the institution you studied"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-5">
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="rounded-3xl"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Update Details"
                )}
              </Button>
              {isEditing && (
                <Button variant="ghost" onClick={deleteEducationDetails}>
                  Remove this Employment
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
      <div className="my-4">
        <div key={initialData.id} className="mb-2 flex justify-between  ">
          <div className="flex flex-wrap items-center gap-6">
            <div className="rounded-full bg-orange-50 p-4 ">
              <BookOpenText className="h-6" />
            </div>
            <div>
              <p className="font-medium"> {initialData.course}</p>
              <span className="flex gap-2">
                <p className="text-sm text-zinc-700">{initialData.college}</p>
                <p className="text-sm text-zinc-700">
                  {initialData.collegeLocation}
                </p>
              </span>
            </div>
          </div>
          <div>
            {isJobSeekerComponent && (
              <Button onClick={toggleEdit} variant="ghost">
                {isEditing ? (
                  "cancel"
                ) : (
                  <>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationDetailsForm;
