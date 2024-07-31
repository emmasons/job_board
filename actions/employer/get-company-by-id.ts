import { db } from "@/lib/db";
import { Address, Company } from "@prisma/client";

type CompanyProps = Company & {
  employerProfile: {
    user: {
      address: Address | null;
    };
  };
};

export const getCompanyById = async (
  id: string,
): Promise<CompanyProps | null> => {
  try {
    const company = await db.company.findUnique({
      where: { id },
      include: {
        employerProfile: {
          include: {
            user: {
              include: {
                address: true,
              },
            },
          },
        },
      },
    });
    return company;
  } catch (error) {
    console.log("GET_COMPANY_FOR_USER", error);
    return null;
  }
};
