import { db } from "@/lib/db";
import { Company } from "@prisma/client";

export const getCompanyForUser = async (ownerId: string): Promise<Company> => {
  try {
    const company = await db.company.findFirst({ where: { ownerId } });
    return company;
  } catch (error) {
    console.log("GET_COMPANY_FOR_USER", error);
    return [];
  }
};
