const { PrismaClient, WorkSchedule, ContractType } = require("@prisma/client");

const database = new PrismaClient();

function prepareWorkSchedule(scrapedSchedule) {
  if (!scrapedSchedule) WorkSchedule.NOT_SPECIFIED;
  if (scrapedSchedule === "Full-time") return WorkSchedule.FULL_TIME;
  if (scrapedSchedule === "Part-time") return WorkSchedule.PART_TIME;
  if (scrapedSchedule === "Not specified") return WorkSchedule.NOT_SPECIFIED;
  if (scrapedSchedule === "Contract") return WorkSchedule.CONTRACT;
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

async function transformEurosData() {
  const scrapedJobs = await database.scrapedJob.findMany();
  const sectors = await database.sector.findMany();
  const educationLevels = await database.educationLevel.findMany();
  const experienceLevels = await database.experience.findMany();
  const transformedJobs = scrapedJobs.map((job) => {
    const {
      workSchedule,
      numberOfPositions,
      contractType,
      sector,
      educationLevel,
      experienceLevel,
      id,
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
    transformedJob["experienceLevel"] = transformedExperienceLevel;
    transformedJob["educationLevel"] = transformedEducationLevel;
    transformedJob["sector"] = transformedSector;
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

(async function main() {
  const data = await transformEurosData();

  try {
    await data.map((job) => {
      if (job && job.title) {
        console.log(job.experienceLevel);
        // return database.job.create({
        //   data: { ...job },
        // });
      }
      return Promise.resolve(); // explicitly return a promise for clarity
    });
  } catch (error) {
    console.log(error);
  }
})();
