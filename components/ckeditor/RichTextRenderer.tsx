"use client";

import dynamic from "next/dynamic";
import React from "react";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );

  // Override the default style of the react-quill package
  // so that the font is size 1.4rem
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .ql-editor {
        font-size: 1rem;
        padding: 0;
        font-family: sans-serif;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ReactQuill
      theme="bubble"
      value={value}
      readOnly
    />
  );
};
