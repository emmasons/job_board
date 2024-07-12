-- CreateTable
CREATE TABLE "Occupation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Occupation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubOccupation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "occupationId" TEXT NOT NULL,

    CONSTRAINT "SubOccupation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Occupation_title_key" ON "Occupation"("title");

-- CreateIndex
CREATE UNIQUE INDEX "SubOccupation_title_key" ON "SubOccupation"("title");

-- AddForeignKey
ALTER TABLE "SubOccupation" ADD CONSTRAINT "SubOccupation_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
