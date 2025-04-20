"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PlusIcon } from "lucide-react";

import CreateServiceForm from "./CreateServiceForm";

const CreateServiceDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="flex h-full flex-row items-center justify-center rounded-lg border-2 border-dashed border-green-600 p-4 transition hover:-translate-y-1 hover:shadow-xl sm:flex-col">
        <PlusIcon className="h-6 w-6 text-green-600" strokeWidth={3} />
        <h2 className="font-semibold text-green-600 sm:mt-2">New Service</h2>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Service</DialogTitle>
          <DialogDescription>
            You can create a new service by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <CreateServiceForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateServiceDialog;
