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
import { Loader2, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Skill } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

type Props = {
  title: string;
  profileId: string;
  skills: Skill[];
  description: String;
  isJobSeekerComponent: boolean;
};

const SkillsForm = ({
  title,
  profileId,
  skills,
  isJobSeekerComponent = true,
}: Props) => {
  const [skillList, setSkillList] = useState(skills);
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
      if (skillList.length >= 10) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You cannot add more than 10 skills.",
        });
        return;
      }

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
          description: "Profile updated successfully.",
          className: "bg-green-500",
        });
        setSkillList([...skillList, response]);
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

  // delete function
  const deleteSkill = async (skillId: string) => {
    try {
      const res = await fetch(
        `/api/job-seeker/profile/${profileId}/skills/${skillId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const isJson = res.headers
        .get("content-type")
        ?.includes("application/json");
      const response = isJson ? await res.json() : null;

      if (!res.ok) {
        const errorMessage = response
          ? response.message
          : "An unexpected error occurred";
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        });
      } else {
        toast({
          variant: "default",
          title: "Success",
          description: "Skill deleted successfully.",
          className: "bg-green-500",
        });
        setSkillList(skillList.filter((skill) => skill.id !== skillId));
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
  };

  return (
    <div className="bg-pes-light-blue flex h-full w-full flex-col justify-start rounded-md border p-4">
      <div className="flex items-center justify-between font-medium">
        <div className="mb-4">
          <p>{title}</p>
          {isJobSeekerComponent && (
            <p className="text-sm text-zinc-500">
              Add skills to help us match you with qualified professionals.
            </p>
          )}
        </div>
        {isJobSeekerComponent && (
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
        )}
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
      {skillList && (
        <div className="mt-4 flex flex-wrap gap-2">
          {skillList.map((skill) => (
            <Badge
              key={skill.id}
              variant="outline"
              className="flex items-center"
            >
              {skill.skill}
              {isJobSeekerComponent && (
                <Trash
                  className="ml-2 h-3 w-4 cursor-pointer text-slate-600"
                  onClick={() => deleteSkill(skill.id)}
                />
              )}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
