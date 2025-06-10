import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";

export type SessionUser = {
  id: string;
  isVerified: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  registeredUser: boolean;
  role: Role;
  image?: string;
};

export const getCurrentSessionUser = async (): Promise<SessionUser | undefined> => {
  const session = await getServerSession(options);
  let user = session?.user as SessionUser | undefined;
  if (user?.registeredUser) {
    const image = await getLatestFileMetaData(user?.id);
    user.image = image?.downloadUrl;
  }
  return user;
};

