export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
import { OpenAI } from 'openai';
import path from 'path';
import os from 'os';
import fs from 'fs';
import ILovePDFApi from "@ilovepdf/ilovepdf-nodejs";
import ILovePDFFile from "@ilovepdf/ilovepdf-nodejs/ILovePDFFile";

export const dynamic = 'force-dynamic';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function base64ToBuffer(base64: string): Buffer {
  const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;
  return Buffer.from(base64Data, 'base64');
}

async function extractTextFromPDFWithILovePDF(buffer: Buffer, filename: string): Promise<string> {
  const publicKey = process.env.ILOVEPDF_PUBLIC_KEY;
  const secretKey = process.env.ILOVEPDF_SECRET_KEY;

  if (!publicKey || !secretKey) {
    throw new Error("iLovePDF API keys are not set in environment variables.");
  }

  const ilovepdf = new ILovePDFApi(publicKey, secretKey);

  const task = ilovepdf.newTask('extract');
  await task.start();

  const tempFilePath = path.join(os.tmpdir(), filename);
  fs.writeFileSync(tempFilePath, buffer);

  const file = new ILovePDFFile(tempFilePath);
  await task.addFile(file);
  await task.process();

  const downloadedBuffer: Buffer = Buffer.from(await task.download());

  fs.unlinkSync(tempFilePath);

  const txtContent = downloadedBuffer.toString('utf-8').trim();
  if (!txtContent || txtContent.length < 100) {
    throw new Error("iLovePDF extraction failed or returned insufficient content.");
  }

  return txtContent;
}

export async function POST(req: Request) {
  try {
    const { fileType, fileData, additional_info } = await req.json();

    if (!fileData || !fileType) {
      return NextResponse.json({ success: false, error: 'Missing file data or file type' });
    }

    const buffer = base64ToBuffer(fileData);
    let extractedText = '';

    if (fileType === 'application/pdf') {
      // Try iLovePDF extraction instead of local pdf-parse
      extractedText = await extractTextFromPDFWithILovePDF(buffer, 'upload.pdf');

    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value.trim();
    } else {
      return NextResponse.json({ success: false, error: 'Unsupported file type' });
    }

    const userAdditionalInfo = typeof additional_info === 'string' ? additional_info : '';

    const prompt = `
Create a professional CV based on the following details:

Extracted Data from the Uploaded CV:
${extractedText}

Additional Info Provided by the User:
${userAdditionalInfo}

Each work experience must contain at least 8-10 responsibilities. Each responsibility should be detailed to showcase contributions. This is mandatory.

Structure the CV in this JSON format exactly:

{
  "Name": "",
  "Profession": "",
  "Summary": "Generate a professional and general career summary without using specific names. The summary should focus on key industry-related skills, expertise, and experience rather than personal details. It should be written in the first person, maintaining a formal and professional tone. Ensure the summary is between 200-300 words, emphasizing broad strengths, key responsibilities, and industry expertise relevant to the role.",
  "WorkExperience": [
    {
      "Position": "",
      "Company": "",
      "Duration": "",
      "Responsibilities": [
        "List 8-10 key responsibilities per role. Each responsibility must demonstrate skills, achievements, and impact."
      ]
    }
  ],
  "Education": [
    {
      "Course": "",
      "Institution": "",
      "Duration": ""
    }
  ],
  "Skills": [
    "List 7-12 key skills, focusing on both technical and soft skills relevant to the role."
  ],
  "Achievements": [
    "List quantifiable achievements, certifications, awards, or special recognitions if provided."
  ],
  "Referees": [
    {
      "Name": "",
      "Role": "",
      "Contact": ""
    }
  ],
  "Contact": {
    "Phone": "",
    "Email": ""
  }
}

Please:
- Focus the Skills section on key abilities relevant to the job.
- Tailor the CV to highlight strengths, achievements, and professional journey clearly.
- Include Achievements and Referees only if data is present.
- Do not change or add field names.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a professional CV writer.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 3000,
      temperature: 0,
    });

    const aiResponse = completion.choices[0].message.content ?? '{}';

    let parsedData;
    try {
      parsedData = JSON.parse(aiResponse);
    } catch {
      const cleaned = aiResponse.replace(/```json|```/g, '').trim();
      try {
        parsedData = JSON.parse(cleaned);
      } catch {
        return NextResponse.json({ success: false, error: 'Failed to parse AI JSON response' });
      }
    }

    return NextResponse.json({ success: true, ...parsedData });
  } catch (error) {
    console.error('Error in /generate-professional-cv:', error);
    return NextResponse.json({ success: false, error: 'Failed to process CV' });
  }
}
