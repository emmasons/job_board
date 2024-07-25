import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Candidate,
  EducationLevel,
  Experience,
  JobSeekerProfile,
  Profile,
  Sector,
  Skill,
  User,
} from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  Download,
  FileText,
  Mail,
  Phone,
  Printer,
  UserSquareIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PDFViewer from "@/components/PDFViewer";
import AddCandidateForm from "@/components/find-candidates/AddCandidateForm";
import { candidate } from "@/actions/get-all-candidates";

type Props = {
  candidate: candidate;
  candidateIds: Candidate[] | null;
};

const ActionsComponent = ({ candidateIds, candidate }: Props) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-ellipsis-vertical"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </PopoverTrigger>
        <PopoverContent>
          <ul className="">
            <li>
              <Dialog>
                <DialogTrigger>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <p className="text-sm">View CV</p>
                  </div>
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
                        {candidate?.id && (
                          <div className="flex flex-col items-center gap-2">
                            <p>Save CV to my Folder</p>
                            <div className="bg-primary px-4 py-2 rounded-sm">
                              <AddCandidateForm candidateId={candidate?.id} iconColor="text-white" />
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <p>Print</p>
                          <div className="flex flex-1 items-center justify-center gap-2">
                            <Printer className="h-8 w-8 text-secondary" />
                          </div>
                        </div>
                      </div>
                    </DialogTitle>
                    <DialogDescription>
                      {candidate?.cvFile?.downloadUrl && (
                        <PDFViewer pdfUrl={candidate?.cvFile?.downloadUrl} />
                      )}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </li>
            <li>
              <a
                href={candidate?.cvFile?.downloadUrl}
                download
                target="_blank"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4 text-primary" />
                <p className="text-sm">Download CV</p>
              </a>
            </li>
            <li>
              {candidateIds?.some(
                ({ candidateId }) => candidateId === candidate?.id,
              ) ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <p className="text-sm">Added to your folder</p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <AddCandidateForm
                    candidateId={candidate?.id}
                    iconColor="text-primary"
                  />
                  <p className="text-sm">Add cv to folder</p>
                </div>
              )}
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ActionsComponent;
