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
  CircleSlash2,
  Download,
  EllipsisVertical,
  FileText,
  Mail,
  Phone,
  PlusCircle,
  Printer,
  UserSquareIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PDFViewer from "@/components/PDFViewer";
import AddCandidateForm from "@/components/find-candidates/AddCandidateForm";
import { candidate } from "@/actions/get-all-candidates";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

type Props = {
  candidate: candidate;
  candidateIds: Candidate[] | null;
  loggedInEmployer: boolean;
};

const ActionsComponent = ({
  candidateIds,
  candidate,
  loggedInEmployer,
}: Props) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <EllipsisVertical />
        </PopoverTrigger>
        <PopoverContent>
          <ul className="space-y-2">
            <li>
              {loggedInEmployer ? (
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
                              <div className="rounded-sm bg-primary px-4 py-2">
                                <AddCandidateForm
                                  candidateId={candidate?.id}
                                  iconColor="text-white"
                                />
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
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <p className="text-sm">View CV</p>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        <div className="text-center">
                          <CircleSlash2 className="h-8 w-8 text-red-500" />
                        </div>
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <div>
                          <p>You are currently not logged in</p>
                          <p>
                            Please{" "}
                            <Link
                              href="/auth/signin?callbackUrl=/find-candidates"
                              className="text-primary"
                            >
                              login
                            </Link>{" "}
                            or{" "}
                            <Link
                              href="/auth/signup/employer"
                              className="text-primary"
                            >
                              register
                            </Link>{" "}
                            as an employer to view CV
                          </p>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </li>
            <li>
              {loggedInEmployer ? (
                <a
                  href={candidate?.cvFile?.downloadUrl}
                  download
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4 text-primary" />
                  <p className="text-sm">Download CV</p>
                </a>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-primary" />
                      <p className="text-sm">Download CV</p>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        <div className="text-center">
                          <CircleSlash2 className="h-8 w-8 text-red-500" />
                        </div>
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <div>
                          <p>You are currently not logged in</p>
                          <p>
                            Please{" "}
                            <Link
                              href="/auth/signin?callbackUrl=/find-candidates"
                              className="text-primary"
                            >
                              login
                            </Link>{" "}
                            or{" "}
                            <Link
                              href="/auth/signup/employer"
                              className="text-primary"
                            >
                              register
                            </Link>{" "}
                            as an employer to view CV
                          </p>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </li>
            <li>
              {loggedInEmployer ? (
                <a
                  href="mailto:${candidate?.email}"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <p className="text-sm"> Contact candidate</p>
                </a>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="flex items-center gap-2">
                      <PlusCircle className="h-4 w-4 text-primary" />
                      <p className="text-sm">Add CV to folder</p>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        <div className="text-center">
                          <CircleSlash2 className="h-8 w-8 text-red-500" />
                        </div>
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <div>
                          <p>You are currently not logged in</p>
                          <p>
                            Please{" "}
                            <Link
                              href="/auth/signin?callbackUrl=/find-candidates"
                              className="text-primary"
                            >
                              login
                            </Link>{" "}
                            or{" "}
                            <Link
                              href="/auth/signup/employer"
                              className="text-primary"
                            >
                              register
                            </Link>{" "}
                            as an employer to view CV
                          </p>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </li>
            <li>
              {loggedInEmployer ? (
                <>
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
                </>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="flex items-center gap-2">
                      <PlusCircle className="h-4 w-4 text-primary" />
                      <p className="text-sm">Add CV to folder</p>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        <div className="text-center">
                          <CircleSlash2 className="h-8 w-8 text-red-500" />
                        </div>
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <div>
                          <p>You are currently not logged in</p>
                          <p>
                            Please{" "}
                            <Link
                              href="/auth/signin?callbackUrl=/find-candidates"
                              className="text-primary"
                            >
                              login
                            </Link>{" "}
                            or{" "}
                            <Link
                              href="/auth/signup/employer"
                              className="text-primary"
                            >
                              register
                            </Link>{" "}
                            as an employer to view CV
                          </p>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ActionsComponent;
