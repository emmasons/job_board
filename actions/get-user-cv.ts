import { db } from "@/lib/db";
import { CV } from "@prisma/client";

export const getUserCv = async (userId: string): Promise<CV> => {
  let cv;
  try {
    cv = await db.cV.findUnique({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
  }

  if (!cv || cv === null) {
    try {
      cv = await db.cV.create({
        data: {
          userId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  return cv;
};
