import { db } from "@/lib/db";
import { CV } from "@prisma/client";

export const getUserCv = async (userId: string): Promise<CV | null> => {
  let cv = await db.cV.findUnique({
    where: {
      userId,
    },
  });
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
