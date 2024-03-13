const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function createEducationLevels() {
  const levels = await database.educationLevel.findMany();
  if (levels.length > 0) return;
  try {
    await database.educationLevel.createMany({
      data: [
        { label: "Early childhood education" },
        { label: "Primary education" },
        { label: "Lower secondary education" },
        { label: "Upper secondary education" },
        { label: "Post-secondary non-tertiary" },
        { label: "Short-cycle tertiary education" },
        { label: "Bachelor&apos;s or equivalent level" },
        { label: "Master&apos;s or equivalent level" },
        { label: "Doctoral or equivalent level" },
        { label: "Not specified" },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log(error);
  } finally {
    await database.$disconnect();
  }
}
async function createExperienceLevels() {
  const levels = await database.experience.findMany();
  if (levels.length > 0) return;
  try {
    await database.experience.createMany({
      data: [
        { label: "None required" },
        { label: "Upto 1 year" },
        { label: "1-2 years" },
        { label: "2-5 years" },
        { label: "More than 5 years" },
        { label: "Not specified" },
      ],
    });
  } catch (error) {
    console.log(error);
  } finally {
    await database.$disconnect();
  }
}

async function createSectors() {
  const sectors = await database.sector.findMany();
  if (sectors.length > 0) return;
  try {
    await database.sector.createMany({
      data: [
        { label: "ADMINISTRATIVE AND SUPPORT SERVICE ACTIVITIES" },
        { label: "INFORMATION AND COMMUNICATION" },
        { label: "EDUCATION" },
        { label: "PROFESSIONAL, SCIENTIFIC AND TECHNICAL ACTIVITIES" },
        { label: "HUMAN HEALTH AND SOCIAL WORK ACTIVITIES" },
        { label: "MANUFACTURING" },
        { label: "FINANCIAL AND INSURANCE ACTIVITIES" },
        {
          label:
            "WHOLESALE AND RETAIL TRADE; REPAIR OF MOTOR VEHICLES AND MOTORCYCLES",
        },
        { label: "CONSTRUCTION" },
        { label: "OTHER SERVICE ACTIVITIES" },
        {
          label:
            "PUBLIC ADMINISTRATION AND DEFENCE; COMPULSORY SOCIAL SECURITY",
        },
        { label: "REAL ESTATE ACTIVITIES" },
        { label: "TRANSPORTATION AND STORAGE" },
        { label: "ARTS, ENTERTAINMENT AND RECREATION" },
        { label: "ACCOMMODATION AND FOOD SERVICE ACTIVITIES" },
        { label: "ELECTRICITY, GAS, STEAM AND AIR CONDITIONING SUPPLY" },
        { label: "Not Specified" },
        {
          label:
            "WATER SUPPLY; SEWERAGE, WASTE MANAGEMENT AND REMEDIATION ACTIVITIES",
        },
        { label: "MINING AND QUARRYING" },
        { label: "AGRICULTURE, FORESTRY AND FISHING" },
        {
          label:
            "ACTIVITIES OF HOUSEHOLDS AS EMPLOYERS; UNDIFFERENTIATED GOODS- AND SERVICES-PRODUCING ACTIVITIES OF HOUSEHOLDS FOR OWN USE",
        },
        { label: "ACTIVITIES OF EXTRATERRITORIAL ORGANISATIONS AND BODIES" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log(error);
  } finally {
    await database.$disconnect();
  }
}

async function main() {
  await createEducationLevels();
  await createExperienceLevels();
  await createSectors();
}

main();
