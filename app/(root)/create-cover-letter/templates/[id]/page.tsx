import { TemplateContent } from "@/components/cover-letter/cover-letter-templates";
import CoverLetterTemplate from "@/components/cover-letter/cover-letter-wrapper";
import { getCurrentSessionUser } from "@/lib/auth";
import { getJobSeekerProfile } from "@/actions/get-job-seeker-profile";
import { getJobById } from "@/actions/get-job-by-id";
import { getUserById } from "@/actions/get-user";
import { redirect } from "next/navigation";
import ApplicationWrapper from "@/components/application/ApplicationWrapper";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    jobId: string;
  };
};

const sampleData: TemplateContent = {
  name: "John Smith",
  jobTitle: "Senior Developer",
  address: "123 Tech Street, Silicon Valley, CA 94025",
  email: "john.smith@email.com",
  phoneNumber: "(555) 123-4567",
  companyName: "Tech Solutions Inc.",
  hiringManager: "Mrs. Jane Wilson",
  coverLetter: `
    <p>I am writing to express my strong interest in the Senior Developer position at Tech Solutions Inc. With over 8 years of experience in software development and a proven track record of delivering high-quality solutions, I believe I would be a valuable addition to your team.</p>
    
    <p>Throughout my career, I have demonstrated expertise in full-stack development, team leadership, and project management. I have successfully led teams of 5-10 developers, delivered projects on time and within budget, and implemented best practices that improved code quality and team productivity.</p>
    
    <p>I am particularly impressed with Tech Solutions' commitment to innovation and your recent work in AI integration. I would welcome the opportunity to contribute to your future projects and help drive technological advancement.</p>
  `,
  date: new Date().toLocaleDateString(),
};

const Page = async ({ params, searchParams }: Props) => {
  const { id } = params;
  const { jobId } = searchParams;

  const user = await getCurrentSessionUser();

  if (!user) {
    return redirect(
      `/auth/signin?callbackUrl=/create-cover-letter/templates/${id}?jobId=${jobId}`
    );
  }

  const jobSeekerProfile = await getJobSeekerProfile(user.id);
  const job = await getJobById(jobId);

  const savedUser = await getUserById(user.id);

  const address = `${savedUser?.address?.postalCode} - ${savedUser?.address?.addressLineOne}`;
  const userName = user.firstName + " " + user.lastName;
  const modifiedSampleData: TemplateContent = {
    ...sampleData,
    name: userName || sampleData.name,
    jobTitle: jobSeekerProfile?.cvHeadLine || sampleData.jobTitle,
    companyName: job?.companyName || sampleData.companyName,
    email: savedUser?.email || sampleData.email,
    phoneNumber: savedUser?.profile?.phoneNumber || sampleData.phoneNumber,
    address: address || sampleData.address,
    hiringManager: job?.companyName || sampleData.hiringManager,
  };

  return (
    <div className="space-y-4 p-6">
      <CoverLetterTemplate id={id} sampleData={modifiedSampleData} />
      <ApplicationWrapper
        jobId={jobId}
        jobSeekerProfile={jobSeekerProfile}
        job={job}
        user={user}
      />
    </div>
  );
};

export default Page;
