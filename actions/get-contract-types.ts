import { capitalizeFirstLetter } from "@/lib/utils";
import { ContractType } from "@prisma/client";

export const getContractTypes = async () => {
  const contractTypeList = [];
  for (const key in ContractType) {
    if (isNaN(Number(key))) {
      const labelWithSpaces = key.replace(/_/g, " "); // Replace all underscores with spaces
      const formattedLabel = capitalizeFirstLetter(labelWithSpaces); // Capitalize the first letter of each word
      contractTypeList.push({
        label: formattedLabel,
        value: ContractType[key],
      });
    }
  }
  return contractTypeList;
};
