import { Company, Job } from "@prisma/client";

export type JobsWithCompany = Job & Company;
