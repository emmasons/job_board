import { db } from "@/lib/db";
import {
  Address,
  Candidate,
  Company,
  EmployerProfile,
  Job,
  Profile,
  Sector,
  User,
} from "@prisma/client";

type EmployerProfileType =
  | (EmployerProfile & {
      company:
        | (Company & {
            sector: Sector | null;
            jobs: Job[] | null;
          })
        | null;
    })
  | null;

type UserType =
  | (User & {
      profile: Profile | null;
      candidates: Candidate[] | null;
    })
  | null;

type EmployerProfileWithCompanyAndAddress = UserType & {
  employerProfile: EmployerProfileType;
  address: Address | null;
};
export const getEmployerProfile = async (
  id: string,
): Promise<EmployerProfileWithCompanyAndAddress | null> => {
  try {
    const employer = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        employerProfile: {
          include: {
            company: {
              include: {
                sector: true,
                jobs: true,
              },
            },
          },
        },
        address: true,
        profile: true,
        candidates: true,
      },
    });
    return employer;
  } catch (error) {
    console.log("GET_EMPLOYER_PROFILE", error);
    return null;
  }
};
