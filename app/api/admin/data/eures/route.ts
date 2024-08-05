import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role, WorkSchedule, ContractType, JOBSOURCE } from "@prisma/client";
import countries from "country-list";

function prepareWorkSchedule(scrapedSchedule) {
  if (!scrapedSchedule) WorkSchedule.NOT_SPECIFIED;
  if (scrapedSchedule === "Full-time") return WorkSchedule.FULL_TIME;
  if (scrapedSchedule === "Part-time") return WorkSchedule.PART_TIME;
  if (scrapedSchedule === "Not specified") return WorkSchedule.NOT_SPECIFIED;
  if (scrapedSchedule === "Contractor") return WorkSchedule.CONTRACTOR;
  if (scrapedSchedule === "Seasonal") return WorkSchedule.SEASONAL;
}

function prepareContractType(contractType) {
  switch (contractType) {
    case "Internship":
      return ContractType.INTERNSHIP;
    case "Direct hire":
      return ContractType.DIRECT_HIRE;
    case "Not specified":
      return ContractType.NOT_SPECIFIED;
    case "Contract to hire":
      return ContractType.CONTRACT_TO_HIRE;
    case "Temporary":
      return ContractType.TEMPORARY;
    case "Temporary to hire":
      return ContractType.TEMPORARY_TO_HIRE;
    case "Self employed":
      return ContractType.SELF_EMPLOYED;
    case "Contract":
      return ContractType.CONTRACT;
    case "Seasonal":
      return ContractType.SEASONAL;
    case "Apprenticeship":
      return ContractType.APPRENTICESHIP;
    case "Recruitment reserve":
      return ContractType.RECRUITMENT_RESERVE;
    case "On Call":
      return ContractType.ON_CALL;
    case "Volunteer":
      return ContractType.VOLUNTEER;
    default:
      return ContractType.NOT_SPECIFIED;
  }
}

function transformSectorsData(sector, sectors) {
  const sectorLabel = sectors.find((s) => {
    const similarity = require("string-similarity").compareTwoStrings(
      sector,
      s.label,
    );
    return similarity >= 0.8;
  })?.label;
  if (sectorLabel) {
    return sectorLabel;
  } else {
    return null;
  }
}

function transformEducationData(educationLevel, educationLevels) {
  const educationLabel = educationLevels.find((s) => {
    const similarity = require("string-similarity").compareTwoStrings(
      educationLevel,
      s.label,
    );
    return similarity >= 0.85;
  })?.label;
  if (educationLabel) {
    return educationLabel;
  } else {
    return null;
  }
}

function transformExperienceData(experience, experienceLevels) {
  const experienceLabel = experienceLevels.find((s) => {
    const similarity = require("string-similarity").compareTwoStrings(
      experience,
      s.label,
    );
    return similarity >= 0.85;
  })?.label;
  if (experienceLabel) {
    return experienceLabel;
  } else {
    return null;
  }
}

function transformCountry(country) {
  if (!country) return "Not specified";
  const countryList = countries.getNames();
  const countrySimilarity = countryList.find((c) => {
    const similarity = require("string-similarity").compareTwoStrings(
      country,
      c,
    );
    return similarity >= 0.6;
  });
  if (countrySimilarity) {
    return countrySimilarity;
  } else {
    return "Not specified";
  }
}

function transformDatePosted(datePosted) {
  let date = new Date(datePosted);
  if (isNaN(date.getTime())) {
    date = new Date();
  }
  const isoString = date.toISOString();
  return isoString.slice(0, 19) + "Z";
}

async function transformEurosData() {
  const scrapedJobs = await db.scrapedJob.findMany();

  if (!scrapedJobs || !scrapedJobs.length) return;
  const sectors = await db.sector.findMany();
  const educationLevels = await db.educationLevel.findMany();
  const experienceLevels = await db.experience.findMany();
  const transformedJobs = scrapedJobs.map((job) => {
    const {
      workSchedule,
      numberOfPositions,
      contractType,
      sector,
      educationLevel,
      experienceLevel,
      id,
      datePosted,
      company,
      country,
      ...jobWithoutWorkSchedule
    } = job;
    const transformedJob = {};
    const transformedWorkSchedule = prepareWorkSchedule(workSchedule);
    const transformedContractType = prepareContractType(contractType);
    const transformedSector = transformSectorsData(sector, sectors);
    const transformedEducationLevel = transformEducationData(
      educationLevel,
      educationLevels,
    );
    const transformedExperienceLevel = transformExperienceData(
      experienceLevel,
      experienceLevels,
    );
    const transformedCountry = transformCountry(country);
    transformedJob["companyName"] = transformDatePosted(company);
    transformedJob["datePosted"] = transformDatePosted(datePosted);
    transformedJob["country"] = transformedCountry;
    transformedJob["experienceId"] = transformedExperienceLevel;
    transformedJob["educationLevelId"] = transformedEducationLevel;
    transformedJob["sectorId"] = transformedSector;
    transformedJob["workSchedule"] = transformedWorkSchedule;
    transformedJob["contractType"] = transformedContractType;
    return {
      ...transformedJob,
      ...jobWithoutWorkSchedule,
      numberOfPositions: parseInt(job.numberOfPositions),
    };
  });

  return transformedJobs;
}
export async function POST(req: Request) {
  const user = await getCurrentSessionUser();
  const userId = user?.id;

  if (!userId || !(user.role === Role.ADMIN)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const tranformedData = await transformEurosData();
  if (!tranformedData || !tranformedData.length) {
    return NextResponse.json({ message: "No data" }, { status: 200 });
  }
  try {
    console.log(tranformedData[0]);
    // await db.job.createMany({
    //   data: {
    //     ...tranformedData,
    //     isOpen: false,
    //     source: JOBSOURCE.SCRAPPER,
    //   },
    //   skipDuplicates: true,
    // });
    tranformedData.forEach(async (job) => {
      if ((job.title, job.description)) {
        await db.job.create({
          data: {
            ...job,
            isOpen: false,
            source: JOBSOURCE.SCRAPPER,
          },
        });
      }
    });

    await db.scrapedJob.deleteMany();

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log("[EURES DATA]", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again" },
      { status: 500 },
    );
  }
}
