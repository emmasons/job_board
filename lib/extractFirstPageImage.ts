// lib/extractFirstPageImage.ts
import fs from "fs";
import path from "path";
import os from "os";
import sharp from "sharp";
import ILovePDFApi from "@ilovepdf/ilovepdf-nodejs";
import ILovePDFFile from "@ilovepdf/ilovepdf-nodejs/ILovePDFFile";

// 1. Convert DOCX to PDF using iLovePDF
async function convertDocxToPDF(docBuffer: Buffer, filename: string): Promise<Buffer> {
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

    const finalFilename = filename.endsWith('.docx') ? filename : `${filename}.docx`;
    const tempFilePath = path.join(os.tmpdir(), finalFilename);
    fs.writeFileSync(tempFilePath, docBuffer);
    console.log("Temporary DOCX file written at:", tempFilePath);

    const file = new ILovePDFFile(tempFilePath);

    await task.addFile(file);

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

// 2. Convert first page of PDF to image using iLovePDF's 'pdfjpg' task
export async function extractFirstPageImageFromBuffer(
  docBuffer: Buffer,
  format: "pdf" | "docx",
  filename = "cv.docx"
): Promise<Buffer> {
  const publicKey = process.env.ILOVEPDF_PUBLIC_KEY;
  const secretKey = process.env.ILOVEPDF_SECRET_KEY;

  if (!publicKey || !secretKey) {
    throw new Error("iLovePDF public and secret keys are required in environment variables.");
  }

  const ilovepdf = new ILovePDFApi(publicKey, secretKey);
  const pdfBuffer = format === "pdf" ? docBuffer : await convertDocxToPDF(docBuffer, filename);

  // Save the PDF to a temporary file
  const tempPdfPath = path.join(os.tmpdir(), `converted-${Date.now()}.pdf`);
  fs.writeFileSync(tempPdfPath, pdfBuffer);

  const task = ilovepdf.newTask("pdfjpg");
  await task.start();

  const file = new ILovePDFFile(tempPdfPath);
  await task.addFile(file);
  await task.process();

  const resultBuffer: Uint8Array = await task.download();
  fs.unlinkSync(tempPdfPath);

  // Check if the result is a ZIP file or a single JPG
  const isZip = resultBuffer[0] === 0x50 && resultBuffer[1] === 0x4B; // 'PK'

  let originalImageBuffer: Buffer;

  if (isZip) {
    const AdmZip = require("adm-zip");
    const zip = new AdmZip(resultBuffer);
    const entries = zip.getEntries();

    console.log("Zip Entries:");
    entries.forEach(e => console.log(e.entryName));

    // Try to find a file ending with -0001.jpg first
    let firstImageEntry = entries.find(entry =>
      entry.entryName.toLowerCase().endsWith("-0001.jpg")
    );

    // Fallback: if not found, grab the first JPG file available
    if (!firstImageEntry) {
      firstImageEntry = entries.find(entry =>
        entry.entryName.toLowerCase().endsWith(".jpg")
      );
    }

    if (!firstImageEntry) {
      throw new Error("Could not find any JPG image in the iLovePDF zip.");
    }

    originalImageBuffer = firstImageEntry.getData();
  } else {
    // Single JPG returned directly
    originalImageBuffer = Buffer.from(resultBuffer);
  }

  // Resize and compress image using sharp
  const resizedImageBuffer = await sharp(originalImageBuffer)
    .resize(800) // width: 800px (auto height)
    .jpeg({ quality: 70 })
    .toBuffer();

  return resizedImageBuffer;
}
