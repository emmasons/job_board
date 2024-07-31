import { db } from "@/lib/db";
import { Company } from "@prisma/client";

export const getCompanyForUser = async (
  userId: string,
): Promise<Company | null> => {
  try {
    const company = await db.company.findFirst({
      where: {
        employerProfile: {
          userId,
        },
      },
    });
    return company;
  } catch (error) {
    console.log("GET_COMPANY_FOR_USER", error);
    return null;
  }
};
