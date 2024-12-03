"use server";
import { db } from "@/lib/db";
export async function saveCoverLetter(content: string, applicationId: string) {
  try {
    await db.coverLetter.create({
      data: {
        content,
        applicationId,
      },
    });
  } catch (error) {
    console.log("SAVE_COVER_LETTER", error);
  }
}
