"use client";
import { CV, GCPData } from "@prisma/client";
import { FileUpload } from "@/components/FileUpload";
import { DropZoneDocumentFileTypes } from "@/constants";
import { FilePlus, Link, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PDFViewer from "@/components/PDFViewer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  cv: CV;
  cvFile: GCPData | null;
  title: String;
  description: String;
  isJobSeekerComponent: Boolean;
};

const UploadCV = ({ cv, cvFile, isJobSeekerComponent = true }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  return (
    <div className="space-y-4">
      {isJobSeekerComponent && (
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
      )}

      {isJobSeekerComponent &&
        !isEditing &&
        (!cvFile ? (
          <div>
            <FileUpload
              assetId={cv.id}
              fileMessage={"Upload your CV"}
              acceptedFileTypes={DropZoneDocumentFileTypes}
              bucketFileDirectory={`users/${cv.userId}/cv`}
              toggleEdit={toggleEdit}
            />
            <div className="mt-4 text-xs text-muted-foreground">
              PDF or docx recommended.
            </div>
          </div>
        ) : (
          <div className="relative mt-2 h-auto">
            <div className="p-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View CV</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[75%]">
                  <DialogHeader>
                    <DialogTitle>CV</DialogTitle>
                  </DialogHeader>
                  <div>
                    <PDFViewer pdfUrl={cvFile.downloadUrl} />
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            assetId={cv.id}
            fileMessage={"Upload your CV"}
            acceptedFileTypes={DropZoneDocumentFileTypes}
            bucketFileDirectory={`users/${cv.userId}/cv`}
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
