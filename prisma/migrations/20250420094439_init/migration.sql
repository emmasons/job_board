-- CreateTable
CREATE TABLE `JobSeekerProfile` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `occupation` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `expectedSalary` VARCHAR(191) NULL,
    `currentSalary` VARCHAR(191) NULL,
    `currency` ENUM('AED', 'OMR', 'QAR', 'BHD', 'KWD', 'SAR') NOT NULL DEFAULT 'AED',
    `educationLevelId` VARCHAR(191) NULL,
    `experienceId` VARCHAR(191) NULL,
    `sectorId` VARCHAR(191) NULL,
    `cvHeadLine` VARCHAR(191) NULL,
    `profileSummary` VARCHAR(191) NULL,
    `yearsOfExperience` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `JobSeekerProfile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DesiredJob` (
    `id` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `industry` VARCHAR(191) NOT NULL,
    `jobSeekerProfileId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `DesiredJob_jobSeekerProfileId_key`(`jobSeekerProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmploymentDetails` (
    `id` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NULL,
    `company` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `currentlyWorking` BOOLEAN NOT NULL DEFAULT false,
    `startMonth` VARCHAR(191) NOT NULL,
    `startYear` VARCHAR(191) NOT NULL,
    `endMonth` VARCHAR(191) NULL,
    `endYear` VARCHAR(191) NULL,
    `jobSeekerProfileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EducationDetails` (
    `id` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `course` VARCHAR(191) NOT NULL,
    `college` VARCHAR(191) NOT NULL,
    `collegeLocation` VARCHAR(191) NOT NULL,
    `startYear` VARCHAR(191) NULL,
    `endYear` VARCHAR(191) NULL,
    `jobSeekerProfileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonalDetails` (
    `id` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `maritalStatus` VARCHAR(191) NOT NULL,
    `drivingLicense` BOOLEAN NOT NULL,
    `currentLocation` VARCHAR(191) NOT NULL,
    `languagesKnown` VARCHAR(191) NOT NULL,
    `visaStatus` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NULL,
    `alternateEmail` VARCHAR(191) NULL,
    `alternateContactNumber` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `jobSeekerProfileId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PersonalDetails_jobSeekerProfileId_key`(`jobSeekerProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `id` VARCHAR(191) NOT NULL,
    `skill` VARCHAR(191) NOT NULL,
    `jobSeekerProfileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Certificate` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lastUsed` VARCHAR(191) NOT NULL,
    `totalExperienceYears` INTEGER NOT NULL DEFAULT 0,
    `totalExperienceMonths` INTEGER NOT NULL DEFAULT 0,
    `jobSeekerProfileId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobSeekerProfilePercentage` (
    `id` VARCHAR(191) NOT NULL,
    `jobSeekerProfileId` VARCHAR(191) NOT NULL,
    `percentage` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `JobSeekerProfilePercentage_jobSeekerProfileId_key`(`jobSeekerProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `dateOfBirth` DATETIME(3) NULL,
    `oldEmail` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Candidate` (
    `id` VARCHAR(191) NOT NULL,
    `candidateId` VARCHAR(191) NOT NULL,
    `employerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Candidate_candidateId_employerId_key`(`candidateId`, `employerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `password` VARCHAR(191) NULL,
    `role` ENUM('USER', 'STAFF', 'ADMIN', 'JOB_SEEKER', 'EMPLOYER') NOT NULL DEFAULT 'USER',
    `forgotPasswordToken` VARCHAR(191) NULL,
    `forgotPasswordTokenExpiry` DATETIME(3) NULL,
    `verifyToken` VARCHAR(191) NULL,
    `verifyTokenExpiry` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CV` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CV_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GCPData` (
    `id` VARCHAR(191) NOT NULL,
    `urlExpiryDate` DATETIME(3) NULL,
    `blobName` VARCHAR(191) NULL,
    `assetId` VARCHAR(191) NOT NULL,
    `assetName` VARCHAR(191) NOT NULL,
    `assetType` VARCHAR(191) NOT NULL,
    `validityDuration` INTEGER NULL DEFAULT 7,
    `downloadUrl` VARCHAR(1000) NULL,

    UNIQUE INDEX `GCPData_assetId_key`(`assetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployerProfile` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EmployerProfile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `addressLineOne` VARCHAR(191) NOT NULL,
    `addressLineTwo` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Address_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` VARCHAR(191) NOT NULL,
    `companyEmail` VARCHAR(191) NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `employerProfileId` VARCHAR(191) NOT NULL,
    `sectorId` VARCHAR(191) NULL,

    UNIQUE INDEX `Company_companyEmail_key`(`companyEmail`),
    UNIQUE INDEX `Company_companyName_key`(`companyName`),
    UNIQUE INDEX `Company_employerProfileId_key`(`employerProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EducationLevel` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `course` VARCHAR(191) NULL,
    `college` VARCHAR(191) NULL,
    `colegeLocation` VARCHAR(191) NULL,

    UNIQUE INDEX `EducationLevel_label_key`(`label`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Experience` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Experience_label_key`(`label`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sector` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Sector_label_key`(`label`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Job` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `howToApply` VARCHAR(191) NULL,
    `workSchedule` ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'SEASONAL', 'NOT_SPECIFIED') NOT NULL DEFAULT 'NOT_SPECIFIED',
    `country` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `startDate` VARCHAR(191) NULL,
    `occupation` VARCHAR(191) NULL,
    `contractType` ENUM('INTERNSHIP', 'DIRECT_HIRE', 'NOT_SPECIFIED', 'CONTRACT_TO_HIRE', 'TEMPORARY', 'TEMPORARY_TO_HIRE', 'SELF_EMPLOYED', 'CONTRACT', 'SEASONAL', 'APPRENTICESHIP', 'RECRUITMENT_RESERVE', 'ON_CALL', 'VOLUNTEER') NOT NULL DEFAULT 'NOT_SPECIFIED',
    `ownerId` VARCHAR(191) NULL,
    `companyId` VARCHAR(191) NULL,
    `companyName` VARCHAR(191) NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `confidential` BOOLEAN NOT NULL DEFAULT true,
    `numberOfPositions` INTEGER NOT NULL DEFAULT 1,
    `preferredApplicantGender` ENUM('MALE', 'FEMALE', 'ALL') NOT NULL DEFAULT 'ALL',
    `datePosted` DATETIME(3) NULL,
    `educationLevelId` VARCHAR(191) NULL,
    `experienceId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `isOpen` BOOLEAN NOT NULL DEFAULT true,
    `salary` VARCHAR(191) NULL,
    `currency` VARCHAR(191) NULL,
    `salaryPeriod` VARCHAR(191) NOT NULL DEFAULT 'Month',
    `sectorId` VARCHAR(191) NULL,
    `jobType` ENUM('NORMAL', 'WALK_IN_INTERVIEW') NOT NULL DEFAULT 'NORMAL',
    `source` ENUM('COMPANY', 'JOB_BOARD', 'SCRAPPER') NOT NULL DEFAULT 'COMPANY',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobMetrics` (
    `id` VARCHAR(191) NOT NULL,
    `totalApplications` INTEGER NOT NULL DEFAULT 0,
    `view` INTEGER NOT NULL DEFAULT 0,
    `share` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `jobId` VARCHAR(191) NOT NULL,
    `visitorId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `JobMetrics_visitorId_jobId_key`(`visitorId`, `jobId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `jobId` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Application_userId_jobId_key`(`userId`, `jobId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoverLetter` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `applicationId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Purchase` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `orderID` VARCHAR(191) NOT NULL,
    `jobId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Purchase_orderID_key`(`orderID`),
    INDEX `Purchase_jobId_idx`(`jobId`),
    UNIQUE INDEX `Purchase_userId_jobId_key`(`userId`, `jobId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScrapedJob` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `howToApply` VARCHAR(191) NULL,
    `workSchedule` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `startDate` VARCHAR(191) NULL,
    `datePosted` VARCHAR(191) NULL,
    `occupation` VARCHAR(191) NULL,
    `contractType` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NULL,
    `numberOfPositions` INTEGER NOT NULL DEFAULT 1,
    `educationLevel` VARCHAR(191) NULL,
    `experienceLevel` VARCHAR(191) NULL,
    `sector` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Service_title_key`(`title`),
    UNIQUE INDEX `Service_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NULL,
    `epigraph` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `authorId` VARCHAR(191) NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `slug` VARCHAR(191) NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `categoryId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Post_title_key`(`title`),
    UNIQUE INDEX `Post_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Occupation` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Occupation_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubOccupation` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `occupationId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SubOccupation_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('NEW_JOB_POSTING', 'JOB_APPLICATION_SUBMITTED', 'JOB_APPLICATION_ACCEPTED', 'JOB_APPLICATION_REJECTED', 'INTERVIEW_SCHEDULED', 'INTERVIEW_RESCHEDULED', 'INTERVIEW_CANCELLED', 'JOB_OFFER_MADE', 'JOB_OFFER_ACCEPTED', 'JOB_OFFER_REJECTED') NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `resourceId` VARCHAR(191) NULL,
    `fromId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobAlert` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NULL,
    `companyId` VARCHAR(191) NULL,
    `jobType` ENUM('NORMAL', 'WALK_IN_INTERVIEW') NOT NULL DEFAULT 'NORMAL',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `occupation` VARCHAR(191) NULL,
    `jobId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EducationLevelOnJobAlert` (
    `id` VARCHAR(191) NOT NULL,
    `jobAlertId` VARCHAR(191) NOT NULL,
    `educationLevel` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SectorOnJobAlert` (
    `id` VARCHAR(191) NOT NULL,
    `jobAlertId` VARCHAR(191) NOT NULL,
    `sector` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkScheduleOnJobAlert` (
    `id` VARCHAR(191) NOT NULL,
    `jobAlertId` VARCHAR(191) NOT NULL,
    `workSchedule` ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'SEASONAL', 'NOT_SPECIFIED') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContractTypeOnJobAlert` (
    `id` VARCHAR(191) NOT NULL,
    `jobAlertId` VARCHAR(191) NOT NULL,
    `contractType` ENUM('INTERNSHIP', 'DIRECT_HIRE', 'NOT_SPECIFIED', 'CONTRACT_TO_HIRE', 'TEMPORARY', 'TEMPORARY_TO_HIRE', 'SELF_EMPLOYED', 'CONTRACT', 'SEASONAL', 'APPRENTICESHIP', 'RECRUITMENT_RESERVE', 'ON_CALL', 'VOLUNTEER') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CountryOnJobAlert` (
    `id` VARCHAR(191) NOT NULL,
    `jobAlertId` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `type` ENUM('NEWSLETTER', 'JOB_POSTINGS') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JobSeekerProfile` ADD CONSTRAINT `JobSeekerProfile_educationLevelId_fkey` FOREIGN KEY (`educationLevelId`) REFERENCES `EducationLevel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSeekerProfile` ADD CONSTRAINT `JobSeekerProfile_experienceId_fkey` FOREIGN KEY (`experienceId`) REFERENCES `Experience`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSeekerProfile` ADD CONSTRAINT `JobSeekerProfile_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `Sector`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobSeekerProfile` ADD CONSTRAINT `JobSeekerProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DesiredJob` ADD CONSTRAINT `DesiredJob_jobSeekerProfileId_fkey` FOREIGN KEY (`jobSeekerProfileId`) REFERENCES `JobSeekerProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmploymentDetails` ADD CONSTRAINT `EmploymentDetails_jobSeekerProfileId_fkey` FOREIGN KEY (`jobSeekerProfileId`) REFERENCES `JobSeekerProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EducationDetails` ADD CONSTRAINT `EducationDetails_jobSeekerProfileId_fkey` FOREIGN KEY (`jobSeekerProfileId`) REFERENCES `JobSeekerProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonalDetails` ADD CONSTRAINT `PersonalDetails_jobSeekerProfileId_fkey` FOREIGN KEY (`jobSeekerProfileId`) REFERENCES `JobSeekerProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_jobSeekerProfileId_fkey` FOREIGN KEY (`jobSeekerProfileId`) REFERENCES `JobSeekerProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certificate` ADD CONSTRAINT `Certificate_jobSeekerProfileId_fkey` FOREIGN KEY (`jobSeekerProfileId`) REFERENCES `JobSeekerProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_employerId_fkey` FOREIGN KEY (`employerId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CV` ADD CONSTRAINT `CV_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployerProfile` ADD CONSTRAINT `EmployerProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_employerProfileId_fkey` FOREIGN KEY (`employerProfileId`) REFERENCES `EmployerProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `Sector`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_educationLevelId_fkey` FOREIGN KEY (`educationLevelId`) REFERENCES `EducationLevel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_experienceId_fkey` FOREIGN KEY (`experienceId`) REFERENCES `Experience`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `Sector`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobMetrics` ADD CONSTRAINT `JobMetrics_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoverLetter` ADD CONSTRAINT `CoverLetter_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `Application`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubOccupation` ADD CONSTRAINT `SubOccupation_occupationId_fkey` FOREIGN KEY (`occupationId`) REFERENCES `Occupation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobAlert` ADD CONSTRAINT `JobAlert_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobAlert` ADD CONSTRAINT `JobAlert_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EducationLevelOnJobAlert` ADD CONSTRAINT `EducationLevelOnJobAlert_jobAlertId_fkey` FOREIGN KEY (`jobAlertId`) REFERENCES `JobAlert`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SectorOnJobAlert` ADD CONSTRAINT `SectorOnJobAlert_jobAlertId_fkey` FOREIGN KEY (`jobAlertId`) REFERENCES `JobAlert`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkScheduleOnJobAlert` ADD CONSTRAINT `WorkScheduleOnJobAlert_jobAlertId_fkey` FOREIGN KEY (`jobAlertId`) REFERENCES `JobAlert`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContractTypeOnJobAlert` ADD CONSTRAINT `ContractTypeOnJobAlert_jobAlertId_fkey` FOREIGN KEY (`jobAlertId`) REFERENCES `JobAlert`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CountryOnJobAlert` ADD CONSTRAINT `CountryOnJobAlert_jobAlertId_fkey` FOREIGN KEY (`jobAlertId`) REFERENCES `JobAlert`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
