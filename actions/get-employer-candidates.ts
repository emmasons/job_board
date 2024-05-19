import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const getEmployerCandidates = async (
  employerId: string,
): Promise<User & { profile: { firstName: string; lastName: string } }> => {
  try {
    const candidateIds = await db.candidate.findMany({
      where: {
        employerId,
      },
      select: {
        candidateId: true,
      },
    });
    const candidates = await db.user.findMany({
      where: {
        id: { in: candidateIds.map(({ candidateId }) => candidateId) },
      },
      include: {
        profile: {
          select: {
            firstName: true,
            lastName: true,
            phoneNumber: true,
          },
        },
      },
    });
    return candidates;
  } catch (error) {
    console.log("[GET_EMPLOYER_CANDIDATES]", error);
    return [];
  }
};
