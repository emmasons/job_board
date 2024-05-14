import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export const getAllCandidates = async () => {
  try {
    const candidates = await db.user.findMany({
      where: {
        role: Role.JOB_SEEKER,
      },
      include: {
        profile: true,
        JobSeekerProfile: true,
      },
    });
    return candidates;
  } catch (error) {
    console.log(error, "[GET_ALL_CANDIDATES]");
    return [];
  }
};
