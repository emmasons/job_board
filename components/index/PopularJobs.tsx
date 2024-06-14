import React from "react";
import JobCard from "../job/JobCard";

// Manually provided job data
const jobData = [
  {
    id: "1",
    title: "Barista",
    createdAt: new Date("2024-06-01"),
    sector: "Catering",
    city: "Riyadh",
    country: "Saudi Arabia",
    occupation: "Full-time",
    workSchedule: "Hybrid",
  },
  {
    id: "2",
    title: "Driver",
    createdAt: new Date("2024-06-01"),
    sector: "Transport",
    city: "Dammam",
    country: "Saudi Arabia",
    occupation: "Full-time",
    workSchedule: "Flexible Schedules",
  },
  {
    id: "3",
    title: "Watch Man",
    createdAt: new Date("2024-06-01"),
    sector: "Security",
    city: "Dubai",
    country: "United Arab Emirate",
    occupation: "Full-time",
    workSchedule: "Safety",
  },
  {
    id: "4",
    title: "Machine Operator",
    createdAt: new Date("2024-06-01"),
    sector: "Heavy Equipment Operation",
    city: "Dubai",
    country: "UAE",
    occupation: "Full-time",
    workSchedule: "Operation",
  },
];

const PopularJobs: React.FC = () => {
    return (
      <div className=" w-full border-none">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-3xl font-semibold mt-12 mb-4 text-center text-gray-900">Featured Jobs</h2>
          <p className="text-center mb-8">Find your Ideal job in the Gulf states</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {jobData.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                createdAt={job.createdAt}
                sector={job.sector}
                city={job.city}
                country={job.country}
                occupation={job.occupation}
                workSchedule={job.workSchedule}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default PopularJobs;