/**
 * date of birth
 * Gender
 * Nationality
 * Marital status
 * Driving Licence
 * current location
 * languages known
 * visa status
 * religion
 * alternative emails
 * alternative mobile number
 */
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
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2, Pencil } from "lucide-react";


type Props = {
  title: string;
  profileId: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  maritalStatus: string;
  drivingLicense: boolean;
  currentLocation: string;
  languagesKnown: string[];
  visaStatus: string;
  religion: string;
  alternateEmail: string;
  alternateContactNumber: string;
};

const PersonalDetailsForm = ({
  title,
  profileId,
  dateOfBirth,
  gender,
  nationality,
  maritalStatus,
  drivingLicense,
  currentLocation,
  languagesKnown,
  visaStatus,
  religion,
  alternateEmail,
  alternateContactNumber,

}: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentlyWorking, setCurrentlyWorking] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();
    const { toast } = useToast();
    
    const formSchema = z.object({
      dateOfBirth: z.string().nonempty("Date of Birth is required"),
      gender: z.string().nonempty("Male or Female"),
      nationality: z.string().nonempty("Nationality is required"),
      maritalStatus: z.string().nonempty("Single, Married, Divorced, Widower, Other"),
      drivingLicense: z.boolean(),
      currentLocation: z.string().nonempty("Current Location is required"),
      languagesKnown: z.array(z.string()).min(1, "At least one language is required"),
      visaStatus: z.string().nonempty("Visa Status is required"),
      religion: z.string().optional(),
      alternateEmail: z.string().email().optional(),
      alternateContactNumber: z.string().optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        dateOfBirth: dateOfBirth || "",
        gender: gender || "",
        nationality: nationality || "",
        maritalStatus: maritalStatus || "",
        drivingLicense: drivingLicense,
        currentLocation: currentLocation || "",
        languagesKnown: [] || "",
        visaStatus: visaStatus || "",
        religion: religion || "",
        alternateEmail: alternateEmail || "",
        alternateContactNumber: alternateContactNumber || ""
      },
    });

    const { isSubmitting, isValid, errors } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        // Handle form submission
        const res = await fetch(`/api/job-seeker/profile/${profileId}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
          }),
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
            description: "Profile updated successfully.",
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

    return (
    <div className="bg-pes-light-blue flex h-full w-full flex-col justify-start rounded-md border p-4">
      <div className="flex items-center justify-between font-medium">
        <div className="mb-4">
          <p className="text-xl font-semibold font-sans">{title}</p>
          <p className="text-sm py-2 text-zinc-500">
            Outline your professional career to Employers
          </p>
        </div>

        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? <>Cancel</> : <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </>}
        </Button>
      </div>
    {!isEditing && <p className="mt-2 text-sm"> Add Initial data here </p>}
    {isEditing && (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label className="text-sm">
                  Date of Birth
                  <Input
                    type="date"
                    disabled={isSubmitting}
                    placeholder = "DD/MM/YYYY"
                    {...field}
                   />
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label className="text-sm">
                  Gender
                  <Select {...field}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label className="text-sm">
                  Nationality
                  <Select {...field}>
                    <option value="">Select Nationality</option>
                    <option value="Kuwaiti">Kuwaiti</option>
                    <option value="Kuwaiti">Kenyan</option>
                    <option value="Kuwaiti">Nigerian</option>
                  </Select>
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label className="text-sm">
                  Marital Status
                  <Select {...field}>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widower">Widower</option>
                    <option value="Other">Other</option>
                  </Select>
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="drivingLicense"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label className="text-sm flex items-center">
                  <Checkbox {...field} />
                  <span className="ml-2">Do you have a Driving License?</span>
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentLocation"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label className="text-sm">
                  Current Location
                  <Input {...field} />
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="languagesKnown"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label className="text-sm">
                  Languages Known (Max 3)
                  <Select {...field} multiple>
                    <option value="Arabic">Arabic</option>
                    <option value="English">English</option>
                    {/* Add other languages as needed */}
                  </Select>
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visaStatus"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label className="text-sm">
                  Visa Status For Current Location
                  <Select {...field}>
                    <option value="Citizen / Emirati">Citizen / Emirati</option>
                    <option value="Visit Visa / Transit Visa">Visit Visa / Transit Visa</option>
                    <option value="Student Visa">Student Visa</option>
                    <option value="Employment Visa - Mainland">Employment Visa - Mainland</option>
                    <option value="Employment Visa - Freezone">Employment Visa - Freezone</option>
                    <option value="Dependent Visa / Family Visa">Dependent Visa / Family Visa</option>
                    <option value="Golden Visa">Golden Visa</option>
                    <option value="Green Visa">Green Visa</option>
                    <option value="GCC National Visa">GCC National Visa</option>
                    <option value="Freelance Visa">Freelance Visa</option>
                    <option value="Other">Other</option>
                  </Select>
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="religion"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label className="text-sm">
                  Religion
                  <Select {...field}>
                    <option value="">Select Religion</option>
                    {/* Add religion options as needed */}
                  </Select>
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alternateEmail"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label className="text-sm">
                  Alternate Email Address
                  <Input type="email" {...field} />
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alternateContactNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <label className="text-sm">
                  Alternate Contact Number
                  <Input {...field} />
                </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </form>
    </Form>
    )}
      </div>
    );

};

export default PersonalDetailsForm;
