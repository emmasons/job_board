"use client";

import { useState } from "react";
import Dropzone from "react-dropzone";
import {
  CheckCircle2,
  Cloud,
  FileIcon,
  Loader2,
  StopCircle,
} from "lucide-react";
import { Progress } from "./ui/progress";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { DropZoneVideoFileTypes } from "@/constants";
import { cn } from "@/lib/utils";
import { Accept } from "@/types";

function checkFileType(fileType: string) {
  const videoFileTypes = Object.keys(DropZoneVideoFileTypes);
  return videoFileTypes.includes(fileType);
}

interface FileUploadProps {
  assetId: string;
  fileMessage: string;
  acceptedFileTypes: Accept;
  bucketFileDirectory: string;
  isVideo?: boolean;
  toggleEdit?: () => void;
}

const UploadDropzone = ({
  assetId,
  fileMessage,
  acceptedFileTypes,
  bucketFileDirectory,
  isVideo,
  toggleEdit,
}: FileUploadProps) => {
  const router = useRouter();

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);

  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const startUpload = async function (acceptedFile: File) {
    let fileToUpload = acceptedFile;
    try {
      setIsUploading(true);
      let contentType = acceptedFile.type;
      const isReadableVideoFileType = checkFileType(contentType);
      if (isVideo) {
        if (!isReadableVideoFileType) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "File type not supported",
          });
          setIsError(true);
          return;
        }
      }
      const customFileName = `${assetId}/${fileToUpload.name}`;

      const url = "/api/files/upload";

      var xhr = new XMLHttpRequest();
      xhr.open("PUT", url, true);

      xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            setIsError(false);
            router.refresh();
            toggleEdit?.();
            toast({
              title: "Success",
              description: "Update success.",
              variant: "default",
              className: "bg-green-300 border-0",
            });
          } else {
            setIsError(true);
            toast({
              variant: "destructive",
              title: "Error",
              description: `Upload failed with status.`,
            });
          }
          setIsUploading(false);
        }
      });

      xhr.addEventListener("error", function () {
        setIsUploading(false);
        setIsError(true);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Network error occurred during upload",
        });
      });

      xhr.upload.addEventListener("progress", function (event) {
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100,
          );
          setUploadProgress(percentComplete);
        }
      });

      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("assetId", assetId);
      formData.append("contentType", contentType);
      formData.append("customFileName", customFileName);

      xhr.timeout = 30000; // 30 second timeout
      xhr.send(formData);
      setIsError(false);
      router.refresh();
      toast({
        title: "Success",
        description: "Update success.",
        variant: "default",
        className: "bg-green-300 border-0",
      });
    } catch (error) {
      console.log(error, "#CLIENT ERROR");
      setIsError(true);
      setIsUploading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong!",
      });
    }
  };

  return (
    <Dropzone
      multiple={false}
      accept={acceptedFileTypes}
      onDrop={async (acceptedFile) => {
        // handle file uploading
        try {
          await startUpload(acceptedFile[0]);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps({ onClick: (evt) => evt.preventDefault() })}
          className="my-4 h-60 rounded-lg border border-dashed border-gray-300"
        >
          <div className="flex h-full w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <Cloud className="mb-2 h-6 w-6 text-sky-500" />
                <p className="mb-2 text-sm text-zinc-700">
                  <span className="font-semibold text-sky-500">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-zinc-500">{fileMessage}</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200">
                  <div className="grid h-full place-items-center px-3 py-2">
                    <FileIcon className="text-pes-blue h-4 w-4" />
                  </div>
                  <div className="h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="mx-auto mt-4 w-full max-w-xs">
                  <Progress
                    indicatorColor={
                      uploadProgress === 100 ? "bg-green-500" : ""
                    }
                    value={uploadProgress}
                    className="h-1 flex-1 bg-zinc-200"
                  />

                  <p
                    className={cn(
                      "text-center text-sm italic",
                      uploadProgress === 100 && "text-green-500",
                    )}
                  >
                    {uploadProgress}%
                  </p>

                  {uploadProgress === 100 ? (
                    <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                  ) : null}
                </div>
              ) : null}
              {isError ? (
                <div className="mx-auto mt-4 w-full max-w-xs">
                  <Progress
                    indicatorColor="bg-red-500"
                    value={95}
                    className="h-1 w-full bg-zinc-200"
                  />

                  <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
                    <StopCircle className="h-3 w-3 text-red-500" />
                  </div>
                </div>
              ) : null}

              {isProcessingFile ? (
                <div className="mx-auto mt-4 flex w-full max-w-xs justify-center align-middle">
                  <p className="muted text-sm italic text-green-500">
                    Processing file...
                  </p>
                  <Loader2 className="h-4 w-4 animate-spin text-green-500" />
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export const FileUpload = ({
  assetId,
  toggleEdit,
  fileMessage,
  acceptedFileTypes,
  bucketFileDirectory,
  isVideo = false,
}: FileUploadProps) => {
  return (
    <UploadDropzone
      isVideo={isVideo}
      assetId={assetId}
      fileMessage={fileMessage}
      acceptedFileTypes={acceptedFileTypes}
      bucketFileDirectory={bucketFileDirectory}
      toggleEdit={toggleEdit}
    />
  );
};
