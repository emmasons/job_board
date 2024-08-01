import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";

import { Role } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SavedJobs from "@/components/dashboard/job-seeker/cv/SavedJobs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const page = async () => {
  const invoices = [
    {
      title: "Territory Sales Officer",
      status: "open",
      date: "13/7/2024",
      process: "Appplied",
    },
    {
      title: "Tailor",
      status: "Open",
      date: "1/2/2024",
      process: "shortlisted",
    },
    {
      title: "UAE National - Internal Audit Assistant Manager",
      status: "closed",
      date: "7/5/2024",
      process: " Hired ",
    },
    {
      title: "Mechanical Helper",
      status: "open",
      date: "9/5/2024",
      process: "Interview",
    },
    {
      title: "Accountant",
      status: "closed",
      date: "12/12/2023",
      process: "Hired",
    },
  ];
 
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.JOB_SEEKER)) {
    return redirect("/auth/signin?callbackUrl=/profile/dashboard/job-seeker");
  }


  return (
    <MaxWidthWrapper>
      <div className="py-16">
        <h2 className="text-2xl ">Applied jobs</h2>
      </div>

      <Table>
        <TableCaption>A list of your recently applied jobs</TableCaption>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Process</TableHead>
            <TableHead className="text-right">Date Applied</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.title}>
              <TableCell className="font-medium">{invoice.title}</TableCell>
              <TableCell className="text-right">{invoice.status}</TableCell>
              <TableCell className="text-right">{invoice.process}</TableCell>
              <TableCell className="text-right">{invoice.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </MaxWidthWrapper>
  );
};

export default page;
