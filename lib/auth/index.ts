import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const getCurrentSessionUser = async () => {
  const session = await getServerSession(options);
  const user = session?.user;
  return user;
};
