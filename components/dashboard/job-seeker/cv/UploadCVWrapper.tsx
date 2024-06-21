import { GCPData } from "@prisma/client";
import UploadCV from "./UploadCV";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";

type Props = {
  assetId: string;
};

const UploadCVWrapper = async ({ assetId }: Props) => {
  const cvFile = await getLatestFileMetaData(assetId);
  return (
    <div>
      <UploadCV assetId={assetId} cvFile={cvFile} />
    </div>
  );
};

export default UploadCVWrapper;
