"use client";
import "ckeditor5/ckeditor5.css";
import "./ck_style.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  return (
    <div className="ck-content" dangerouslySetInnerHTML={{ __html: value }} />
  );
};
