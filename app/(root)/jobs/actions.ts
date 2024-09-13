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
    const sectorList =
      typeof args.sectorId === "string"
        ? args.sectorId.split(",").map((id) => id)
        : args.sectorId;
    const educationLevelIdList =
      typeof args.educationLevelId === "string"
        ? args.educationLevelId.split(",").map((id) => id)
        : args.educationLevelId;
    const workScheduleList =
      typeof args.workSchedule === "string"
        ? args.workSchedule
            .split(",")
            .map((id) => WorkSchedule[id as keyof typeof WorkSchedule])
        : (args.workSchedule as WorkSchedule[]);
    const contactTypeList =
      typeof args.contractType === "string"
        ? args.contractType
            .split(",")
            .map((id) => ContractType[id as keyof typeof ContractType])
        : (args.contractType as ContractType[]);

    if (args) {
      const previousAlert = await db.jobAlert.findFirst({
        where: {
          ...({
            city: args.city as string,
            country: args.country as string,
            companyId: args.companyId as string,
            educationLevelIds: {
              hasEvery: educationLevelIdList ? educationLevelIdList : [],
            },
            sectorIds: {
              hasEvery: sectorList ? sectorList : [],
            },
            workSchedules: {
              hasEvery: workScheduleList ? workScheduleList : [],
            },
            contractTypes: {
              hasEvery: contactTypeList ? contactTypeList : [],
            },
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
        educationLevelIds: educationLevelIdList ? educationLevelIdList : [],
        sectorIds: sectorList ? sectorList : [],
        workSchedules: workScheduleList ? workScheduleList : [],
        contractTypes: contactTypeList ? contactTypeList : [],
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

    const sectorList =
      typeof args.sectorId === "string"
        ? args.sectorId.split(",").map((id) => id)
        : args.sectorId;
    const educationLevelIdList =
      typeof args.educationLevelId === "string"
        ? args.educationLevelId.split(",").map((id) => id)
        : args.educationLevelId;
    const workScheduleList =
      typeof args.workSchedule === "string"
        ? args.workSchedule
            .split(",")
            .map((id) => WorkSchedule[id as keyof typeof WorkSchedule])
        : (args.workSchedule as WorkSchedule[]);
    const contactTypeList =
      typeof args.contractType === "string"
        ? args.contractType
            .split(",")
            .map((id) => ContractType[id as keyof typeof ContractType])
        : (args.contractType as ContractType[]);
    const previousAlert = await db.jobAlert.findFirst({
      where: {
        ...({
          city: args.city as string,
          country: args.country as string,
          companyId: args.companyId as string,
          educationLevelIds: {
            hasEvery: educationLevelIdList ? educationLevelIdList : [],
          },
          sectorIds: {
            hasEvery: sectorList ? sectorList : [],
          },
          workSchedules: {
            hasEvery: workScheduleList ? workScheduleList : [],
          },
          contractTypes: {
            hasEvery: contactTypeList ? contactTypeList : [],
          },
          occupation: args.occupation as string,
          jobId: args.jobId as string,
          userId,
        } as const),
      },
    });

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
