import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const jobs = await db.job.findMany({
    select: {
      country: true,
    },
    distinct: ["country"],
    where: {
      country: {
        
        notIn: ["", " "], 
      },
    },
  });

  const countries = jobs
    .map((j) => j.country)
    .filter((country): country is string => Boolean(country));

  return NextResponse.json(countries);
}
