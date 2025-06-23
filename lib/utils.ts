import { db } from "@/lib/db";
import {
  NOTIFICATION_TYPES,
  SUBSCRIPTION_TYPE,
  WorkSchedule,
} from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string) {
  return string
    .toLowerCase() // Convert the entire string to lowercase
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string
}

export const gulfCountries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "Australia",
  "Netherlands",
];

export async function getPostedCountries() {
  const countries = await db.job.findMany({
    select: {
      country: true,
    },
    distinct: ["country"],
    where: {
      country: {
        not: null,
      },
    },
  });

  return countries.map((job) => job.country).filter(Boolean);
}

export const popularCities = [
  "New York",
  "Toronto",
  "London",
  "Berlin",
  "Sydney",
  "Vancouver",
  "Manchester",
];

export const allCountries = [
  // Gulf countries
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",

  // Existing countries
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "Australia",
  "Netherlands",

  // European countries
  "Albania",
  "Andorra",
  "Armenia",
  "Austria",
  "Azerbaijan",
  "Belarus",
  "Belgium",
  "Bosnia and Herzegovina",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Georgia",
  "Greece",
  "Hungary",
  "Iceland",
  "Ireland",
  "Italy",
  "Kazakhstan",
  "Kosovo",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Moldova",
  "Monaco",
  "Montenegro",
  "North Macedonia",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "San Marino",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Turkey",
  "Ukraine",
  "Vatican City",
];

export const getGulfCountryCurrencyByCurrencyCode = (countryCode: string) => {
  switch (countryCode) {
    // Gulf countries
    case "Saudi Arabia":
      return "SAR";
    case "United Arab Emirates":
      return "AED";
    case "Qatar":
      return "QAR";
    case "Kuwait":
      return "KWD";
    case "Bahrain":
      return "BHD";
    case "Oman":
      return "OMR";

    // Other existing
    case "United States":
      return "USD";
    case "Canada":
      return "CAD";
    case "United Kingdom":
      return "GBP";
    case "Germany":
    case "Netherlands":
    case "France":
    case "Spain":
    case "Italy":
    case "Austria":
    case "Belgium":
    case "Ireland":
    case "Finland":
    case "Portugal":
    case "Slovakia":
    case "Slovenia":
    case "Estonia":
    case "Greece":
    case "Cyprus":
    case "Latvia":
    case "Lithuania":
    case "Luxembourg":
    case "Malta":
      return "EUR";

    case "Australia":
      return "AUD";
    case "Switzerland":
      return "CHF";
    case "Denmark":
      return "DKK";
    case "Sweden":
      return "SEK";
    case "Norway":
      return "NOK";
    case "Poland":
      return "PLN";
    case "Czech Republic":
      return "CZK";
    case "Hungary":
      return "HUF";
    case "Russia":
      return "RUB";
    case "Turkey":
      return "TRY";
    case "Ukraine":
      return "UAH";
    case "Romania":
      return "RON";
    case "Bulgaria":
      return "BGN";
    case "Croatia":
      return "EUR"; // switched to Euro in 2023
    case "Georgia":
      return "GEL";
    case "Iceland":
      return "ISK";
    case "Armenia":
      return "AMD";
    case "Azerbaijan":
      return "AZN";
    case "Belarus":
      return "BYN";
    case "Kazakhstan":
      return "KZT";
    case "Moldova":
      return "MDL";
    case "Serbia":
      return "RSD";
    case "Bosnia and Herzegovina":
      return "BAM";
    case "Albania":
      return "ALL";
    case "Montenegro":
      return "EUR";
    case "North Macedonia":
      return "MKD";
    case "Liechtenstein":
      return "CHF";
    case "San Marino":
    case "Monaco":
    case "Vatican City":
      return "EUR";
    case "Kosovo":
      return "EUR";

    default:
      return "USD";
  }
};

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

export const getNotificationHeading = (type: NOTIFICATION_TYPES) => {
  switch (type) {
    case NOTIFICATION_TYPES.NEW_JOB_POSTING:
      return "New job posted";
    case NOTIFICATION_TYPES.JOB_APPLICATION_SUBMITTED:
      return "Application submitted";
    case NOTIFICATION_TYPES.JOB_APPLICATION_ACCEPTED:
      return "Application success";
    case NOTIFICATION_TYPES.JOB_APPLICATION_REJECTED:
      return "Application rejected";
    case NOTIFICATION_TYPES.INTERVIEW_SCHEDULED:
      return "Interview scheduled";
    case NOTIFICATION_TYPES.INTERVIEW_RESCHEDULED:
      return "Interview rescheduled";
    case NOTIFICATION_TYPES.INTERVIEW_CANCELLED:
      return "Interview cancelled";
    case NOTIFICATION_TYPES.JOB_OFFER_MADE:
      return "Job offer made";
    case NOTIFICATION_TYPES.JOB_OFFER_ACCEPTED:
      return "Job offer accepted";
    case NOTIFICATION_TYPES.JOB_OFFER_REJECTED:
      return "Job offer rejected";
    default:
      return "New Notification";
  }
};

export const getSubscriptionHeading = (type: SUBSCRIPTION_TYPE) => {
  switch (type) {
    case SUBSCRIPTION_TYPE.NEWSLETTER:
      return "Newsletter";
    case SUBSCRIPTION_TYPE.JOB_POSTINGS:
      return "Job postings";
    default:
      return "Newsletter";
  }
};

export const getWorkScheduleLabel = (workSchedule: WorkSchedule) => {
  switch (workSchedule) {
    case WorkSchedule.FULL_TIME:
      return "Full time";
    case WorkSchedule.PART_TIME:
      return "Part time";
    case WorkSchedule.CONTRACT:
      return "Contract";
    case WorkSchedule.TEMPORARY:
      return "Temporary";
    case WorkSchedule.SEASONAL:
      return "Seasonal";
    case WorkSchedule.NOT_SPECIFIED:
      return "Not specified";
    default:
      return "Not specified";
  }
};
