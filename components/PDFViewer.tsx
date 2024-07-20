import React from "react";

type Props = {
  pdfUrl: string;
};

const PDFViewer = ({ pdfUrl }: Props) => {
  return (
    <iframe
      src={pdfUrl}
      frameBorder="0"
      allowFullScreen
      width="100%"
      height="600px"
    ></iframe>
  );
};

export default PDFViewer;
