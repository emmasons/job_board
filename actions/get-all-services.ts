import { Service } from "@prisma/client";
import { db } from "@/lib/db";

type ReturnProps = Service | null;

type Props = {
  limit?: number;
};

export const getAllServices = async ({ limit }: Props = {}): Promise<ReturnProps[]> => {
  try {
    const services = await db.service.findMany({
      take: limit ? limit : undefined,
    });

    if (services.length === 0) {
      return [];
    }
    return services;
  } catch (error) {
    console.log("[SERVICE_FETCH]", error);
    return [];
  }
};
