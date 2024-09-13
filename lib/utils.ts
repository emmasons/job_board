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
  "United Arab Emirates",
  "Oman",
  "Qatar",
  "Bahrain",
  "Kuwait",
  "Saudi Arabia",
];

export const popularCities = [
  "Dubai",
  "Sharjah",
  "Abu Dhabi",
  "Riyadh",
  "Ras Al Khaimah",
  "Fujairah",
  "Muscat",
  "Umm Al Quwain",
];

export const getGulfCountryCurrencyByCurrencyCode = (countryCode: string) => {
  switch (countryCode) {
    case "United Arab Emirates":
      return "AED";
    case "Oman":
      return "OMR";
    case "Qatar":
      return "QAR";
    case "Bahrain":
      return "BHD";
    case "Kuwait":
      return "KWD";
    case "Saudi Arabia":
      return "SAR";
    default:
      return "AED";
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
    case WorkSchedule.CONTRACTOR:
      return "Contractor";
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
