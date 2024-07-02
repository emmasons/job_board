"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Skill } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

type Props = {
  title: String;
  description: String;
  profileId: string;
  skills: Skill[];
};

const CVHeadlineForm = ({ title, profileId, skills }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const { toast } = useToast();
  const formSchema = z.object({
    skill: z.string().min(2, "Please add a skill."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skill: "",
    },
  });

  const { isSubmitting, isValid, errors } = form.formState;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(`/api/job-seeker/profile/${profileId}/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const response = await res.json();
      console.log(response);
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
          description: "Profile updated successfuly.",
          className: "bg-green-500",
        });
        toggleEdit();
        router.refresh();
      }
    } catch (error) {
      console.log(error, errors);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  }

  return (
    <div className="bg-pes-light-blue flex h-full w-full flex-col justify-start rounded-md border p-4">
      <div className="flex items-center justify-between font-medium">
        <div className="mb-4">
          <p>{title}</p>
          <p className="text-sm text-zinc-500">
            Add skills to help us match you with qualified professionals.
          </p>
        </div>

        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="skill"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g wound care"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
      )}
      {skills && (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill.id} variant="outline">
              {skill.skill}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default CVHeadlineForm;
