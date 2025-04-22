import { Role } from "@prisma/client";
import bcrypt from "bcrypt";

import { PrismaClient, PlanType, FeatureType } from "@prisma/client";

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
        { label: "1-3 years" },
        { label: "4-7 years" },
        { label: "8-12 years" },
        { label: "13-18 years" },
        { label: "19-22 years" },
        { label: "More than 23 years" },
        { label: "Not specified" },
      ],
    });
  } catch (error) {
    console.log(error);
  } finally {
    await database.$disconnect();
  }
}

async function createIndustries() {
  const industries = await database.industries.findMany();
}
async function createSectors() {
  const sectors = await database.sector.findMany();
  if (sectors.length > 0) return;
  try {
    await database.sector.createMany({
      data: [
        { label: "Education, Science, & Research" },
        { label: "Hospitality & Tourism" },
        { label: "Medical & Health care" },
        { label: "IT & Telecommunications" },
        { label: "Building & construction" },
        { label: "Agriculture and farming" },
        { label: "Sales and marketing" },
        { label: "Transport & logistic" },
        {
          label: "Manufacturing, Consumer Goods & Industrial",
        },
        { label: "Facility management" },
        { label: "Retail and whole sale" },
        {
          label: "Energy & mining",
        },
        { label: "Beauty and wellness" },
        { label: "Engineering & Technical Services" },
        { label: "Finance, Insurance, & Legal" },
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
  await database[tableName].deleteMany();
  console.log(`Table ${tableName} cleared`);
}

async function createNotis() {
  const userId = "80214449-7b1e-4308-9757-5b84dbe9178d";
  const fromId = "80d6ac6b-ddc0-4200-b227-69854a438f40";
  const message = "this is a placeholder message";
  const types = [
    "NEW_JOB_POSTING",
    "JOB_APPLICATION_SUBMITTED",
    "JOB_APPLICATION_ACCEPTED",
    "JOB_APPLICATION_REJECTED",
    "INTERVIEW_SCHEDULED",
    "INTERVIEW_RESCHEDULED",
    "INTERVIEW_CANCELLED",
    "JOB_OFFER_MADE",
    "JOB_OFFER_ACCEPTED",
    "JOB_OFFER_REJECTED",
  ];

  for (const type of types) {
    await database.notification.createMany({
      data: Array(3)
        .fill(1)
        .map((_, i) => ({
          userId,
          fromId,
          message,
          type,
        })),
    });
  }

  console.log("Success");
}

async function createUserWithAdminRole() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const role = Role.ADMIN;

  if (!password) {
    throw new Error("Password is required");
  }

  const existingUser = await database.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    await database.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        isVerified: true,
      },
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await database.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        isVerified: true,
      },
    });

    console.log(
      `Created user with id ${user.id}, email ${user.email} and role ${user.role}`,
    );
  }
}

async function createPlans() {
  const plans = await database.plan.findMany();
  if (plans.length > 0) return;
  try {
    await database.plan.createMany({
      data: [
        { name: PlanType.FREE, price: 0, userType: Role.JOB_SEEKER },
        { name: PlanType.BASIC, price: 500, userType: Role.JOB_SEEKER },
        { name: PlanType.STANDARD, price: 1500, userType: Role.JOB_SEEKER },
        { name: PlanType.PREMIUM, price: 2500, userType: Role.JOB_SEEKER },
        { name: PlanType.FREE, price: 0, userType: Role.EMPLOYER },
        { name: PlanType.BASIC, price: 500, userType: Role.EMPLOYER },
        { name: PlanType.STANDARD, price: 1500, userType: Role.EMPLOYER },
        { name: PlanType.PREMIUM, price: 2500, userType: Role.EMPLOYER },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log(error);
  } finally {
    await database.$disconnect();
  }
}

async function createFeatures() {
  const features = await database.feature.findMany();
  if (features.length > 0) return;
  try {
    await database.feature.createMany({
      data: [
        {
          displayName: "Unlimited job postings",
          type: FeatureType.UNLIMITED_JOB_POSTING,
        },
        {
          displayName: "Unlimited job applications",
          type: FeatureType.UNLIMITED_JOB_APPLICATION,
        },
        {
          displayName: "Unlimited CV downloads",
          type: FeatureType.UNLIMITED_CV_DOWNLOAD,
        },
        {
          displayName: "CV downloads",
          type: FeatureType.CV_DOWNLOAD,
        },
        {
          displayName: "Unlimited company profile views",
          type: FeatureType.UNLIMITED_COMPANY_PROFILE_VIEWS,
        },
        {
          displayName: "Unlimited job alerts",
          type: FeatureType.UNLIMITED_JOB_ALERTS,
        },
        {
          displayName: "Cover letter generation",
          type: FeatureType.COVER_LETTER_GENERATION,
        },
        {
          displayName: "CV generation",
          type: FeatureType.CV_GENERATION,
        },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log(error);
  } finally {
    await database.$disconnect();
  }
}

async function createPlanFeatures() {
  const features = await database.planFeature.findMany();
  if (features.length > 0) return;
  try {
    const plans = await database.plan.findMany();
    const features = await database.feature.findMany();

    for (const plan of plans) {
      for (const feature of features) {
        await database.planFeature.create({
          data: {
            planId: plan.id,
            featureId: feature.id,
          },
        });
      }
    }
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
  await createOccupations();
  await createUserWithAdminRole();

  await createPlans();
  await createFeatures();
  await createPlanFeatures();
}

main();
