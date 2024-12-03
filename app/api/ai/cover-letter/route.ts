import { NextResponse } from "next/server";
import { callOpenAI } from "@/lib/open_ai";

export async function POST(request: Request) {
  const { jobTitle, companyName, location, yearsOfExperience, keySkills } =
    await request.json();

  const userContent = `Write a professional cover letter for a ${jobTitle} position at ${companyName} in ${location}. I have ${yearsOfExperience} years of experience in the field, with a strong background in ${keySkills}. Please tailor the letter to showcase my skills and experience, and express my enthusiasm for the role.`;

  const result = await callOpenAI(userContent);
  const message = result.choices[0].message.content;
  return NextResponse.json({ message });
}
