import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { CV } from "@prisma/client";
import { FileUpload } from "@/components/FileUpload";
import { DropZoneDocumentFileTypes } from "@/constants";
import { Link } from "lucide-react";

type Props = {
  cv: CV;
};

const UploadCV = async ({ cv }: Props) => {
  const cvFile = await getLatestFileMetaData(cv.id);
  return (
    <div>
      {cvFile ? (
        <div className="bg-slate-200 p-6">
          <a
            href={cvFile.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pes-red flex items-center text-sm font-semibold underline"
          >
            View current CV
            <Link className="ml-2 h-4 w-4" />
          </a>
          <FileUpload
            assetId={cv.id}
            fileMessage={"Change your CV"}
            acceptedFileTypes={DropZoneDocumentFileTypes}
            bucketFileDirectory={`users/${cv.userId}/cv`}
          />
        </div>
      ) : (
        <div className="bg-slate-200 p-6">
          <p className="text-sm font-semibold italic text-foreground text-zinc-500">
            You have not uploaded any cv yet
          </p>
          <FileUpload
            assetId={cv.id}
            fileMessage={"Upload your CV"}
            acceptedFileTypes={DropZoneDocumentFileTypes}
            bucketFileDirectory={`users/${cv.userId}/cv`}
          />
        </div>
      )}
    </div>
  );
};

export default UploadCV;
