import { db } from "@/lib/db";

export const getEmployerCandidatesIds = async (employerId: string) => {
  try {
    const candidates = await db.candidate.findMany({
      where: {
        employerId,
      },
      select: {
        candidateId: true,
      },
    });
    return candidates;
  } catch (error) {
    console.log(error, "[GET_ALL_CANDIDATES]");
    return [];
  }
};
