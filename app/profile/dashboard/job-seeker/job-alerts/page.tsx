import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { Role } from "@prisma/client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const page = async () => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.JOB_SEEKER)) {
    return redirect("/auth/signin?callbackUrl=/profile/dashboard/job-seeker");
  }
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

  return (
    <MaxWidthWrapper>
      <div className="flex items-center space-x-2 py-16">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Job Alerts</Label>
      </div>
      <Table>
        <TableCaption>A list of your recently applied jobs</TableCaption>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="w-[300px]">Keyword</TableHead>
            <TableHead className="text-right">Location</TableHead>
            <TableHead className="text-right">Functional Area</TableHead>
            <TableHead className="text-right">Create on</TableHead>
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
      </Table>
    </MaxWidthWrapper>
  );
};

export default page;
