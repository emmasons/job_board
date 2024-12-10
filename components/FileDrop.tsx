import { Accept } from "@/types";
import { Cloud } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  setFiles: (files: File[]) => void;
  message?: string;
  acceptedFileTypes: Accept;
};

function FileDrop({ setFiles, message, acceptedFileTypes = {} }: Props) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      setFiles(acceptedFiles);
    },
    [setFiles],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: acceptedFileTypes,
  });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className="flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-200"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <Cloud className="mb-2 h-6 w-6 text-sky-500" />
            <p className="mb-2 text-sm text-zinc-700">
              <span className="font-semibold text-sky-500">
                Click to upload{" "}
              </span>
              or drag and drop
            </p>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export default FileDrop;
