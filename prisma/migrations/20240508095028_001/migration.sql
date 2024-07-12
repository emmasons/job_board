-- CreateTable
CREATE TABLE "ScrapedJob" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "howToApply" TEXT,
    "workSchedule" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "startDate" TEXT,
    "datePosted" TEXT,
    "occupation" TEXT,
    "contractType" TEXT NOT NULL,
    "company" TEXT,
    "numberOfPositions" INTEGER NOT NULL DEFAULT 1,
    "educationLevel" TEXT,
    "experienceLevel" TEXT,
    "sector" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScrapedJob_pkey" PRIMARY KEY ("id")
);
