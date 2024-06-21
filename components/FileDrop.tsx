import { Cloud } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  setFiles: (files: File[]) => void;
};

function FileDrop({ setFiles }: Props) {
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
  });

  return (
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
            <span className="font-semibold text-sky-500">Click to upload </span>
            or drag and drop
          </p>
        </div>
      )}
    </div>
  );
}

export default FileDrop;
