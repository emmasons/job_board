PGDMP              	        	    |            board %   14.13 (Ubuntu 14.13-0ubuntu0.22.04.1) %   14.13 (Ubuntu 14.13-0ubuntu0.22.04.1) �    |           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            }           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ~           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    329496    board    DATABASE     Z   CREATE DATABASE board WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE board;
                postgres    false            �           1247    782667    ApplicationStatus    TYPE     s   CREATE TYPE public."ApplicationStatus" AS ENUM (
    'PENDING',
    'ACCEPTED',
    'REJECTED',
    'WITHDRAWN'
);
 &   DROP TYPE public."ApplicationStatus";
       public          board    false            U           1247    798714    CURRENCY    TYPE     l   CREATE TYPE public."CURRENCY" AS ENUM (
    'AED',
    'OMR',
    'QAR',
    'BHD',
    'KWD',
    'SAR'
);
    DROP TYPE public."CURRENCY";
       public          board    false            g           1247    782252    ContractType    TYPE     0  CREATE TYPE public."ContractType" AS ENUM (
    'INTERNSHIP',
    'DIRECT_HIRE',
    'NOT_SPECIFIED',
    'CONTRACT_TO_HIRE',
    'TEMPORARY',
    'TEMPORARY_TO_HIRE',
    'SELF_EMPLOYED',
    'CONTRACT',
    'SEASONAL',
    'APPRENTICESHIP',
    'RECRUITMENT_RESERVE',
    'ON_CALL',
    'VOLUNTEER'
);
 !   DROP TYPE public."ContractType";
       public          board    false            �           1247    782729 	   JOBSOURCE    TYPE     [   CREATE TYPE public."JOBSOURCE" AS ENUM (
    'COMPANY',
    'JOB_BOARD',
    'SCRAPPER'
);
    DROP TYPE public."JOBSOURCE";
       public          board    false            �           1247    782719 	   JOBSTATUS    TYPE     R   CREATE TYPE public."JOBSTATUS" AS ENUM (
    'OPEN',
    'CLOSED',
    'DRAFT'
);
    DROP TYPE public."JOBSTATUS";
       public          board    false            �           1247    782661    JOBTYPE    TYPE     P   CREATE TYPE public."JOBTYPE" AS ENUM (
    'NORMAL',
    'WALK_IN_INTERVIEW'
);
    DROP TYPE public."JOBTYPE";
       public          board    false            �           1247    782762    NOTIFICATION_TYPES    TYPE     I  CREATE TYPE public."NOTIFICATION_TYPES" AS ENUM (
    'NEW_JOB_POSTING',
    'JOB_APPLICATION_SUBMITTED',
    'JOB_APPLICATION_ACCEPTED',
    'JOB_APPLICATION_REJECTED',
    'INTERVIEW_SCHEDULED',
    'INTERVIEW_RESCHEDULED',
    'INTERVIEW_CANCELLED',
    'JOB_OFFER_MADE',
    'JOB_OFFER_ACCEPTED',
    'JOB_OFFER_REJECTED'
);
 '   DROP TYPE public."NOTIFICATION_TYPES";
       public          board    false            �           1247    782859    PREFERRED_APPLICANT_GENDER    TYPE     a   CREATE TYPE public."PREFERRED_APPLICANT_GENDER" AS ENUM (
    'MALE',
    'FEMALE',
    'ALL'
);
 /   DROP TYPE public."PREFERRED_APPLICANT_GENDER";
       public          board    false            j           1247    782280    PurchaseStatus    TYPE     P   CREATE TYPE public."PurchaseStatus" AS ENUM (
    'PENDING',
    'COMPLETED'
);
 #   DROP TYPE public."PurchaseStatus";
       public          board    false            a           1247    782227    Role    TYPE     n   CREATE TYPE public."Role" AS ENUM (
    'USER',
    'STAFF',
    'ADMIN',
    'JOB_SEEKER',
    'EMPLOYER'
);
    DROP TYPE public."Role";
       public          board    false            X           1247    801435    SUBSCRIPTION_TYPE    TYPE     Y   CREATE TYPE public."SUBSCRIPTION_TYPE" AS ENUM (
    'NEWSLETTER',
    'JOB_POSTINGS'
);
 &   DROP TYPE public."SUBSCRIPTION_TYPE";
       public          board    false            d           1247    782238    WorkSchedule    TYPE     �   CREATE TYPE public."WorkSchedule" AS ENUM (
    'FULL_TIME',
    'PART_TIME',
    'CONTRACTOR',
    'TEMPORARY',
    'SEASONAL',
    'NOT_SPECIFIED'
);
 !   DROP TYPE public."WorkSchedule";
       public          board    false            �            1259    782317    Address    TABLE     �   CREATE TABLE public."Address" (
    id text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    "addressLineOne" text NOT NULL,
    "addressLineTwo" text,
    "postalCode" text NOT NULL,
    "userId" text NOT NULL
);
    DROP TABLE public."Address";
       public         heap    board    false            �            1259    782531    Application    TABLE     ]  CREATE TABLE public."Application" (
    "userId" text NOT NULL,
    "jobId" text NOT NULL,
    id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status public."ApplicationStatus" DEFAULT 'PENDING'::public."ApplicationStatus" NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 !   DROP TABLE public."Application";
       public         heap    board    false    955    955            �            1259    782302    CV    TABLE     O   CREATE TABLE public."CV" (
    id text NOT NULL,
    "userId" text NOT NULL
);
    DROP TABLE public."CV";
       public         heap    board    false            �            1259    782478 	   Candidate    TABLE     {   CREATE TABLE public."Candidate" (
    id text NOT NULL,
    "candidateId" text NOT NULL,
    "employerId" text NOT NULL
);
    DROP TABLE public."Candidate";
       public         heap    board    false            �            1259    782600    Certificate    TABLE     	  CREATE TABLE public."Certificate" (
    id text NOT NULL,
    name text NOT NULL,
    "lastUsed" text NOT NULL,
    "totalExperienceYears" integer DEFAULT 0 NOT NULL,
    "totalExperienceMonths" integer DEFAULT 0 NOT NULL,
    "jobSeekerProfileId" text NOT NULL
);
 !   DROP TABLE public."Certificate";
       public         heap    board    false            �            1259    782345    Company    TABLE     �   CREATE TABLE public."Company" (
    id text NOT NULL,
    "companyEmail" text,
    "companyName" text NOT NULL,
    "employerProfileId" text NOT NULL,
    "sectorId" text
);
    DROP TABLE public."Company";
       public         heap    board    false            �            1259    782628 
   DesiredJob    TABLE     F  CREATE TABLE public."DesiredJob" (
    id text NOT NULL,
    designation text NOT NULL,
    location text NOT NULL,
    industry text NOT NULL,
    "jobSeekerProfileId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
     DROP TABLE public."DesiredJob";
       public         heap    board    false            �            1259    782829    EducationDetails    TABLE       CREATE TABLE public."EducationDetails" (
    id text NOT NULL,
    course text NOT NULL,
    college text NOT NULL,
    "collegeLocation" text NOT NULL,
    "startYear" text,
    "endYear" text,
    "jobSeekerProfileId" text NOT NULL,
    level text NOT NULL
);
 &   DROP TABLE public."EducationDetails";
       public         heap    board    false            �            1259    782324    EducationLevel    TABLE     �   CREATE TABLE public."EducationLevel" (
    id text NOT NULL,
    label text NOT NULL,
    "colegeLocation" text,
    college text,
    course text
);
 $   DROP TABLE public."EducationLevel";
       public         heap    board    false            �            1259    782682    EmployerProfile    TABLE     \   CREATE TABLE public."EmployerProfile" (
    id text NOT NULL,
    "userId" text NOT NULL
);
 %   DROP TABLE public."EmployerProfile";
       public         heap    board    false            �            1259    782592    EmploymentDetails    TABLE     Z  CREATE TABLE public."EmploymentDetails" (
    id text NOT NULL,
    designation text,
    company text,
    location text,
    description text,
    "currentlyWorking" boolean DEFAULT false NOT NULL,
    "startMonth" text NOT NULL,
    "startYear" text NOT NULL,
    "endMonth" text,
    "endYear" text,
    "jobSeekerProfileId" text NOT NULL
);
 '   DROP TABLE public."EmploymentDetails";
       public         heap    board    false            �            1259    782331 
   Experience    TABLE     T   CREATE TABLE public."Experience" (
    id text NOT NULL,
    label text NOT NULL
);
     DROP TABLE public."Experience";
       public         heap    board    false            �            1259    782309    GCPData    TABLE     B  CREATE TABLE public."GCPData" (
    id text NOT NULL,
    "urlExpiryDate" timestamp(3) without time zone NOT NULL,
    "blobName" text NOT NULL,
    "assetId" text NOT NULL,
    "assetName" text NOT NULL,
    "assetType" text NOT NULL,
    "validityDuration" integer DEFAULT 7 NOT NULL,
    "downloadUrl" text NOT NULL
);
    DROP TABLE public."GCPData";
       public         heap    board    false            �            1259    782352    Job    TABLE     �  CREATE TABLE public."Job" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "howToApply" text,
    "workSchedule" public."WorkSchedule" DEFAULT 'NOT_SPECIFIED'::public."WorkSchedule" NOT NULL,
    country text NOT NULL,
    city text NOT NULL,
    "startDate" text,
    occupation text,
    "contractType" public."ContractType" DEFAULT 'NOT_SPECIFIED'::public."ContractType" NOT NULL,
    "ownerId" text,
    "companyId" text,
    published boolean DEFAULT false NOT NULL,
    "numberOfPositions" integer DEFAULT 1 NOT NULL,
    "educationLevelId" text,
    "experienceId" text,
    "sectorId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "datePosted" timestamp(3) without time zone,
    "companyName" text,
    salary text,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "jobType" public."JOBTYPE" DEFAULT 'NORMAL'::public."JOBTYPE" NOT NULL,
    "isOpen" boolean DEFAULT true NOT NULL,
    source public."JOBSOURCE" DEFAULT 'COMPANY'::public."JOBSOURCE" NOT NULL,
    confidential boolean DEFAULT true NOT NULL,
    currency public."CURRENCY" DEFAULT 'AED'::public."CURRENCY" NOT NULL,
    "salaryPeriod" text DEFAULT 'Month'::text NOT NULL,
    "preferredApplicantGender" public."PREFERRED_APPLICANT_GENDER" DEFAULT 'ALL'::public."PREFERRED_APPLICANT_GENDER" NOT NULL
);
    DROP TABLE public."Job";
       public         heap    board    false    853    868    871    952    964    982    871    952    853    982    868    964            �            1259    782797    JobAlert    TABLE     !  CREATE TABLE public."JobAlert" (
    id text NOT NULL,
    "userId" text NOT NULL,
    city text,
    "companyId" text,
    "jobType" public."JOBTYPE" DEFAULT 'NORMAL'::public."JOBTYPE" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    occupation text,
    "jobId" text,
    "sectorIds" text[],
    "educationLevelIds" text[],
    "workSchedules" public."WorkSchedule"[],
    "contractTypes" public."ContractType"[],
    countries text[]
);
    DROP TABLE public."JobAlert";
       public         heap    board    false    952    868    871    952            �            1259    782736 
   JobMetrics    TABLE     �  CREATE TABLE public."JobMetrics" (
    id text NOT NULL,
    "totalApplications" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "jobId" text NOT NULL,
    "visitorId" text NOT NULL,
    share integer DEFAULT 0 NOT NULL,
    view integer DEFAULT 0 NOT NULL
);
     DROP TABLE public."JobMetrics";
       public         heap    board    false            �            1259    782364    JobSeekerProfile    TABLE       CREATE TABLE public."JobSeekerProfile" (
    id text NOT NULL,
    occupation text,
    country text,
    "educationLevelId" text,
    "experienceId" text,
    "sectorId" text,
    "userId" text NOT NULL,
    "cvHeadLine" text,
    "profileSummary" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    currency public."CURRENCY" DEFAULT 'AED'::public."CURRENCY" NOT NULL,
    "currentSalary" text,
    "expectedSalary" text
);
 &   DROP TABLE public."JobSeekerProfile";
       public         heap    board    false    853    853            �            1259    782564    JobSeekerProfilePercentage    TABLE     �   CREATE TABLE public."JobSeekerProfilePercentage" (
    id text NOT NULL,
    "jobSeekerProfileId" text NOT NULL,
    percentage integer DEFAULT 0 NOT NULL
);
 0   DROP TABLE public."JobSeekerProfilePercentage";
       public         heap    board    false            �            1259    782783    Notification    TABLE     �  CREATE TABLE public."Notification" (
    id text NOT NULL,
    type public."NOTIFICATION_TYPES" NOT NULL,
    read boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL,
    "resourceId" text,
    "fromId" text NOT NULL,
    message text
);
 "   DROP TABLE public."Notification";
       public         heap    board    false    970            �            1259    782510 
   Occupation    TABLE     T   CREATE TABLE public."Occupation" (
    id text NOT NULL,
    title text NOT NULL
);
     DROP TABLE public."Occupation";
       public         heap    board    false            �            1259    782641    PersonalDetails    TABLE     l  CREATE TABLE public."PersonalDetails" (
    id text NOT NULL,
    "dateOfBirth" timestamp(3) without time zone NOT NULL,
    gender text NOT NULL,
    nationality text NOT NULL,
    "maritalStatus" text NOT NULL,
    "drivingLicense" boolean NOT NULL,
    "currentLocation" text NOT NULL,
    "languagesKnown" text NOT NULL,
    "visaStatus" text NOT NULL,
    religion text,
    "alternateEmail" text,
    "alternateContactNumber" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "jobSeekerProfileId" text NOT NULL
);
 %   DROP TABLE public."PersonalDetails";
       public         heap    board    false            �            1259    782491    Post    TABLE     �  CREATE TABLE public."Post" (
    id text NOT NULL,
    title text NOT NULL,
    content text,
    epigraph text,
    "imageUrl" text,
    "authorId" text,
    "isPublished" boolean DEFAULT false NOT NULL,
    slug text NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    "categoryId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL
);
    DROP TABLE public."Post";
       public         heap    board    false            �            1259    782285    Profile    TABLE     �   CREATE TABLE public."Profile" (
    id text NOT NULL,
    "firstName" text,
    "lastName" text,
    "phoneNumber" text,
    "dateOfBirth" timestamp(3) without time zone,
    "oldEmail" text,
    "userId" text NOT NULL
);
    DROP TABLE public."Profile";
       public         heap    board    false            �            1259    782371    Purchase    TABLE     q  CREATE TABLE public."Purchase" (
    id text NOT NULL,
    "userId" text NOT NULL,
    status public."PurchaseStatus" DEFAULT 'PENDING'::public."PurchaseStatus" NOT NULL,
    "orderID" text NOT NULL,
    "jobId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Purchase";
       public         heap    board    false    874    874            �            1259    782463 
   ScrapedJob    TABLE     ]  CREATE TABLE public."ScrapedJob" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "howToApply" text,
    "workSchedule" text NOT NULL,
    country text NOT NULL,
    city text NOT NULL,
    "startDate" text,
    "datePosted" text,
    occupation text,
    "contractType" text NOT NULL,
    company text,
    "numberOfPositions" integer DEFAULT 1 NOT NULL,
    "educationLevel" text,
    "experienceLevel" text,
    sector text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
     DROP TABLE public."ScrapedJob";
       public         heap    board    false            �            1259    782338    Sector    TABLE     P   CREATE TABLE public."Sector" (
    id text NOT NULL,
    label text NOT NULL
);
    DROP TABLE public."Sector";
       public         heap    board    false            �            1259    782619    Service    TABLE        CREATE TABLE public."Service" (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    slug text NOT NULL
);
    DROP TABLE public."Service";
       public         heap    board    false            �            1259    782579    Skill    TABLE     w   CREATE TABLE public."Skill" (
    id text NOT NULL,
    skill text NOT NULL,
    "jobSeekerProfileId" text NOT NULL
);
    DROP TABLE public."Skill";
       public         heap    board    false            �            1259    782517    SubOccupation    TABLE     y   CREATE TABLE public."SubOccupation" (
    id text NOT NULL,
    title text NOT NULL,
    "occupationId" text NOT NULL
);
 #   DROP TABLE public."SubOccupation";
       public         heap    board    false            �            1259    801439    Subscription    TABLE     �   CREATE TABLE public."Subscription" (
    id text NOT NULL,
    email text NOT NULL,
    type public."SUBSCRIPTION_TYPE" NOT NULL
);
 "   DROP TABLE public."Subscription";
       public         heap    board    false    856            �            1259    782217    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    board    false            �            1259    782292    users    TABLE     _  CREATE TABLE public.users (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    "emailVerified" timestamp(3) without time zone,
    "isVerified" boolean DEFAULT false NOT NULL,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    password text,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "forgotPasswordToken" text,
    "forgotPasswordTokenExpiry" timestamp(3) without time zone,
    "verifyToken" text,
    "verifyTokenExpiry" timestamp(3) without time zone
);
    DROP TABLE public.users;
       public         heap    board    false    865    865            _          0    782317    Address 
   TABLE DATA           r   COPY public."Address" (id, city, country, "addressLineOne", "addressLineTwo", "postalCode", "userId") FROM stdin;
    public          board    false    214   K�       l          0    782531    Application 
   TABLE DATA           `   COPY public."Application" ("userId", "jobId", id, "createdAt", status, "updatedAt") FROM stdin;
    public          board    false    227   �       ]          0    782302    CV 
   TABLE DATA           ,   COPY public."CV" (id, "userId") FROM stdin;
    public          board    false    212   /�       h          0    782478 	   Candidate 
   TABLE DATA           F   COPY public."Candidate" (id, "candidateId", "employerId") FROM stdin;
    public          board    false    223   ��       p          0    782600    Certificate 
   TABLE DATA           �   COPY public."Certificate" (id, name, "lastUsed", "totalExperienceYears", "totalExperienceMonths", "jobSeekerProfileId") FROM stdin;
    public          board    false    231   ��       c          0    782345    Company 
   TABLE DATA           g   COPY public."Company" (id, "companyEmail", "companyName", "employerProfileId", "sectorId") FROM stdin;
    public          board    false    218   ��       r          0    782628 
   DesiredJob 
   TABLE DATA           {   COPY public."DesiredJob" (id, designation, location, industry, "jobSeekerProfileId", "createdAt", "updatedAt") FROM stdin;
    public          board    false    233   X�       x          0    782829    EducationDetails 
   TABLE DATA           �   COPY public."EducationDetails" (id, course, college, "collegeLocation", "startYear", "endYear", "jobSeekerProfileId", level) FROM stdin;
    public          board    false    239   u�       `          0    782324    EducationLevel 
   TABLE DATA           X   COPY public."EducationLevel" (id, label, "colegeLocation", college, course) FROM stdin;
    public          board    false    215   ��       t          0    782682    EmployerProfile 
   TABLE DATA           9   COPY public."EmployerProfile" (id, "userId") FROM stdin;
    public          board    false    235   ��       o          0    782592    EmploymentDetails 
   TABLE DATA           �   COPY public."EmploymentDetails" (id, designation, company, location, description, "currentlyWorking", "startMonth", "startYear", "endMonth", "endYear", "jobSeekerProfileId") FROM stdin;
    public          board    false    230   2�       a          0    782331 
   Experience 
   TABLE DATA           1   COPY public."Experience" (id, label) FROM stdin;
    public          board    false    216   O�       ^          0    782309    GCPData 
   TABLE DATA           �   COPY public."GCPData" (id, "urlExpiryDate", "blobName", "assetId", "assetName", "assetType", "validityDuration", "downloadUrl") FROM stdin;
    public          board    false    213   #�       d          0    782352    Job 
   TABLE DATA           �  COPY public."Job" (id, title, description, "howToApply", "workSchedule", country, city, "startDate", occupation, "contractType", "ownerId", "companyId", published, "numberOfPositions", "educationLevelId", "experienceId", "sectorId", "createdAt", "updatedAt", "datePosted", "companyName", salary, "isFeatured", "jobType", "isOpen", source, confidential, currency, "salaryPeriod", "preferredApplicantGender") FROM stdin;
    public          board    false    219   ��       w          0    782797    JobAlert 
   TABLE DATA           �   COPY public."JobAlert" (id, "userId", city, "companyId", "jobType", "createdAt", "updatedAt", occupation, "jobId", "sectorIds", "educationLevelIds", "workSchedules", "contractTypes", countries) FROM stdin;
    public          board    false    238   �      u          0    782736 
   JobMetrics 
   TABLE DATA           |   COPY public."JobMetrics" (id, "totalApplications", "createdAt", "updatedAt", "jobId", "visitorId", share, view) FROM stdin;
    public          board    false    236   �      e          0    782364    JobSeekerProfile 
   TABLE DATA           �   COPY public."JobSeekerProfile" (id, occupation, country, "educationLevelId", "experienceId", "sectorId", "userId", "cvHeadLine", "profileSummary", "createdAt", "updatedAt", currency, "currentSalary", "expectedSalary") FROM stdin;
    public          board    false    220         m          0    782564    JobSeekerProfilePercentage 
   TABLE DATA           \   COPY public."JobSeekerProfilePercentage" (id, "jobSeekerProfileId", percentage) FROM stdin;
    public          board    false    228   �      v          0    782783    Notification 
   TABLE DATA           }   COPY public."Notification" (id, type, read, "createdAt", "updatedAt", "userId", "resourceId", "fromId", message) FROM stdin;
    public          board    false    237   �      j          0    782510 
   Occupation 
   TABLE DATA           1   COPY public."Occupation" (id, title) FROM stdin;
    public          board    false    225   -	      s          0    782641    PersonalDetails 
   TABLE DATA             COPY public."PersonalDetails" (id, "dateOfBirth", gender, nationality, "maritalStatus", "drivingLicense", "currentLocation", "languagesKnown", "visaStatus", religion, "alternateEmail", "alternateContactNumber", "createdAt", "updatedAt", "jobSeekerProfileId") FROM stdin;
    public          board    false    234   �
      i          0    782491    Post 
   TABLE DATA           �   COPY public."Post" (id, title, content, epigraph, "imageUrl", "authorId", "isPublished", slug, views, "categoryId", "createdAt", "updatedAt", "isFeatured") FROM stdin;
    public          board    false    224   �
      [          0    782285    Profile 
   TABLE DATA           t   COPY public."Profile" (id, "firstName", "lastName", "phoneNumber", "dateOfBirth", "oldEmail", "userId") FROM stdin;
    public          board    false    210   �
      f          0    782371    Purchase 
   TABLE DATA           h   COPY public."Purchase" (id, "userId", status, "orderID", "jobId", "createdAt", "updatedAt") FROM stdin;
    public          board    false    221   �      g          0    782463 
   ScrapedJob 
   TABLE DATA             COPY public."ScrapedJob" (id, title, description, "howToApply", "workSchedule", country, city, "startDate", "datePosted", occupation, "contractType", company, "numberOfPositions", "educationLevel", "experienceLevel", sector, "createdAt", "updatedAt") FROM stdin;
    public          board    false    222   �      b          0    782338    Sector 
   TABLE DATA           -   COPY public."Sector" (id, label) FROM stdin;
    public          board    false    217   �      q          0    782619    Service 
   TABLE DATA           A   COPY public."Service" (id, title, description, slug) FROM stdin;
    public          board    false    232   �      n          0    782579    Skill 
   TABLE DATA           B   COPY public."Skill" (id, skill, "jobSeekerProfileId") FROM stdin;
    public          board    false    229   �      k          0    782517    SubOccupation 
   TABLE DATA           D   COPY public."SubOccupation" (id, title, "occupationId") FROM stdin;
    public          board    false    226   �      y          0    801439    Subscription 
   TABLE DATA           9   COPY public."Subscription" (id, email, type) FROM stdin;
    public          board    false    240   }      Z          0    782217    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          board    false    209   �      \          0    782292    users 
   TABLE DATA           �   COPY public.users (id, name, email, "emailVerified", "isVerified", image, "createdAt", "updatedAt", password, role, "forgotPasswordToken", "forgotPasswordTokenExpiry", "verifyToken", "verifyTokenExpiry") FROM stdin;
    public          board    false    211   +1      c           2606    782323    Address Address_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Address" DROP CONSTRAINT "Address_pkey";
       public            board    false    214            �           2606    782554    Application Application_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Application"
    ADD CONSTRAINT "Application_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Application" DROP CONSTRAINT "Application_pkey";
       public            board    false    227            ]           2606    782308 
   CV CV_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public."CV"
    ADD CONSTRAINT "CV_pkey" PRIMARY KEY (id);
 8   ALTER TABLE ONLY public."CV" DROP CONSTRAINT "CV_pkey";
       public            board    false    212            �           2606    782484    Candidate Candidate_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Candidate"
    ADD CONSTRAINT "Candidate_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Candidate" DROP CONSTRAINT "Candidate_pkey";
       public            board    false    223            �           2606    782608    Certificate Certificate_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Certificate"
    ADD CONSTRAINT "Certificate_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Certificate" DROP CONSTRAINT "Certificate_pkey";
       public            board    false    231            r           2606    782351    Company Company_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Company" DROP CONSTRAINT "Company_pkey";
       public            board    false    218            �           2606    782635    DesiredJob DesiredJob_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."DesiredJob"
    ADD CONSTRAINT "DesiredJob_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."DesiredJob" DROP CONSTRAINT "DesiredJob_pkey";
       public            board    false    233            �           2606    782835 &   EducationDetails EducationDetails_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."EducationDetails"
    ADD CONSTRAINT "EducationDetails_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."EducationDetails" DROP CONSTRAINT "EducationDetails_pkey";
       public            board    false    239            g           2606    782330 "   EducationLevel EducationLevel_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."EducationLevel"
    ADD CONSTRAINT "EducationLevel_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."EducationLevel" DROP CONSTRAINT "EducationLevel_pkey";
       public            board    false    215            �           2606    782688 $   EmployerProfile EmployerProfile_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."EmployerProfile"
    ADD CONSTRAINT "EmployerProfile_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."EmployerProfile" DROP CONSTRAINT "EmployerProfile_pkey";
       public            board    false    235            �           2606    782599 (   EmploymentDetails EmploymentDetails_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."EmploymentDetails"
    ADD CONSTRAINT "EmploymentDetails_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."EmploymentDetails" DROP CONSTRAINT "EmploymentDetails_pkey";
       public            board    false    230            j           2606    782337    Experience Experience_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Experience"
    ADD CONSTRAINT "Experience_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Experience" DROP CONSTRAINT "Experience_pkey";
       public            board    false    216            a           2606    782316    GCPData GCPData_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."GCPData"
    ADD CONSTRAINT "GCPData_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."GCPData" DROP CONSTRAINT "GCPData_pkey";
       public            board    false    213            �           2606    782807    JobAlert JobAlert_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."JobAlert"
    ADD CONSTRAINT "JobAlert_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."JobAlert" DROP CONSTRAINT "JobAlert_pkey";
       public            board    false    238            �           2606    782746    JobMetrics JobMetrics_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."JobMetrics"
    ADD CONSTRAINT "JobMetrics_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."JobMetrics" DROP CONSTRAINT "JobMetrics_pkey";
       public            board    false    236            �           2606    782571 :   JobSeekerProfilePercentage JobSeekerProfilePercentage_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public."JobSeekerProfilePercentage"
    ADD CONSTRAINT "JobSeekerProfilePercentage_pkey" PRIMARY KEY (id);
 h   ALTER TABLE ONLY public."JobSeekerProfilePercentage" DROP CONSTRAINT "JobSeekerProfilePercentage_pkey";
       public            board    false    228            v           2606    782370 &   JobSeekerProfile JobSeekerProfile_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."JobSeekerProfile"
    ADD CONSTRAINT "JobSeekerProfile_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."JobSeekerProfile" DROP CONSTRAINT "JobSeekerProfile_pkey";
       public            board    false    220            t           2606    782363    Job Job_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."Job"
    ADD CONSTRAINT "Job_pkey" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."Job" DROP CONSTRAINT "Job_pkey";
       public            board    false    219            �           2606    782791    Notification Notification_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."Notification" DROP CONSTRAINT "Notification_pkey";
       public            board    false    237            �           2606    782516    Occupation Occupation_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Occupation"
    ADD CONSTRAINT "Occupation_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Occupation" DROP CONSTRAINT "Occupation_pkey";
       public            board    false    225            �           2606    782648 $   PersonalDetails PersonalDetails_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."PersonalDetails"
    ADD CONSTRAINT "PersonalDetails_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."PersonalDetails" DROP CONSTRAINT "PersonalDetails_pkey";
       public            board    false    234            �           2606    782502    Post Post_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Post" DROP CONSTRAINT "Post_pkey";
       public            board    false    224            W           2606    782291    Profile Profile_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Profile" DROP CONSTRAINT "Profile_pkey";
       public            board    false    210            {           2606    782379    Purchase Purchase_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Purchase" DROP CONSTRAINT "Purchase_pkey";
       public            board    false    221            ~           2606    782471    ScrapedJob ScrapedJob_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."ScrapedJob"
    ADD CONSTRAINT "ScrapedJob_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."ScrapedJob" DROP CONSTRAINT "ScrapedJob_pkey";
       public            board    false    222            m           2606    782344    Sector Sector_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Sector"
    ADD CONSTRAINT "Sector_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Sector" DROP CONSTRAINT "Sector_pkey";
       public            board    false    217            �           2606    782625    Service Service_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Service" DROP CONSTRAINT "Service_pkey";
       public            board    false    232            �           2606    782585    Skill Skill_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Skill"
    ADD CONSTRAINT "Skill_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Skill" DROP CONSTRAINT "Skill_pkey";
       public            board    false    229            �           2606    782523     SubOccupation SubOccupation_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."SubOccupation"
    ADD CONSTRAINT "SubOccupation_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."SubOccupation" DROP CONSTRAINT "SubOccupation_pkey";
       public            board    false    226            �           2606    801445    Subscription Subscription_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."Subscription" DROP CONSTRAINT "Subscription_pkey";
       public            board    false    240            U           2606    782225 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            board    false    209            [           2606    782301    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            board    false    211            d           1259    782712    Address_userId_key    INDEX     U   CREATE UNIQUE INDEX "Address_userId_key" ON public."Address" USING btree ("userId");
 (   DROP INDEX public."Address_userId_key";
       public            board    false    214            �           1259    782555    Application_userId_jobId_key    INDEX     l   CREATE UNIQUE INDEX "Application_userId_jobId_key" ON public."Application" USING btree ("userId", "jobId");
 2   DROP INDEX public."Application_userId_jobId_key";
       public            board    false    227    227            ^           1259    782382    CV_userId_key    INDEX     K   CREATE UNIQUE INDEX "CV_userId_key" ON public."CV" USING btree ("userId");
 #   DROP INDEX public."CV_userId_key";
       public            board    false    212                       1259    782490 $   Candidate_candidateId_employerId_key    INDEX     |   CREATE UNIQUE INDEX "Candidate_candidateId_employerId_key" ON public."Candidate" USING btree ("candidateId", "employerId");
 :   DROP INDEX public."Candidate_candidateId_employerId_key";
       public            board    false    223    223            n           1259    782388    Company_companyEmail_key    INDEX     a   CREATE UNIQUE INDEX "Company_companyEmail_key" ON public."Company" USING btree ("companyEmail");
 .   DROP INDEX public."Company_companyEmail_key";
       public            board    false    218            o           1259    782389    Company_companyName_key    INDEX     _   CREATE UNIQUE INDEX "Company_companyName_key" ON public."Company" USING btree ("companyName");
 -   DROP INDEX public."Company_companyName_key";
       public            board    false    218            p           1259    782691    Company_employerProfileId_key    INDEX     k   CREATE UNIQUE INDEX "Company_employerProfileId_key" ON public."Company" USING btree ("employerProfileId");
 3   DROP INDEX public."Company_employerProfileId_key";
       public            board    false    218            �           1259    782679 !   DesiredJob_jobSeekerProfileId_key    INDEX     s   CREATE UNIQUE INDEX "DesiredJob_jobSeekerProfileId_key" ON public."DesiredJob" USING btree ("jobSeekerProfileId");
 7   DROP INDEX public."DesiredJob_jobSeekerProfileId_key";
       public            board    false    233            e           1259    782385    EducationLevel_label_key    INDEX     _   CREATE UNIQUE INDEX "EducationLevel_label_key" ON public."EducationLevel" USING btree (label);
 .   DROP INDEX public."EducationLevel_label_key";
       public            board    false    215            �           1259    782689    EmployerProfile_userId_key    INDEX     e   CREATE UNIQUE INDEX "EmployerProfile_userId_key" ON public."EmployerProfile" USING btree ("userId");
 0   DROP INDEX public."EmployerProfile_userId_key";
       public            board    false    235            h           1259    782386    Experience_label_key    INDEX     W   CREATE UNIQUE INDEX "Experience_label_key" ON public."Experience" USING btree (label);
 *   DROP INDEX public."Experience_label_key";
       public            board    false    216            _           1259    782383    GCPData_assetId_key    INDEX     W   CREATE UNIQUE INDEX "GCPData_assetId_key" ON public."GCPData" USING btree ("assetId");
 )   DROP INDEX public."GCPData_assetId_key";
       public            board    false    213            �           1259    782857    JobMetrics_visitorId_jobId_key    INDEX     p   CREATE UNIQUE INDEX "JobMetrics_visitorId_jobId_key" ON public."JobMetrics" USING btree ("visitorId", "jobId");
 4   DROP INDEX public."JobMetrics_visitorId_jobId_key";
       public            board    false    236    236            �           1259    782573 1   JobSeekerProfilePercentage_jobSeekerProfileId_key    INDEX     �   CREATE UNIQUE INDEX "JobSeekerProfilePercentage_jobSeekerProfileId_key" ON public."JobSeekerProfilePercentage" USING btree ("jobSeekerProfileId");
 G   DROP INDEX public."JobSeekerProfilePercentage_jobSeekerProfileId_key";
       public            board    false    228            w           1259    782472    JobSeekerProfile_userId_key    INDEX     g   CREATE UNIQUE INDEX "JobSeekerProfile_userId_key" ON public."JobSeekerProfile" USING btree ("userId");
 1   DROP INDEX public."JobSeekerProfile_userId_key";
       public            board    false    220            �           1259    782524    Occupation_title_key    INDEX     W   CREATE UNIQUE INDEX "Occupation_title_key" ON public."Occupation" USING btree (title);
 *   DROP INDEX public."Occupation_title_key";
       public            board    false    225            �           1259    782678 &   PersonalDetails_jobSeekerProfileId_key    INDEX     }   CREATE UNIQUE INDEX "PersonalDetails_jobSeekerProfileId_key" ON public."PersonalDetails" USING btree ("jobSeekerProfileId");
 <   DROP INDEX public."PersonalDetails_jobSeekerProfileId_key";
       public            board    false    234            �           1259    782504    Post_slug_key    INDEX     I   CREATE UNIQUE INDEX "Post_slug_key" ON public."Post" USING btree (slug);
 #   DROP INDEX public."Post_slug_key";
       public            board    false    224            �           1259    782503    Post_title_key    INDEX     K   CREATE UNIQUE INDEX "Post_title_key" ON public."Post" USING btree (title);
 $   DROP INDEX public."Post_title_key";
       public            board    false    224            X           1259    782380    Profile_userId_key    INDEX     U   CREATE UNIQUE INDEX "Profile_userId_key" ON public."Profile" USING btree ("userId");
 (   DROP INDEX public."Profile_userId_key";
       public            board    false    210            x           1259    782391    Purchase_jobId_idx    INDEX     N   CREATE INDEX "Purchase_jobId_idx" ON public."Purchase" USING btree ("jobId");
 (   DROP INDEX public."Purchase_jobId_idx";
       public            board    false    221            y           1259    782390    Purchase_orderID_key    INDEX     Y   CREATE UNIQUE INDEX "Purchase_orderID_key" ON public."Purchase" USING btree ("orderID");
 *   DROP INDEX public."Purchase_orderID_key";
       public            board    false    221            |           1259    782392    Purchase_userId_jobId_key    INDEX     f   CREATE UNIQUE INDEX "Purchase_userId_jobId_key" ON public."Purchase" USING btree ("userId", "jobId");
 /   DROP INDEX public."Purchase_userId_jobId_key";
       public            board    false    221    221            k           1259    782387    Sector_label_key    INDEX     O   CREATE UNIQUE INDEX "Sector_label_key" ON public."Sector" USING btree (label);
 &   DROP INDEX public."Sector_label_key";
       public            board    false    217            �           1259    782627    Service_slug_key    INDEX     O   CREATE UNIQUE INDEX "Service_slug_key" ON public."Service" USING btree (slug);
 &   DROP INDEX public."Service_slug_key";
       public            board    false    232            �           1259    782626    Service_title_key    INDEX     Q   CREATE UNIQUE INDEX "Service_title_key" ON public."Service" USING btree (title);
 '   DROP INDEX public."Service_title_key";
       public            board    false    232            �           1259    782525    SubOccupation_title_key    INDEX     ]   CREATE UNIQUE INDEX "SubOccupation_title_key" ON public."SubOccupation" USING btree (title);
 -   DROP INDEX public."SubOccupation_title_key";
       public            board    false    226            Y           1259    782381    users_email_key    INDEX     I   CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
 #   DROP INDEX public.users_email_key;
       public            board    false    211            �           2606    782713    Address Address_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public."Address" DROP CONSTRAINT "Address_userId_fkey";
       public          board    false    3419    214    211            �           2606    782545 "   Application Application_jobId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Application"
    ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES public."Job"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public."Application" DROP CONSTRAINT "Application_jobId_fkey";
       public          board    false    227    3444    219            �           2606    782540 #   Application Application_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Application"
    ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public."Application" DROP CONSTRAINT "Application_userId_fkey";
       public          board    false    227    3419    211            �           2606    782398    CV CV_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."CV"
    ADD CONSTRAINT "CV_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ?   ALTER TABLE ONLY public."CV" DROP CONSTRAINT "CV_userId_fkey";
       public          board    false    211    3419    212            �           2606    782485 #   Candidate Candidate_employerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Candidate"
    ADD CONSTRAINT "Candidate_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public."Candidate" DROP CONSTRAINT "Candidate_employerId_fkey";
       public          board    false    223    211    3419            �           2606    782614 /   Certificate Certificate_jobSeekerProfileId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Certificate"
    ADD CONSTRAINT "Certificate_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES public."JobSeekerProfile"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public."Certificate" DROP CONSTRAINT "Certificate_jobSeekerProfileId_fkey";
       public          board    false    231    3446    220            �           2606    782702 &   Company Company_employerProfileId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_employerProfileId_fkey" FOREIGN KEY ("employerProfileId") REFERENCES public."EmployerProfile"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public."Company" DROP CONSTRAINT "Company_employerProfileId_fkey";
       public          board    false    3491    218    235            �           2606    782707    Company Company_sectorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Company"
    ADD CONSTRAINT "Company_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES public."Sector"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 K   ALTER TABLE ONLY public."Company" DROP CONSTRAINT "Company_sectorId_fkey";
       public          board    false    3437    217    218            �           2606    782636 -   DesiredJob DesiredJob_jobSeekerProfileId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DesiredJob"
    ADD CONSTRAINT "DesiredJob_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES public."JobSeekerProfile"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public."DesiredJob" DROP CONSTRAINT "DesiredJob_jobSeekerProfileId_fkey";
       public          board    false    233    3446    220            �           2606    782836 9   EducationDetails EducationDetails_jobSeekerProfileId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."EducationDetails"
    ADD CONSTRAINT "EducationDetails_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES public."JobSeekerProfile"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 g   ALTER TABLE ONLY public."EducationDetails" DROP CONSTRAINT "EducationDetails_jobSeekerProfileId_fkey";
       public          board    false    220    3446    239            �           2606    782692 +   EmployerProfile EmployerProfile_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."EmployerProfile"
    ADD CONSTRAINT "EmployerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public."EmployerProfile" DROP CONSTRAINT "EmployerProfile_userId_fkey";
       public          board    false    235    3419    211            �           2606    782609 ;   EmploymentDetails EmploymentDetails_jobSeekerProfileId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."EmploymentDetails"
    ADD CONSTRAINT "EmploymentDetails_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES public."JobSeekerProfile"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 i   ALTER TABLE ONLY public."EmploymentDetails" DROP CONSTRAINT "EmploymentDetails_jobSeekerProfileId_fkey";
       public          board    false    230    3446    220            �           2606    782813     JobAlert JobAlert_companyId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."JobAlert"
    ADD CONSTRAINT "JobAlert_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 N   ALTER TABLE ONLY public."JobAlert" DROP CONSTRAINT "JobAlert_companyId_fkey";
       public          board    false    3442    218    238            �           2606    782808    JobAlert JobAlert_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."JobAlert"
    ADD CONSTRAINT "JobAlert_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."JobAlert" DROP CONSTRAINT "JobAlert_userId_fkey";
       public          board    false    211    3419    238            �           2606    782756     JobMetrics JobMetrics_jobId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."JobMetrics"
    ADD CONSTRAINT "JobMetrics_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES public."Job"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 N   ALTER TABLE ONLY public."JobMetrics" DROP CONSTRAINT "JobMetrics_jobId_fkey";
       public          board    false    236    219    3444            �           2606    782443 7   JobSeekerProfile JobSeekerProfile_educationLevelId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."JobSeekerProfile"
    ADD CONSTRAINT "JobSeekerProfile_educationLevelId_fkey" FOREIGN KEY ("educationLevelId") REFERENCES public."EducationLevel"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 e   ALTER TABLE ONLY public."JobSeekerProfile" DROP CONSTRAINT "JobSeekerProfile_educationLevelId_fkey";
       public          board    false    220    3431    215            �           2606    782448 3   JobSeekerProfile JobSeekerProfile_experienceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."JobSeekerProfile"
    ADD CONSTRAINT "JobSeekerProfile_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES public."Experience"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 a   ALTER TABLE ONLY public."JobSeekerProfile" DROP CONSTRAINT "JobSeekerProfile_experienceId_fkey";
       public          board    false    3434    220    216            �           2606    782453 /   JobSeekerProfile JobSeekerProfile_sectorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."JobSeekerProfile"
    ADD CONSTRAINT "JobSeekerProfile_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES public."Sector"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 ]   ALTER TABLE ONLY public."JobSeekerProfile" DROP CONSTRAINT "JobSeekerProfile_sectorId_fkey";
       public          board    false    220    217    3437            �           2606    782473 -   JobSeekerProfile JobSeekerProfile_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."JobSeekerProfile"
    ADD CONSTRAINT "JobSeekerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public."JobSeekerProfile" DROP CONSTRAINT "JobSeekerProfile_userId_fkey";
       public          board    false    211    220    3419            �           2606    782418    Job Job_companyId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Job"
    ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES public."Company"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 D   ALTER TABLE ONLY public."Job" DROP CONSTRAINT "Job_companyId_fkey";
       public          board    false    3442    219    218            �           2606    782423    Job Job_educationLevelId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Job"
    ADD CONSTRAINT "Job_educationLevelId_fkey" FOREIGN KEY ("educationLevelId") REFERENCES public."EducationLevel"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 K   ALTER TABLE ONLY public."Job" DROP CONSTRAINT "Job_educationLevelId_fkey";
       public          board    false    3431    215    219            �           2606    782428    Job Job_experienceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Job"
    ADD CONSTRAINT "Job_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES public."Experience"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 G   ALTER TABLE ONLY public."Job" DROP CONSTRAINT "Job_experienceId_fkey";
       public          board    false    219    3434    216            �           2606    782413    Job Job_ownerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Job"
    ADD CONSTRAINT "Job_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
 B   ALTER TABLE ONLY public."Job" DROP CONSTRAINT "Job_ownerId_fkey";
       public          board    false    3419    211    219            �           2606    782433    Job Job_sectorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Job"
    ADD CONSTRAINT "Job_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES public."Sector"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public."Job" DROP CONSTRAINT "Job_sectorId_fkey";
       public          board    false    217    3437    219            �           2606    782792 %   Notification Notification_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public."Notification" DROP CONSTRAINT "Notification_userId_fkey";
       public          board    false    211    237    3419            �           2606    782649 7   PersonalDetails PersonalDetails_jobSeekerProfileId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."PersonalDetails"
    ADD CONSTRAINT "PersonalDetails_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES public."JobSeekerProfile"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 e   ALTER TABLE ONLY public."PersonalDetails" DROP CONSTRAINT "PersonalDetails_jobSeekerProfileId_fkey";
       public          board    false    3446    234    220            �           2606    782505    Post Post_authorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public."Post" DROP CONSTRAINT "Post_authorId_fkey";
       public          board    false    211    224    3419            �           2606    782393    Profile Profile_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public."Profile" DROP CONSTRAINT "Profile_userId_fkey";
       public          board    false    3419    211    210            �           2606    782458    Purchase Purchase_jobId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Purchase"
    ADD CONSTRAINT "Purchase_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES public."Job"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Purchase" DROP CONSTRAINT "Purchase_jobId_fkey";
       public          board    false    3444    221    219            �           2606    782587 #   Skill Skill_jobSeekerProfileId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Skill"
    ADD CONSTRAINT "Skill_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES public."JobSeekerProfile"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public."Skill" DROP CONSTRAINT "Skill_jobSeekerProfileId_fkey";
       public          board    false    220    229    3446            �           2606    782526 -   SubOccupation SubOccupation_occupationId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."SubOccupation"
    ADD CONSTRAINT "SubOccupation_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES public."Occupation"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public."SubOccupation" DROP CONSTRAINT "SubOccupation_occupationId_fkey";
       public          board    false    226    225    3463            _   �   x���9�0@��>�/0����qK���"�P�L�H��,qz������ݫt���Yxh/�.I������tMaV �ܩ-�m׋C�/V��"$�ĺ���q;�M+KDQc�l1���ځ�ue�P��p��̏쿼��n���o�����?��*	����m	ɹ\WV{c�<R�7��B�      l      x������ � �      ]   J   x��1�  �����ؒ���P@�!:�~��C��ȃ���+�q�~��AD����d�4*F7��RP�p� ��j�      h      x������ � �      p      x������ � �      c   �   x�E�A� @�5����-.`��	��@��N5���酨q�_�EX^�� �n�L�b�\`݅�M���D=�_���D-U�ʌ[��a�`ˣZyp>���8���Cy&h���S��R.u�8yQ�����7N�2�      r      x������ � �      x      x������ � �      `     x���=o�@���+n�*`�ڭEHU7��q�k�8�]��7GU�	��xx^[�&jO͇h�yo�:��J�)C��JS^1����܊�����c�UMiS����(3�B�G��=�w�H��m~N=�4��UV���{�<.<P�3�a�m����:��w�tX�ϊ�aB��n�����S��ŋ�
�͓�l$�{}P������	�P/���N|(;�~�/��f����+�c��~����E6�Ě���.4��}��v��      t   r   x��;�0 �9�`��.]���(��Rz��om�ח��\f���Z[���zoP�3�[�"ц`h;�w��w>�Is��Y�%k�5R���.|(����#<!�A+"�      o      x������ � �      a   �   x�m�=�� �������m�����b����ߐ*��?�fFo��q�;ιj��ꐸ�o��0V��]��w���\���>@�������� �~��a�lpAsləu�4�,݀��L��^�fV;nD�L�5g���������R��J�^L}kɗ@�Q����x269���D�4N����TU�?q.q�      ^   �  x�e�Oo#7��ɧ؋��`��(�
`A�do4=,�J�����x4߾2�l��I�z���)xq�w� �_�En������������n?ݯ_����Tۻ��U_��M�srW��s�;����TO��Pt�����v�|:?���y�tk��8n����*�a=�pf[κ����[�����?~\>u���~;Nü;l�>|x��oϏ������w���&�]s���l��Pl�������^_�SBXzXmo���+�~�&	�o�2�}���w׎��d_.v�߼��6o�~G`t����/���Λ �W��a{��޴�t����Į7:_��X��"�� �T+:��Ru�9���Y�[��|֢Rp��\A_��ʔ�#��*W\���5�QVr���*�C0磌��@�|+!��%�-���Ρ\����fL�Æΐ%J�\]2��ʵ��I=U�ud��bS�c�Ԫ �H��$�vj+�r�22I��5(KJb}L�*f�@/5ta�)�~*� }�'ޠ��}�DM���=�n]%2��0VO�A�i�n�qbk)�dɊrH��D�a��DԔCn�J��\�N�I�OɁw�a���� t=��}�}L9 ��$��M�Oܡ�������?:�$�      d   �  x��]�n���y
!tg�ȡ仓	�&�N�������D[�%Q�(;���F_�O�CJ�/I��nڙ̞AK��s���?&KǛ+��܅���s5J�kW4bY� t�P!�V�2�`��/K����گ絣�������b����z���h��{��_\�\]�Nޟ�k]����� ���t	�=����^�դ�Fw�$5?&����Z��V����^>��YM՜��D�9�6Zy6�g�kO��n-�n��K�Dr_��%n�&=�q-��7�}��ۍƳrx~Bj�ڧ��_oN���z8��d�	rtqv98����ڙHTX;���*�t�S�
q7_��t�l$��2ƭ��𙕩E���xԟN�ȓ��E$d�;��h5{�������T���<Z���i���勀}�k},�+�d�IhQ�YJ}��p]��%�;�����3>	U�I�~�f�ŽӃ�+f�g��d�;f� I*6�s��ϲ�~��龇{�9�W��r0���>9��K���u)�E�2��9�Rx\����/����hx~}r4��pr��X�h�L�d��]oK�Ҟ�Y�u,����n��j�I�������X�8�>16�NO5��N��3�$���춝O;A��X$R&�)=X�P�$�U9���?QE庣���S���Ͱ1<U;>��o>��K[������e�9�g��;���ӭ�N�Yya�FS[��b�����M��N��H�=5H��r�l���ˏh��ۉ=�i��n[��+�>�
�b1�D�%O|�C�N�"�����@����\���dR;8@�ݢ7T�Lm�'�. Dl�!̙-���QOfL>H�ws��gT��A2�rZ	�42`҄
�L��>yR�x�o+���<�#�����g[f�ؖH�{M�f�b�!ļ���tX�"�S�q�E�ݨĳM3N�h�ؔG{��I3HT��Orɶ���k#W�Ґ����wh���jOS�ch/��K��[Q�m9���Vo�i�]��ޭ�~X�Ó�����x{���F&��#�{�y��>���jz��v��$��Aag�v���"��,���
LW�-��ǀ�����%��`{)O/0���
���������IQNa�C�p�B�	tUl5�Jd�3o�U�0�"�l̈́�
�ѷn��kU~�/��ǐ��<�Ҩ�1�LDP?�Y�vF�[�t�����4��1@����ݰ�C���4��떛�K����Jw���=�"�Iٴ^��ݖdq)1��Fs
�>M�'">Ѱa�Sj���O�c�����n����h��i��w���fH�dWU��)�n�#�ŷ[m�kU!���=x@�1[o�VƠh�����T�"�z�s���� P�i<%���gC�/y�'����C�k�j� ��]���0�av�춖�^q&s�]�!�Vo3g�R%֒Q���`.zt ����~�	ȓ�N�毭O�������f���./�VQ�'!�GmD�JV�����0`�0�}�1T��g�8@U�ZX4c��t��@0���'?j���̫�l޷q�_wټY �X��$�^�,�d�8����F4I�M+��y�o�<M�TFL�����,%,2�%���>�	@H�Z�R�2_U�l�P|N\�)Fc+f���O�߇�� �W5|CH=�Y.�6�e���Zw9�8x���`�Si͹
�HL `�����%��]�&�	�V�3�������y.L0H,�f�͵
4Z�	�D��m�R����'b���4��>��A[�6jW_+���*����b���4�Yމ�keV*�;j�6��*`��j���yt������?�j�Y��"1(V�.-w).vP�)@H�Ш���,��،o��L@Aݩ��'z�4��U���tAi(0P
�@���f/���?���"m ?�<F��B�_<�wɨ�eX��cC<��@�h�Mu`|E�@�&R�U�^=�w��?h�Q �J��- i��y�#M���b�YdT,c��.��+���3>:L �1�I#H�l
�f�y��JHw:��u�ݲm�
��S��Ɵ��A*��hS� �2�,�}�5��b�c3�t�Fm�Sw}БN`�LY!lm�Mz��7(l�M���]9Ц�6 ��hTv6K2-�sèz�ܕ�)�R��orW,�H�Q���T��`��1�����V�Xc�"t��舗gY9��k������*jI�{�c�˓�!�u�œ��)��e�=c�9�npƆ�3I�4
��l�O�9��s1���$�V̞d��-��i�@�3/f��##�Ȉ|� _ ���0�av���!�|�`v�����f�` � ������<F���.��/�|� _ ��@��61��'d�@�志10o����%4c�ο��v6A� �Ј�Fd c �������-Qd c �f�.�6� c 0`�6�}��12�tٌ�d c �@����p_�1���ө�������yKXGO3B��9!2�Ј�F<4"c �@� f7�n���(o�"c �]0�`vy���0�a {��+.��1��fd c �@� 2���}ǀC�n��%��)���]���8�c`pzZ�&��"qλ�7�x� �AhD� �񴈧E�
 U �H����۷�^(R�*���f�W�]�*��W�����_�lF� R�*�T�
 U�E�W�������{�>�V�_�N����P����l�jx��fxvyz��Kp\��f���~�z�W`�[ڳy# ��h�[�~�S'n{�+��;��m�\���(�N�8�>�3�}���u�D�*�oogI�'��jG��*��Gl��� J3����揈y������?� ���aƭ��G��'�g�����j8�y�Ҍ����K&K��>�ʎk�n����I�}V^Z�񌕯�Mƒ����6�&wmOZ���0����9cM+��<���ۄ�w;7D���>z���'���ؘI؍+��w;�RPi�����q{*��/��t/�^�7By4������J��\.�<�!*��={ƠzRf{<�DS8��!�τ>�*H�v��-԰�ٞ�tI�ۮ�*�v�b��z��
.�?���\��k?A��cR��0�'�������p4�4jē�b�n!a4�ܶ�cl�n�4��[��7�~��{��l�����k�͛7�E��      w     x���Ak�0�~
�l��D�x�`��e��M�v�h׺�w�i������y~����R& P�����������`J�@��Q	�2���B̸�k����q��%�Pa`�C�S�����r�=�ɦ�f�K���j&�Ρ���v��b���8��l�${i��¨jR5Ne�J�u&��p��81��P����
VV�}[[��.����8�����u������7�O:=|�[�'$�$���W�E��ET}^�e8�����Lh�L      u   \  x�u�I��0E��)r�P�a�,�����0���,�:�����=I����n�r�Y�����C_�'81`�
��p��0a8E@�0O[pPĢ ��e���M�Ν�)F4y*�}o�׼�|Oڢ'�x|7�����dE��bO��E��'��اk���x7�X��=���T2������pm������ɲ˔zֺL��\�ɹ�q�2���}��N�W�t�?Y㞎ᲁ�sE�:�>8�H\�{�Ы`�S��w�2 #M�0�� ���ܑ{;�@��:�&��m���]O:i�<{u�s��a���i��͚��-dfq��g����{]p*�n��;�A�H���x�W�Wt>� ���+      e   m   x�K�5(3.N��2000+L,K,�**.�+I��CAF�&&&���I���&����溦I&)I����)P�FF&��@�`hbelleb�gn�K�����+F��� "�      m   B   x�K�5(�(*4/400HN/7��M.�L1�6�L�5(3.N��ʘ&�%�W�$s�r��qqq ^�      v   <  x�Ց�J�@F��S�L�3���Dt�

n���L�iM�ɴ�yz'EpYA�p{�r���a"f; ��צٳ�z� Y�<��׫������6		�0hL(U� �	ƿ�9]pY�΄�JcKCf9(�%��Ŭq�He��K��d8�aӅ���V��0��
0� �P*�Њ���f�\�֍���uCxkר�<����[�À�r@�wep6=��S��3���P��2]P��Z�A�0UC0� 94b���R��2""�=����6��墠,F_`��Y��
��q�v�lav�����˟lKTJ��m_�4M?Fz	,      j   K  x�m��n�0E��W�����eQ�r�����l9�$P����GJ� ��N�=��hwK �vs<��0�ժ�����X��Z�Ͷ`�ڜP����Þ厰��R���]{9�z�9F��;�G��c�%ؒ�`�!�.��c�����3�y�&�_�pڨW�bm���z�r~Xn8�}�4���^��,��:0���3c �M��B[��z?ks9��i�M��}*UqL�}Ui�矲�eTd:��qR��:]3�6?���`�������v��|{�f�ݢ�`�>�`�r/���}�, �c�Xi�yR�-O��e=�0�c��\U�_}��      s      x������ � �      i      x������ � �      [   �   x�e�=O�0����+���|��3b`)��c�b�vj�H��ד.,����;���%rO��=���K�����%�;r,����Z����3�2 0!B&�18NlCc��;r[7���%1?ϡ�������xܿ)���0sɦ[�	��������紴v}�q�������}�����.ޖl��!6��9Al�@i�y��>�k�� ��L      f      x������ � �      g      x������ � �      b   �  x�]�Io�@F��_�)'kd1�8e�4��>Υ�]@A/v/ ��O7�B8������<����M��R<ڀ��-{�"OF��'���C����nſ��$�\�<{7�L$�k�&Xrj�����#�@Add�1>t��H�$�tު�����Q*h�W�F���U��Z��@R�n��#�m�IY��8�%�CU���%�3�"k���0v���a�a��fV����D�D��;Z��l��%IӒ��x��	n7�[�>@�x,'Ʈ�_����fo�#�Z���\�<�{q}9�u�^�ӼZT���i���Ӷ��D$熦�H�\lp��_N�z�w[��Ѷi�qN_{O$O��r��	{F��9���܂���T�T�ܖ4�����Ў�q��\Ҧ)t�9�W�0��>��¿��mӟ���/-���      q      x������ � �      n   �   x���ɕ� �5Fa}
l���4�q`PAA�oH@׏�� �!��
��2`k\d=�>HZ+�(�a��w�k8+'� ��N�ݭ��kL��F��������1c�(�7��q)i���Dz0�v��:V5$%����8m�l���}+Ӷ:�9,����@"r��e7&�e�u��)�m'�u�޺Ѯ/
j5���;�x���}-���Ϗ�v�L����qU�@��V���!��3툯n4�c�������(���      k   �  x��Yے�8}f��г��e?f33����f'��˼P$Q�H��$�_� d��s�z��;h� p�]�΁,� ��`G3�U��[�A���)�ntQ=wB+��Ѯ�1\,+.�+����ΐ�b�o�a�-氯�h+�Nw����榪D��	aco�-���V?��r��[o�ρ��F��6p�bpb́%�YP�v�U��P+�ӏn���NQ�M�nn
�켥����Ƅ�-;��u�{/�ƻ�t\��½E�b�îc�
��Z�Z
o	@�}y���?��z��� �|�@`�r�l;�o�w�QUm��R���#Zjo9��ʳ2d�qs 'T�f@��Z*�����>�B�ր��r��ř��V������u� �e�yKt29���w�R�yí��
X�-�[N�N<t�,p��꫄��;Pk[�	�mU��5{�m/��⸐�`!f�
|Z���i��[)����C�|E�]��o�:�j��K�%X.�޻�۱\�r�b�]X��x��W@��T�]�
?�Gn����78�8D͓2��J�x��������7v�F��4�k�o"��D@��L����kVa�D����nԧ�`��iVg�a�˵�h����Po#�g�s%�A�b��\��E�'K��Ev޲���9�KE)p�6�հ�nQ�-�����+7q��򾗷�/������l�=^8z)�%�;e�Ⱦ@����}oc���L�6��+RԣK�Н�?�E�Xb|�{x%k�Q����w��XG�S!��U�'0�(�Cd�tY'
��^��W���CV-~H��m�7<~��A+"z��`vY��a���a�B���4�L������B*0MǺ� ��]?��zG�i���ˌ�Wg�޶�K��j7��1��Q�M��z�n�Nw��)$�Gʮ}�;"��?�oX��H��Pws����{ lT��C�k�6�������HܱS����s9��\sS�"6MLRM��b���b)���,|�6=�<�k_@Ʃ1&U��(E4M�� �腔
��9���;;�LL�O��.�ap�^sz\Jb҄	�}��}r���|?
� 1��<�䎧{��pd�wH�%W�l��_�����3"�CVoa5� r��=l*!��e�C�qo�M����QWG�������gw���nR�#f�+e2d�G�K���#5��D۩����7���j�f���K	�>W���x;v�ٹ�a�p��+�M�8eS���"������� Fn��؜�z<]�U�~$�c���o}e��������X/����`��*s���w�cl�S�Z�k���kZd�?Dguf����4���|K��"�Ji	�W�_�-�-�4n4�;��rG/���:�_�>����]3%a)ا��ҿh��Y�{�/�*>��JXT����K��yy��D�����%!��r�0�.��O��t������>�Pob������\��p;�?_3(�+���R�;+��+�>�E�#Ƭ���������>}�9�)1ɗ�2A�w�����%�Ǽ� �F	���v;�N�w��@Qd����@�N&�^S9��붻Aa+%TlU�D�)�G9t��=fD8w�RB\�>>#�~w�D:��v�o��ǐ�o*b�����~� ��z�����=ܒ�RB�ħ�H=��)TM�s1�ң�.�σ�����HT �_��=�P�b}c�}��v��Õ.��}�w��⒐�v���Ա_.z'K���e���u����P�#o�m�,�8(> �^��~�}�]q!$�ȿwl��e'�Ts`_����e��9��u�ND��dZ��L�u���{����s�;�SBzv�ו'J{B#�6��q�G��Z�r���V��j��m�v7�h8%"��ඥ8�w������
�|Wp��6:���������?�R���$�[�����K*:�	=\��kJJ���nT:Y^�@#���A.ױIe��5�=t�ؔ݇}wL�4���ni}aLkq�N����з��E8�����i�`��j���{�^�W�����&Rқv��6jO�?�������-��<] "�>�\^U7B��#���D�_�u=5����WZF~P�o�w���"#΢�ʌ����59���\�^�.��s�-!��_�^�z����7o���$��      y      x������ � �      Z      x���K�c9�E�/WQ�4���E�

H�ԤG��1�<B�+Q	Td�?ɞ��������ҫ�թN��Õ���9�s��-�7{��s��K	e���I�5�VD��Zkj~�Z�Ƿ4U�_�u�9����S���?4e�?>����!x���z������Ǽ�j��_���n.�v���\[i�1v��O����znkg��tV�;հ[J!/���O�U����ٹ����*���~��K�����r��������^W{�����2zѰ��4�)��Z�مQJ�%O_�U|�͗�����*4kr�1�����g-=�fm��)k���3��-�C��s����������^��q��O.n�&�������ܫ�9��RQ�J�rj}l�}+�2{��^+��O>�D�[�%�����ښ���WP�C��/~��Cӏ����<�u��ӣk)�e־➳�!& &�\��uJ�5��c�ܼۧ���ƶb�)�C���"rm���]2�D�=��=`s���디��\�<��7ڙ2��#�k�&P���������j}����aAۦ�>�*���}����>�����Pb�ۇ�5!�w����,�quP3���Gk�1c�튳�R{;'t�%J�UG]=Ϫ��j���T8��#�����{�naS�����7�7�|C6������[n ������Y-��"�q���n*�#�W�[�����q��=�m֝Z]������Xy�<`��Ӽ��=���n^!��d���]�S=L)ǵz��(���|z�ƛd��p��II��%��B�yྰJ�P��~x�� ��Ux�}k�o�=_B翁�}�r��Q��@��t����2]}� RFԴ2��%%���Jg}��M�$���]��x�.{�-����l,-珁�(^B~`J�`)�ǔ��b�:?{��n��W�׳�A��|��lڙ�ƈ�	><c9g��A�t��`m�<˩�s�)�?�[�ƿC�G���%�*���k.�kꅡ-�搥�r�{��������^�'d��q�L��x��`8�R�Q#%�x������a�(w��c��׃/`�;68���E�h��= ���,�%h��5F�i�9�*���7���J�ᬚ��jzl|��bk���}@������v��V#�2���̛���Ϛ#���lYN���}iq��Z�莝��87Dv���_s�/%�C�qo(a�k|{W���/������P|��SZ�����ꉆ��
�m'/�K�L��ʂv�I_x���sx]|l��7� /1�YJ����9��D�X��p�ŝ��&��\aؐO|�P��a2j�}�4h}���<����h���`I{��06-�����1�˿+��?$�j�(ɥA�-6�y��)� M���-�`�^ ��N/�O,�wV��cZ2Z�R��p:*��~C�RQ��4�f�R����﵇���� �0]�.S��Mv�k�Ahg���b���X?
|Q�'�%�8f�D#��R�av~ֱ^�a�Bczj<�55j�_q�w;\ MX�:yy���h� <��Gj�j-!d�[��.8?�evtN���D`y�����P�־!y�$w<���P�7����	l�;��$u�W�54q��C���9�K�@�=���c��ѝ�Ilm�6�e�Z�ŗ�v��0^�!Ϗ��,��Ϥ�,%�H��sN�s�R$j/�Y;��3�'��s��*JJE����$�R��D�x5`�ܳr&98."RY�d����C�S��7�z�_�1��4D��HLvd;`3j63Ub��]T������0��1�b�<~(s�N(����$2��[ά��ҴFy(��,�0ޑ�T�x�ື�G��V��?�M����}���OI;D����1�j"�؃@�1	�%�!?��]��x�Q��w���2�s�7@�QZ��x��|�
;"G$�u<���	���J� �d���#�R�a�l|`����o�������ze\���a��`B��0�j���1x��"��_�+�8�3�k٘Iǁo�i�/��^c Y�) ��������x���1e���>�'������Y9B�q�
�VA]I�E/B
a������zUlq��o�am���`�F�d�\_�jZ��W#�w^>���}^�X��ff���A����Іv]=��;���@�"��_�e"h��_��dz�b,�r�V'����*���;�Vl��<�#�{�Q��Z.G�7]+�?�\��b	�Z[֜�x� �N�'���n��储�y���ǟ���5���T{���wD	'cg��M�an��S�kk�`��a�Z�E�&�3�Xw�W	R�d�	����jB�a�j�o��E�"~��z�1��K�R�DP�5�2T�;��qgq�Z+~{��ǉ�
��qY��V��#̜�Q�v{�@��e�9���|6Vb�4'K�S����%'և-VA��<G��E����wȧ� �>����"vu���T,c��vWW��pj{c)���C�%͊��8���@�6�U�b��'ra��[��fk�?�y�Z�}�����q���:ds�9�c��k)~�/�+���D��C��W���#��1�d�<\O�"�����ږ���c�A���w	0Zк����i��#N�Yp����1Ր6���1,��2�dFF�yJ3�'�M�f&� �3��Ԃ�T$��4$Q�U�4�k��wV(B����+�w���Н5� p$Cs,�$��,1��q�) 2��8����]��e2���!��x�ox����oa��;y�@��� ~r�n��+(T) �`�7/u�fˤ�'�'օ����^�̀C�V��F/�H�,��\�����w��T�K�jv8��W��W�*�o�_|���\�9��d�8/�1�L�,�Q��AʀT�X����ekab;XOm����S�7��P��� �����w��f)��Wp�A����r\ �[�]�H��ʏ/�&b���X�uHǗ���+�ٖ �0���p���(�`>���?-�핉�1��K�|��|��,��)ݲ����=�n8�D��[��2���egN�w�<gŞPe�so�^�*O�+䊾�wvXMo��*���� -EW+Q*�M��×�f*��� ���
�S-U;`�79�nA����mc����Fx|�M���`[6�$*y�����Ӷ������R���Jv�J*�L$� d���D*���J���*�ET�[��v�/�k�f(xYٸ>����6�x>�^�l(W��f]��ne���G_��<�v�6�QQ��67�;�@�=Z���	��l�3e4�u�՚�kO���3I�2".�d�nؙ���xp�k=K�,�KjhĦz�2;���60�[=;�jV��ה���cZ�m�xe܃���*l��K�!�����(��(*�5��0am�7�n�M�:Y"ŋȝ����p��P|' �l�?a$�m���whS$E�z�ҬO��;xy���)��fI7�b��ƗZ\]سR��jU�tM�(9
�����N�C���)mC�R��v����dD�qD��~�cC^ʏ����6�P�;;���_�:2�¤�t�;A���%K�O���:����'x`a�.sL�ց�;f1VZ����%���*p�!�.��d���5�c�b;�704	 8�ڃJ&IuC�c�� J&j~@0J���/������E���Q�@~<�I����َ��H*ڼ�;}M���7�V숩B��lc#u8b6��<8*�AMO����-!���0tP#l�\f�,�Ęc���k����_{�T
��v ��R�;�JW��㙑Tɬ��>uP��Wk�#���(ʟ��k�u���
����JH/9�fG�S��?��K����z~��h^�N�Q��z\�OUV���P���4�ξ�SN�5��?�W��im�ӟ~}.�bj�f�2���@��@z�������F]kI%<7�~ظ�C�I^����H9P�Cl�̾N7(�ad�R�w0 |	  <�D�\��L5`�2����A�b8���&cE�,i݀z�^�����[�����|zg
�z�IL+��l���7«m���6���|&����r��$ېΰs��ǐ���x����p�Dv��->�h{n<�l���֐�?3T������d�mg���Q�<f�v�'-�B*9#���`n^�����d�h���3���r�2� ���`3�\{�m��;W�[�׃�>	�tm�d'�H��ۗN2,��q��=��1�vR@��`SW��ɯv/����?"�癓�����~|A<�L���ٚl��3z���4J�;v0� �v47�Lx��a0e$tY "��BhEG'Q�����8t����V�'�c�Mz�y,D(w�?�N������Ch:�]҅��A�W'A��F˱�<^E����~��7�����N��L�DnR���-$�=�_Z�U��|zg�LL>7���.w`k;�8�&�&���,F�y�ݏ��-��g�]|��z�aD�>�	~B;ƅG^e���� ��!��n� ?w���ݏ\q�Ο��YY�:�m�./���Iq˶*>�X�],�<e�ix�p����x6w>v��!H�~)>�hd��9J�4}�ش�X^��M��
�d��z(��8�U� �&f0�����(v+.x�.���R�2^F��|m����捽��� �%i�W%Ҁz�?���7��Rw�8I�B�z^{E�c��N�E�K~.�a/ۘ�l��Ŏ�>Ԏ.^W�+Ֆ���ǁ}z��</�sO>�A�p{�m����m�V!w�A�M+nu�),�_-�e��l'��AsfV���S��Ђ��tK*�_4=�|Đ%�P靝�5�rW׹6æ�Ř�#*ggg4�^���RΥ�A-�A�o��f���(1�NT�}.,VcE�$����V(	���O�h���T�`��0��k�h��ꉹv��UB�,a��9ݚkY�q�\Ƥ(���L�.�ʝ'� Ӓ�h#�~�g[�� O�,g��PM����΋يO��0�I�=��m�]�]C�07v��es�~c��"�R�i�h<;�$u�8��d'h%���J��7*��)��߄WLM�Tì�	&��=y(|��6W� f������ �%at�Zv�^C^���v��BS���l_s���N��b%ʬ�c��ݕxT(���0ew��m��� ƻL�g`c��qȮ��i_ǌWŨC���p��9h�71��9 b�&�����y}���Z�>u^��-������~���Y��<�~���<j�,tl�z\�c\'�u��2gc2:�&����M5i\ک�,=��Z��}� �_���?������a`�ox�!�k�Ϗ�>O�"	bb��bǗ��"ޮNT����z�=�z5Z��,����h�����c�;��Fb����NB��W�l��w}�|�S���R���{�y	�8�E*�����C� �O������X�	bl�U�QO�u&�!_j����qH�B\�e�e�'�?c���*��)�� ��������l�n�3�<�$��w�w8��=,�}��F�T	>o�^�{�b%��� ��X���{�hU��2�M�ſs�e�ܯ1wҒf���x�ݰ)���:J-����	�o���]�au��\�Σ"����e�)v�mbO����ͼ�M��(vTlW>�s����zmC�18��w�+��c7��5�h���O	vi�no���v� K�W/�3U�]�ǚ�����5����UJ������d�*�B�U��T�_��B�6}=f��⶝8���H�я�ȱKG �7�;��vF�(���3m��nݰ#}F^�T�>�!E����,��:߭v�5����cx��� ��4bje�����ee���k�])�M3�Q���k8"�M֦��qV��6�Ά��Ίi����b����.�=�d��7�_���L��'Ր��Ӳ���`)Q(#�M�RoA�虐bE�r�g�vb�,t� �Q:�S��I����a�/U�����k?(ԭ�y�_���1��|����d�݌k��oR7����<��kN���tT�v�M��N�w`�EA��w�1=�� f?>Va��t��%�g��vU�|�PO��>��)�Q�Z�V!��U��µp_c����]'���3���ޗ�c���gɅv?���T�6���?�?j�\�|T۱)_���1���o�,bj�^���`�+�g�'�g�a�rQ�,u0�������2�]����2Aфj�iF>�/Ct�D{j!�����G*�s�y�Q�+Q>=����=ʳ�nI��v�d7XY�/Or�v�&A吷m����/�}��G+z��؀w2D�vޖY㧁�h���~H���H�G���Gy|L�~n����_����LO1      \     x�}�Is�@���+r�uƳ/:�E!Kɬ媔v�B`�_H�����>������V(A$B�� BB$Zq0�R�Z/nk����9˒��5��F����xm��}��`��J���9�\��	0zXF����#����:U�(W	�E�L���!Y�B��b5[����{�Z�3y/M�j|�۬,3gb����<��<.�؝���Yl�&:檄[��
X�;�SϾ�o��m�f�i C� F�Zr	x�X&K_͋�*��ͦȒ���W��C��g��@��m���������ǳMaORT�<t��t�4t�ݪW������5��h��ᛦ��M'��ޖ̀|V7e>)fv2L�����!\	��vs������;~߿��EPѶ4)� �)��N����h&ҫ��7��E#@.����A$H���@ؠ������Xv4RGFNSߛ,�����U�EN��p���?�$�mDU���˽���l��?6bΰ     