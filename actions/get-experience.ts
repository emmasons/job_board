import { db } from "@/lib/db";

export const getExperience = async () => {
  try {
    const experience = await db.experience.findMany();
    return experience;
  } catch (error) {
    console.log("GET_EXPERIENCE", error);
    return [];
  }
};
