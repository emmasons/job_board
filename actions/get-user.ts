import { db } from "@/lib/db";
import { Address, Profile, User } from "@prisma/client";

export async function getUserById(
  userId: string
): Promise<(User & { profile: Profile; address: Address }) | null> {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
        address: true,
      },
    });
    return user;
  } catch (error) {
    console.log("GET_USER", error);
    return null;
  }
}
