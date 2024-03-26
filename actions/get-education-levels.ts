import { db } from "@/lib/db";

export const getEducationLevels = async () => {
  try {
    const educationLevels = await db.educationLevel.findMany();
    return educationLevels;
  } catch (error) {
    console.log("GET_EDUCATION_LEVELS", error);
    return [];
  }
};
