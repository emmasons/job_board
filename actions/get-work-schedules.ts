import { capitalizeFirstLetter } from "@/lib/utils";
import { WorkSchedule } from "@prisma/client";

export const getWorkSchedules = async () => {
  const contractTypeList = [];
  for (const key in WorkSchedule) {
    if (isNaN(Number(key))) {
      const labelWithSpaces = key.replace(/_/g, " "); // Replace all underscores with spaces
      const formattedLabel = capitalizeFirstLetter(labelWithSpaces); // Capitalize the first letter of each word
      contractTypeList.push({
        label: formattedLabel,
        value: WorkSchedule[key],
      });
    }
  }
  return contractTypeList;
};
