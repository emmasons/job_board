"use server";
import { db } from "@/lib/db";
import { WorkSchedule, ContractType } from "@prisma/client";
type Props = {
  userId: string;
  args: Record<string, string | string[] | undefined>;
};

export async function createAlert(
  userId: string,
  args: Record<string, string | string[] | undefined>,
) {
  try {
    if (!userId) {
      return false;
    }
    if (args.jobId) {
      const previousAlert = await db.jobAlert.findFirst({
        where: {
          userId,
          jobId: args.jobId as string,
        },
      });
      if (previousAlert) {
        return false;
      }
    }
    if (args) {
      const previousAlert = await db.jobAlert.findFirst({
        where: {
          ...({
            city: args.city as string,
            country: args.country as string,
            companyId: args.companyId as string,
            educationLevelId: args.educationLevelId as string,
            sectorId: args.sectorId as string,
            workSchedule: args.workSchedule as WorkSchedule,
            contractType: args.contractType as ContractType,
            occupation: args.occupation as string,
            jobId: args.jobId as string,
            userId,
          } as const),
        },
      });
      if (previousAlert) {
        return false;
      }
    }
    await db.jobAlert.create({
      data: {
        userId,
        city: args.city as string,
        country: args.country as string,
        companyId: args.companyId as string,
        educationLevelId: args.educationLevelId as string,
        sectorId: args.sectorId as string,
        workSchedule: args.workSchedule as WorkSchedule,
        contractType: args.contractType as ContractType,
        occupation: args.occupation as string,
        jobId: args.jobId as string,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteAlert(
  userId: string,
  args: Record<string, string | string[] | undefined>,
) {
  try {
    if (!userId) {
      return false;
    }

    const previousAlert = await db.jobAlert.findFirst({
      where: {
        ...({
          city: args.city as string,
          country: args.country as string,
          companyId: args.companyId as string,
          educationLevelId: args.educationLevelId as string,
          sectorId: args.sectorId as string,
          workSchedule: args.workSchedule as WorkSchedule,
          contractType: args.contractType as ContractType,
          occupation: args.occupation as string,
          jobId: args.jobId as string,
          userId,
        } as const),
      },
    });
    console.log(previousAlert, "********");
    if (previousAlert) {
      await db.jobAlert.delete({ where: { id: previousAlert.id } });
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}