import { EmploymentDetails } from "@prisma/client";
import React, { useState } from "react";
import EmploymentDetailsForm from "./steps/EmploymentDetailsForm";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle } from "lucide-react";

type Props = {
  employmentHistory: EmploymentDetails[];
};

const EmploymentHistory = ({ employmentHistory }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  return (
    <div className="p-7">
      <div className="flex items-center justify-between font-medium">
        Add History
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <div>
          {employmentHistory.map((history) => (
            <div>
              <EmploymentDetailsForm
                key={6}
                title="Employment Details"
                profileId={history.jobSeekerProfileId}
                profilePercentage={20}
                initialData={history}
                isJobSeekerComponent={true}
              />
              ,
            </div>
          ))}
        </div>
      ) : (
        <p>Form to add New history comes here</p>
      )}
    </div>
  );
};

export default EmploymentHistory;
