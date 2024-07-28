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
        { label: "Bachelor's or equivalent level" },
        { label: "Master's or equivalent level" },
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

async function createOccupations() {
  const sectors = await database.occupation.findMany();
  if (sectors.length > 0) return;
  try {
    const data = [
      {
        title: "Armed forces",
        subOccupations: [
          { title: "Armed forces occupations, other ranks" },
          { title: "Commissioned armed forces officers" },
          { title: "Non-commissioned armed forces officers" },
        ],
      },
      {
        title: "Managers",
        subOccupations: [
          { title: "Chief executives, senior officials and legislators" },
          { title: "Administrative and commercial managers" },
          { title: "Financial managers" },
          { title: "Human resources managers" },
          { title: "Information technology managers" },
          { title: "Marketing managers" },
          { title: "Project managers" },
          { title: "Purchasing managers" },
          { title: "Quality assurance managers" },
          { title: "Research and development managers" },
          { title: "Hospitality, retail and other services managers" },
          { title: "Production and specialised services managers" },
          { title: "Wholesale and retail trade managers" },
        ],
      },
      {
        title: "Professionals",
        subOccupations: [
          { title: "Professionals, other ranks" },
          { title: "Teaching professionals" },
          { title: "Non-teaching professionals" },
          { title: "Health professionals" },
          { title: "Legal, social and cultural professionals" },
          {
            title: "Information and communications technology professionals",
          },
          { title: "Database and network professionals" },
          { title: "Software and applications developers and analysts" },
          { title: "Web and digital content professionals" },
          { title: "Business and administration professionals" },
          { title: "Science and engineering professionals" },
        ],
      },
      {
        title: "Technicians and associate professionals",
        subOccupations: [
          { title: "Health associate professionals" },
          { title: "Science and engineering associate professionals" },
          { title: "Business and administration associate professionals" },
          { title: "Computing and information associate professionals" },
          { title: "Legal, social and cultural associate professionals" },
        ],
      },
      {
        title: "Clerical support workers",
        subOccupations: [
          { title: "Customer service clerks" },
          { title: "Other clerical support workers" },
          { title: "General and keyboard clerks" },
          { title: "Typists and word processing operators" },
          { title: "Proofreaders and copy mappers" },
          { title: "Information and record clerks" },
          { title: "Stationary clerks" },
          { title: "Travel attendants and travel stewards" },
          { title: "Library, filing and reference clerks" },
          { title: "Numerical control operators" },
          { title: "Numerical processors" },
        ],
      },
      {
        title: "Service and sales workers",
        subOccupations: [
          { title: "Personal service workers" },
          { title: "Sales workers" },
          { title: "Protective service workers" },
          { title: "Personal care workers" },
          { title: "Animal care and service workers" },
          { title: "Health care service workers" },
          { title: "Child care workers" },
          { title: "Education service workers" },
          { title: "Food service workers" },
          { title: "Stationary plant and machine service workers" },
        ],
      },
      {
        title: "Skilled agricultural, forestry and fishery workers",
        subOccupations: [
          {
            title:
              "Skilled agricultural, forestry and fishery workers, other ranks",
          },
          { title: "Market-oriented skilled agricultural workers" },
          {
            title:
              "Market-oriented skilled forestry, fishery and hunting workers",
          },
          { title: "Subsistence farmers, fishers, hunters, and gatherers" },
          { title: "Skilled fishers and related workers" },
        ],
      },
      {
        title: "Craft and related trades workers",
        subOccupations: [
          { title: "Carpenters and joiners" },
          { title: "Plumbers and pipe fitters" },
          { title: "Metal and metal trades workers" },
          { title: "Miscellaneous craft, related and related workers" },
          {
            title:
              "Building and related trades workers, excluding electricians",
          },
          { title: "Metal, machinery and related trades workers" },
          {
            title:
              "Electrical, electronic and telecommunications trades workers",
          },
          {
            title:
              "Food processing, wood working, garment and other craft and related trades workers",
          },
          { title: "Woodworkers and cabinetmakers" },
          {
            title:
              "Miscellaneous craft, Handicraft, printing workers and related and related workers",
          },
        ],
      },
      {
        title: "Plant and machine operators and assemblers",
        subOccupations: [
          { title: "Assemblers" },
          {
            title:
              "Cement, stone, concrete and other mineral product operators",
          },
          { title: "Drivers and mobile plant operators" },
          { title: "Stationary plant and machine operators" },
          { title: "Miscellaneous plant and machine operators" },
        ],
      },
      {
        title: "Elementary occupations",
        subOccupations: [
          { title: "Street and related sales and service workers" },
          { title: "Refuse workers and other elementary workers" },
          { title: "Food preparation assistants" },
          {
            title:
              "Labourers in mining, construction, manufacturing and transport",
          },
          { title: "Cleaners and helpers" },
          { title: "Agricultural, forestry and fishery labourers" },
        ],
      },
    ];
    for (const sector of data) {
      const occupation = await database.occupation.create({
        data: {
          title: sector.title,
        },
      });

      for (const subOccupation of sector.subOccupations) {
        await database.subOccupation.create({
          data: {
            title: subOccupation.title,
            occupationId: occupation.id,
          },
        });
      }
    }
    // await database.occupation.createMany({});
    console.log("Success");
  } catch (error) {
    console.log(error);
  } finally {
    await database.$disconnect();
  }
}

async function clearTable(tableName) {
  // await database.$executeRawUnsafe(`DELETE FROM ${tableName} CASCADE;`);
  await database.job.deleteMany();
  console.log(`Table ${tableName} cleared`);
}

async function main() {
  // await createEducationLevels();
  // await createExperienceLevels();
  // await createSectors();
  // await createOccupations();
  await clearTable("company");
}

main();
