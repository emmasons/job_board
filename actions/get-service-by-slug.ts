import { Service } from "@prisma/client";
import { db } from "@/lib/db";
type ReturnProps = Service | null;
export const getServiceBySlug = async (
  slug: string,
): Promise<ReturnProps | null> => {
  try {
    const service = await db.service.findUnique({
      where: {
        slug,
      },
    });

    return service;
  } catch (error) {
    console.log("[SERVICE_ID]", error);
    return null;
  }
};
