import {
  Candidate,
  EducationLevel,
  Experience,
  JobSeekerProfile,
  Profile,
  Sector,
  User,
} from "@prisma/client";
import {
  Briefcase,
  CheckCircle,
  File,
  FileText,
  Flag,
  GraduationCap,
  Mail,
  Phone,
  Printer,
  UserSquareIcon,
} from "lucide-react";
import AddCandidateForm from "@/components/find-candidates/AddCandidateForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import PDFViewer from "../PDFViewer";

type candidate =
  | (User & {
      profile: Profile;
      jobSeekerProfile: JobSeekerProfile & {
        sector: Sector;
        education: EducationLevel;
        experience: Experience;
      };
    })
  | null;

type Props = {
  candidates: candidate[] | null;
  candidateIds: Candidate[] | null;
};

const CandidateList = ({ candidates, candidateIds }: Props) => {
  return (
    <div className="flex flex-col gap-4 bg-slate-100">
      {candidates?.map((candidate) => (
        <div
          key={candidate?.id}
          className="flex justify-between gap-4 rounded-md p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
        >
          <div>
            <p className="flex items-center gap-2 text-[0.9rem] font-semibold">
              <UserSquareIcon className="h-4 w-4 text-primary" />
              {`${candidate?.profile?.firstName} ${candidate?.profile?.lastName}` ||
                candidate?.email}
            </p>
            <p className="flex items-center gap-2 text-[0.8rem] text-zinc-700">
              <Flag className="h-4 w-4 text-primary" />
              {candidate?.jobSeekerProfile?.country || "N/A"}
            </p>
            <p className="flex items-center gap-2 text-[0.8rem] text-zinc-700">
              <GraduationCap className="h-4 w-4 text-primary" />
              {candidate?.jobSeekerProfile?.education?.label || "N/A"}
            </p>
            <p className="flex items-center gap-2 text-[0.8rem] text-zinc-700">
              <Briefcase className="h-4 w-4 text-primary" />
              {candidate?.jobSeekerProfile?.occupation || "N/A"}
            </p>
          </div>
          <div>
            {candidateIds?.some(
              ({ candidateId }) => candidateId === candidate?.id,
            ) ? (
              <p className="flex items-center gap-2 text-[0.8rem] text-zinc-700">
                <CheckCircle className="h-4 w-4 text-primary" />
                Added to your list
              </p>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger>
                    <FileText className="h-8 w-8 text-primary" />
                  </DialogTrigger>
                  <DialogContent className="max-w-[75%]">
                    <DialogHeader>
                      <DialogTitle>
                        <div className="flex justify-between bg-sky-100 p-4">
                          <div>
                            <Dialog>
                              <DialogTrigger>
                                <div className="flex flex-col gap-2">
                                  <p>Contact</p>
                                  <Button className="inline-flex items-center justify-center">
                                    <UserSquareIcon className="h-4 w-4 text-white" />
                                  </Button>
                                </div>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    {`${candidate?.profile?.firstName} ${candidate?.profile?.lastName}` ||
                                      "Candidate Name"}
                                  </DialogTitle>
                                  <DialogDescription>
                                    <a
                                      href="mailto:{candidate?.email}"
                                      className="flex items-center gap-2"
                                    >
                                      Email
                                      {candidate?.email && (
                                        <Mail className="h-4 w-4 text-secondary" />
                                      )}
                                    </a>
                                    <a
                                      href="tel:{candidate?.profile?.phoneNumber}"
                                      className="flex items-center gap-2"
                                    >
                                      Phone
                                      {candidate?.profile?.phoneNumber && (
                                        <Phone className="h-4 w-4 text-secondary" />
                                      )}
                                    </a>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p>Reachability</p>
                            <div className="flex flex-1 items-center justify-center gap-2">
                              {candidate?.email && (
                                <Mail className="h-6 w-6 text-secondary" />
                              )}
                              {candidate?.profile.phoneNumber && (
                                <Phone className="h-6 w-6 text-secondary" />
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p>Save CV</p>
                            <AddCandidateForm candidateId={candidate?.id} />
                          </div>
                          <div className="flex flex-col gap-2">
                            <p>Print</p>
                            <div className="flex flex-1 items-center justify-center gap-2">
                              <Printer className="h-8 w-8 text-secondary" />
                            </div>
                          </div>
                        </div>
                      </DialogTitle>
                      <DialogDescription>
                        <PDFViewer pdfUrl={candidate.cvFile.downloadUrl} />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      ))}
      {candidates && candidates.length === 0 && (
        <div className="rounded-md bg-slate-100 p-8 text-center">
          No candidates found
        </div>
      )}
    </div>
  );
};

export default CandidateList;
