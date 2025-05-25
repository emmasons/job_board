"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PdfGeneratorProps {
  contentId: string;
  fileName?: string;
}

export const PdfGenerator = ({
  contentId,
  fileName = "cover-letter",
}: PdfGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById(contentId);

      if (!element) {
        throw new Error("Content element not found");
      }

      // Clone the element to avoid modifying the original
      const clonedElement = element.cloneNode(true) as HTMLElement;

      // Set explicit dimensions and styles for PDF generation
      clonedElement.style.width = "210mm";
      clonedElement.style.padding = "20mm";
      clonedElement.style.backgroundColor = "white";

      const opt = {
        margin: 0,
        filename: `${fileName}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      await html2pdf().from(clonedElement).set(opt).save();
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={generatePDF} disabled={isGenerating} variant="default">
      {isGenerating ? "Generating PDF..." : "Download PDF"}
    </Button>
  );
};
