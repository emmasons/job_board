"use client";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  pdfUrl: string;
};

const PDFViewer = ({ pdfUrl }: Props) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  return (
    <div className="relative">
      <iframe
        src={pdfUrl}
        frameBorder="0"
        allowFullScreen
        width="100%"
        height="600px"
        onLoad={() => setIsLoaded(true)}
      ></iframe>
      {isLoaded ? null : (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform flex items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm text-muted-foreground">Fetching file...</p>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
