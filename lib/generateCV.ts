import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import axios from "axios";
import Docxtemplater from "docxtemplater";
const ImageModuleRaw = require("docxtemplater-image-module-free");
const ImageModule = ImageModuleRaw?.default || ImageModuleRaw;
import ILovePDFApi from "@ilovepdf/ilovepdf-nodejs";
import ILovePDFFile from "@ilovepdf/ilovepdf-nodejs/ILovePDFFile";
import os from "os";

// CV data type
type CVData = {
  name: string;
  title: string;
  profile: string;
  contact_info: string;
  skills: string[];
  achievements: string[];
  experience: {
    role: string;
    place_of_work: string;
    date: string;
    responsibilities: string[];
  }[];
  education: {
    course: string;
    school: string;
    date: string;
    description: string;
  }[];
  referees_list: {
    refname: string;
    role: string;
    contact: string;
  }[];
  photo?: string;
};

async function imageUrlToBase64(url: string): Promise<string> {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    console.log("Image fetched and converted to base64");
    return base64Image;
  } catch (error) {
    console.error(`Failed to fetch image from URL: ${url}`, error);
    return ""; // return empty string so doc generation doesn't break
  }
}

export async function generateCV(data: CVData, templateName = "basic"): Promise<Buffer> {
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

  const imageModule = new ImageModule({
    centered: true,
    getImage(tagValue) {
      console.log("getImage called with tagValue (base64 size):", tagValue?.length);
      return Buffer.from(tagValue, "base64");
    },
    getSize() {
      console.log("getSize called");
      return [150, 150];
    },
  });

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    modules: [imageModule],
  });

  let photoBase64 = "";
  if (data.photo) {
    try {
      photoBase64 = await imageUrlToBase64(data.photo);
      console.log("Photo successfully converted to base64. Length:", photoBase64.length);
      console.log("Photo base64 preview:", photoBase64.slice(0, 40));
    } catch (err) {
      console.error("Photo conversion failed for URL:", data.photo, err);
    }
  } else {
    console.warn("No photo URL provided in data.");
  }

  const docData = {
    ...data,
    photo: photoBase64 || "",
    achievements_exist: data.achievements?.length > 0,
    referees_exist: data.referees_list?.length > 0,
  };

  console.log("Prepared data for rendering. Keys:", Object.keys(docData));
  console.log("Achievements exist?", docData.achievements_exist);
  console.log("Referees exist?", docData.referees_exist);
  console.log("Photo tag value length:", docData.photo.length);
  console.log("ImageModule type:", typeof ImageModule);
  console.log("Is constructor?", typeof ImageModule === "function" ? ImageModule.name : "Not a function");
  console.log("ImageModule full object:", ImageModule);
  console.log("ImageModule name:", ImageModule.name);



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


// Wrap CV generation and PDF conversion
export async function generateCVBuffer(data: CVData & { template?: string }, format = "docx"): Promise<Buffer> {
  const templateName = data.template || "basic"; // <- get the template from the request data
  const docxBuffer = await generateCV(data, templateName); // <- pass it here

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
