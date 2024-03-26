import { Company, Job } from "@prisma/client";

export type JobsWithCompany = Job & Company;
export type ComboProps = {
  label: string;
  value: string;
}[];
