import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { EducationLevel } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ComboProps } from "@/types/db";
import { EducationDetails as EducationDetailsType } from "@prisma/client";

import EducationDetailsForm from "./steps/EducationDetailsForm";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  title: string;
  profilePercentage: number;

  profileId: string;
  initialData: EducationDetailsType[];
  isJobSeekerComponent: Boolean;
};
const EducationDetails = ({
  title,
  profilePercentage,
  profileId,
  initialData, 
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
    course: z.string().min(2, "Course name is required"),
    college: z.string().min(2, "College name is required"),
    collegeLocation: z.string().min(1, "College Location is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: "",
      course: "",
      college: "",
      collegeLocation: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = `/api/job-seeker/profile/${profileId}/educationDetails`;

    try {
      const requestBody = {
        ...values,
        profilePercentage: 10,
      };

      const res = await fetch(url, {
        method: "POST",
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
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  }

  return (
    <div className="p-7">
      <div className="flex items-center justify-between font-medium">
        {title}
        {isJobSeekerComponent && (
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" /> Add
              </>
            )}
          </Button>
        )}
      </div>

      {!isEditing ? (
        <div>
          {initialData.map((education) => (
            <div key={education.id} className="mb-2">
              <EducationDetailsForm
                title="Education Details"
                profileId={education.jobSeekerProfileId}
                profilePercentage={10}
                initialData={education}
                isJobSeekerComponent={isJobSeekerComponent}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {isJobSeekerComponent && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                          <SelectItem value="pre-primary">
                            Pre primary
                          </SelectItem>
                          <SelectItem value="primary school">
                            Primary School
                          </SelectItem>
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
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
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
                  name="college"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="Indicate the college you attended"
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
                      <FormLabel>College Location</FormLabel>
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
                <Button type="submit" disabled={isSubmitting}>
                  Save
                </Button>
              </form>
            </Form>
          )}
        
        </div>
      )}
    </div>
  );
};

export default EducationDetails;
