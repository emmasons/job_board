"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Loader2, Pencil } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PersonalDetails } from "@prisma/client";

type Props = {
  title: string;
  dateOfBirth: undefined;
  profileId: string,
  gender: string;
  nationality: string;
  maritalStatus: string;
  drivingLicense: boolean;
  currentLocation: string;
  languagesKnown: string;
  visaStatus: string;
  religion: string;
  alternateEmail: string;
  alternateContactNumber: string;
};

const PersonalDetailsForm = ({
  title,
  profileId,

}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<PersonalDetails | null>(null);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();
  const { toast } = useToast();

  const formSchema = z.object({
    dateOfBirth: z.date({ required_error: "A date of birth is required." }),
    gender: z.string().nonempty("Gender is required"),
    nationality: z.string().nonempty("Nationality is required"),
    maritalStatus: z.string().nonempty("Marital Status is required"),
    drivingLicense: z.boolean(),
    currentLocation: z.string().nonempty("Current Location is required"),
    languagesKnown: z.string().nonempty("At least 1 language is required"),
    visaStatus: z.string().nonempty("Visa Status is required"),
    religion: z.string().optional(),
    alternateEmail: z.string().email().optional(),
    alternateContactNumber: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateOfBirth: "" || undefined,
      gender: "",
      nationality: "",
      maritalStatus: "",
      drivingLicense: false,
      currentLocation: "",
      languagesKnown: "",
      visaStatus: "",
      religion: "",
      alternateEmail: "",
      alternateContactNumber: "",
    },
  });

  const url = `/api/job-seeker/profile/${profileId}/personalDetails`;
  useEffect(() => {
    const fetchpersonalDetails = async () => {
      try {
        const res = await fetch(url);
        const data: PersonalDetails = await res.json();

        if (res.ok) {
          form.reset({
            dateOfBirth: new Date(data.dateOfBirth),
            gender: data.gender,
            nationality: data.nationality,
            maritalStatus: data.maritalStatus,
            drivingLicense: data.drivingLicense,
            currentLocation: data.currentLocation,
            languagesKnown: data.languagesKnown,
            visaStatus: data.visaStatus,
            religion: data.religion || "",
            alternateEmail: data.alternateEmail || "",
            alternateContactNumber: data.alternateContactNumber || "",
          });
        } else {
          // Handle the error based on your requirements
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    };

    fetchpersonalDetails();
  }, [form, profileId, toast, url]);

  const handleEdit = (personal: PersonalDetails) => {
    setEditingItem(personal);
    form.reset({
      dateOfBirth: personal.dateOfBirth,
      gender: personal.gender,
      nationality: personal.nationality || "",
      maritalStatus: personal.maritalStatus || "",
      drivingLicense: personal.drivingLicense,
      currentLocation: personal.currentLocation || "",
      languagesKnown: personal.languagesKnown || "",
      visaStatus: personal.visaStatus || "",
      religion: personal.religion || "",
      alternateEmail: personal.alternateEmail || "",
      alternateContactNumber: personal.alternateContactNumber || "",
    });
    setIsEditing(true);
  };

  const {
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = form;
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(
        `/api/job-seeker/profile/${profileId}/personalDetails`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            dateOfBirth: values.dateOfBirth.toISOString(),
          }),
        },
      );

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
          <p className="font-sans text-xl font-semibold">{title}</p>
          <p className="py-2 text-sm text-zinc-500">
            Outline your professional career to Employers
          </p>
        </div>

        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="mt-2 text-sm"> Add Initial data here </p>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* date of birth */}
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender fields */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex  space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nationality field */}
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Nationality</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your nationality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="kenya">Kenya</SelectItem>
                      <SelectItem value="saudi">Saudi Arabia</SelectItem>
                      <SelectItem value="tanzania">Tanzania</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* marital status */}
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Marital Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widow">Widow(er)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Driving licence */}
            <FormField
              control={form.control}
              name="drivingLicense"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Do you have a driving licence</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Current Location */}
            <FormField
              control={form.control}
              name="currentLocation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label className="flex w-80 flex-col gap-2 text-sm">
                      Current Location
                      <Input {...field} />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Languages */}
            <FormField
              control={form.control}
              name="languagesKnown"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label className="flex w-80 flex-col gap-2 text-sm">
                      Languages known
                      <Input {...field} />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Visa Status */}
            <FormField
              control={form.control}
              name="visaStatus"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Visa Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Visa status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="visit">
                        Visit Visa / Transit Visa
                      </SelectItem>
                      <SelectItem value="student">Student Visa</SelectItem>
                      <SelectItem value="employment">
                        Employment Visa - Mainland
                      </SelectItem>
                      <SelectItem value="freezone">
                        Employment Visa - Freezone
                      </SelectItem>
                      <SelectItem value="golden">Golden Visa</SelectItem>
                      <SelectItem value="dependent">
                        Dependent Visa / Family Visa
                      </SelectItem>
                      <SelectItem value="national">
                        GCC National Visa
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* religion */}

            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormLabel>Religion</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Your Faith" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="islam">Islam</SelectItem>
                      <SelectItem value="christianity">Christianity</SelectItem>
                      <SelectItem value="hinduism">Hinduism</SelectItem>
                      <SelectItem value="budhhism">Budhhism</SelectItem>
                      <SelectItem value="sikhism">Sikhism</SelectItem>
                      <SelectItem value="jainism">Jainism</SelectItem>
                      <SelectItem value="zoroastrianism">
                        Zoroastrianism
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Alternate Email */}
            <FormField
              control={form.control}
              name="alternateEmail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label className="flex w-80 flex-col gap-2 text-sm">
                      Alternate Email Address
                      <Input type="email" {...field} />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Alternate Phone Number */}
            <FormField
              control={form.control}
              name="alternateContactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <label className="flex w-80 flex-col gap-2 text-sm">
                      Alternate Phone Number
                      <Input {...field} />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              {loading ? (
                <Button type="submit" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </Button>
              ) : (
                <Button disabled={isSubmitting} type="submit">
                  {isEditing ? "Save" : "Create"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default PersonalDetailsForm;
