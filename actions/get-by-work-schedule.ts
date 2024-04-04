import { capitalizeFirstLetter } from "@/lib/utils";
import { ContractType } from "@prisma/client";

export const getWorkSchedules = async () => {
  const workShcedules = [];
  for (const key in ContractType) {
    if (isNaN(Number(key))) {
      const labelWithSpaces = key.replace(/_/g, " "); // Replace all underscores with spaces
      const formattedLabel = capitalizeFirstLetter(labelWithSpaces); // Capitalize the first letter of each word
      workShcedules.push({
        label: formattedLabel,
        value: ContractType[key],
      });
    }
  }
  return workShcedules;
};
