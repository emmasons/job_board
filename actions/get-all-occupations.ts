import { db } from "@/lib/db";

export const getAllOccupations = async () => {
  try {
    const occupations = await db.occupation.findMany({
      include: {
        subOccupations: true,
      },
    });
    return occupations;
  } catch (error) {
    console.log("GET_ALL_OCCUPATIONS", error);
    return [];
  }
};
