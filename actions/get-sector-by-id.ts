import { db } from "@/lib/db";

export const getSectorById = async (id: string) => {
  try {
    const sector = await db.sector.findUnique({
      where: {
        id,
      },
    });
    return sector;
  } catch (error) {
    console.log("GET_SECTOR_BY_ID", error);
    return null;
  }
};
