import { JobsWithCompany } from "@/types/db";
import React from "react";

type Props = {
  items: JobsWithCompany[];
};

const JobList = ({ items }: Props) => {
  return (
    <div className="flex flex-col justify-between md:flex-row w-full">
      <h1>Filter</h1>
      {items.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

export default JobList;
