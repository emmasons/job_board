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
