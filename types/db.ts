import { Company, Job, Sector } from "@prisma/client";

export type JobsWithCompany = Job & { company: Company; sector: Sector };
export type ComboProps = {
  label: string;
  value: string;
}[];
