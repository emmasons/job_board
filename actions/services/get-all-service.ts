import { Service } from "@prisma/client";
import { db } from "@/lib/db";

type ReturnProps = Service | null;

export const getAllServices = async (): Promise<ReturnProps[]> => {
  try {
    const services = await db.service.findMany();
    if (services.length === 0) {
      return [];
    }
    return services;
  } catch (error) {
    console.log("[SERVICE_ID]", error);
    return [];
  }
};
