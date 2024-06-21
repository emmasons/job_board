"use client";
import { CV, GCPData } from "@prisma/client";
import { FileUpload } from "@/components/FileUpload";
import { DropZoneDocumentFileTypes } from "@/constants";
import { FilePlus, Link, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  assetId: string;
  cvFile: GCPData | null;
};

const UploadCV = ({ assetId, cvFile }: Props) => {
  const [isEditing, setIsEditing] = useState(cvFile === null);

  const toggleEdit = () => setIsEditing((current) => !current);
  return (
    <div className="space-y-4">
      <Button onClick={toggleEdit} variant="ghost">
        {isEditing && <>Cancel</>}
        {!isEditing && !cvFile && (
          <>
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload CV
          </>
        )}
        {!isEditing && cvFile && (
          <>
            <Pencil className="mr-2 h-4 w-4" />
            Edit CV
          </>
        )}
      </Button>
      {!isEditing &&
        (!cvFile ? (
          <div className="flex h-auto items-center justify-center rounded-md bg-slate-200 p-4">
            <FilePlus className="h-10 w-10 text-sky-500" />
          </div>
        ) : (
          <div className="relative mt-2 h-auto">
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
            </div>
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            assetId={assetId}
            fileMessage={"Upload your CV"}
            acceptedFileTypes={DropZoneDocumentFileTypes}
            bucketFileDirectory={`users/${assetId}/cv`}
            toggleEdit={toggleEdit}
          />
          <div className="mt-4 text-xs text-muted-foreground">
            PDF or docx recommended.
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCV;
