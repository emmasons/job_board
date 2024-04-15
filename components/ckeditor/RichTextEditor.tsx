"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  url?: string;
}

const RichTextEditor = ({ url, value, onChange }: RichTextEditorProps) => {
  const CustomCkeditor = useMemo(
    () => dynamic(() => import("./Ckeditor"), { ssr: false }),
    [],
  );

  return (
    <>
      <CustomCkeditor
        uploadUrl="/api/editor/assets/"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default RichTextEditor;
