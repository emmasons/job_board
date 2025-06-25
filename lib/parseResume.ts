import mammoth from "mammoth";
import ILovePDFApi from "@ilovepdf/ilovepdf-nodejs";
import ILovePDFFile from "@ilovepdf/ilovepdf-nodejs/ILovePDFFile";
import path from "path";
import os from "os";
import fs from "fs";

// Helper function to clean noisy TXT
function cleanExtractedText(text: string): string {
  return text
    .replace(/[\u0000-\u001F\u007F-\u009F\u200B\uFEFF]/g, "") // control chars
    .replace(/[^\x00-\x7F]+/g, "") // non-ASCII (optional)
    .replace(/\s{2,}/g, " ") // collapse excessive spaces
    .replace(/([^\S\r\n]*\n[^\S\r\n]*)+/g, "\n") // tidy line breaks
    .trim();
}

export async function parseResumeFile(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name;

  // Handle PDF by converting to .txt using iLovePDF
  if (fileName.endsWith(".pdf")) {
    const txtBuffer = await convertPdfToTxt(buffer, fileName);
    const rawText = txtBuffer.toString("utf-8");
    const cleanText = cleanExtractedText(rawText);
    return cleanText;
  }

  // Handle DOCX using Mammoth
  if (fileName.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  }

  // Handle plain TXT directly
  if (fileName.endsWith(".txt")) {
    return buffer.toString("utf-8").trim();
  }

  throw new Error("Unsupported file type");
}

async function convertPdfToTxt(pdfBuffer: Buffer, filename: string): Promise<Buffer> {
  const publicKey = process.env.ILOVEPDF_PUBLIC_KEY;
  const secretKey = process.env.ILOVEPDF_SECRET_KEY;

  if (!publicKey || !secretKey) {
    throw new Error("iLovePDF API keys missing in environment variables");
  }

  const ilovepdf = new ILovePDFApi(publicKey, secretKey);
  const task = ilovepdf.newTask("extract"); // Extract text from PDF

  await task.start();

  const tempPath = path.join(os.tmpdir(), filename);
  fs.writeFileSync(tempPath, pdfBuffer);

  const file = new ILovePDFFile(tempPath);
  await task.addFile(file);

  await task.process();

  const data: Uint8Array = await task.download(); 
  fs.unlinkSync(tempPath); 

  return Buffer.from(data);
}
