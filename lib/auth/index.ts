import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const getCurrentSessionUser = async () => {
  const session = await getServerSession(options);
  let user = session?.user;
  if (user?.registeredUser) {
    const image = await getLatestFileMetaData(user?.id);
    user.image = image?.downloadUrl;
  }
  return user;
};
