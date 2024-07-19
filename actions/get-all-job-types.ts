import { JOBTYPE } from "@prisma/client";

export const getAllJobTypes = () => {
  const jobTypes = Object.values(JOBTYPE).map((type) => ({
    id: type,
    label: type
      .replace(/_/g, " ")
      .toLocaleLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()),
  }));
  return jobTypes;
};
