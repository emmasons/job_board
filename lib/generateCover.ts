import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import ILovePDFApi from "@ilovepdf/ilovepdf-nodejs";
import ILovePDFFile from "@ilovepdf/ilovepdf-nodejs/ILovePDFFile";
import os from "os";

// Cover data type
type CoverData = {
  full_name: string;
  job_title: string;
  address: string;
  email: string;
  phone_number: string;
  company_name: string;
  job_applied: string;
  hiring_manager_name: string;
  cover_letter_body: string[];
};


export async function generateCover(data: CoverData, templateName = "impact"): Promise<Buffer> {
  const templateFileName = `${templateName}.docx`;
  const templatePath = path.resolve(process.cwd(), "public/templates", templateFileName);

  console.log("Template path resolved:", templatePath);

  if (!fs.existsSync(templatePath)) {
    console.error("Template file does not exist at path:", templatePath);
    throw new Error(`Template file not found: ${templatePath}`);
  }

  const content = fs.readFileSync(templatePath, "binary");
  console.log("Template file read successfully. Size (bytes):", content.length);

  const zip = new PizZip(content);
  console.log("PizZip loaded");


  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  const docData = {
    ...data,
    hiring_manager_name_exist: data.hiring_manager_name?.length > 0,
  };

  console.log("Prepared data for rendering. Keys:", Object.keys(docData));

  try {
    doc.render(docData);
    console.log("Document rendered successfully.");
  } catch (error: any) {
    console.error("Template rendering failed:", error);
    throw new Error("Template rendering error: " + error.message);
  }

  const outputBuffer = doc.getZip().generate({ type: "nodebuffer" });
  console.log("DOCX buffer generated. Size (bytes):", outputBuffer.length);

  return outputBuffer;
}


// iLovePDF conversion using official SDK style
export async function convertDocxToPDF(docBuffer: Buffer, filename: string): Promise<Buffer> {
  const publicKey = process.env.ILOVEPDF_PUBLIC_KEY;
  const secretKey = process.env.ILOVEPDF_SECRET_KEY;

  if (!publicKey || !secretKey) {
    throw new Error("iLovePDF public and secret keys are required in environment variables.");
  }

  const ilovepdf = new ILovePDFApi(publicKey, secretKey);

  try {
    console.log("Starting iLovePDF task...");
    const task = ilovepdf.newTask("officepdf");

    await task.start();
    console.log("Task started.");

    const tempFilePath = path.join(os.tmpdir(), filename);
    fs.writeFileSync(tempFilePath, docBuffer);
    console.log("Temporary DOCX file written at:", tempFilePath);

    const file = new ILovePDFFile(tempFilePath);
    console.log("File wrapped for upload.");

    await task.addFile(file);
    console.log("File added to task.");

    await task.process();
    console.log("Task processed.");

    const data: Uint8Array = await task.download();
    console.log("PDF downloaded.");

    fs.unlinkSync(tempFilePath);
    console.log("Temporary file deleted.");

    const pdfBuffer = Buffer.from(data);
    if (!pdfBuffer || pdfBuffer.length < 1000) {
      throw new Error("PDF conversion failed or returned an empty buffer.");
    }

    return pdfBuffer;
  } catch (err) {
    console.error("iLovePDF conversion error:", err);
    throw err;
  }
}


// Wrap Cover generation and PDF conversion
export async function generateCoverBuffer(data: CoverData & { template?: string }, format = "docx"): Promise<Buffer> {
  const templateName = data.template || "impact"; 
  const docxBuffer = await generateCover(data, templateName); 

  if (format === "pdf") {
    try {
      return await convertDocxToPDF(docxBuffer, "cv.docx");
    } catch (error) {
      console.error("PDF conversion failed:", error);
      throw error;
    }
  }

  return docxBuffer;
}
