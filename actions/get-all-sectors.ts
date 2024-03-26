import { db } from "@/lib/db";

export const getAllSectors = async () => {
  try {
    const sectors = await db.sector.findMany();
    return sectors;
  } catch (error) {
    console.log("GET_ALL_SECTORS", error);
    return [];
  }
};
