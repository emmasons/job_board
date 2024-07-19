"use client"
import React from 'react';
import { Pencil} from 'lucide-react';
import UploadCV from "@/components/dashboard/job-seeker/cv/UploadCV"; 

// defining interfaces
interface CV {}
interface Sector {}
interface EducationLevel {}
interface Experience {}
interface JobSeekerProfile {}

interface ProfileSectionsProps {
  cv: CV;
  cvFile: any;
  sectors: Sector[];
  educationLevels: EducationLevel[];
  experience: Experience[];
  jobSeekerProfile: JobSeekerProfile;
}

interface SectionProps {
  title: string;
  placeholder: string;
}

interface PendingActionProps {
  title: string;
  percentage: string;
}

const Section: React.FC<SectionProps> = ({ title, placeholder }) => (
  <div className="bg-white p-6 rounded-md shadow-md border">
    <div className='flex justify-between'>
    <h3 className="text-lg font-semibold">{title}</h3>
    <button className=" text-blue-500 flex items-center space-x-2">
      <Pencil className="h-4 w-4" />
      <span>Add</span>
    </button>
    </div>

    <p className="text-gray-500">{placeholder}</p>

  </div>
);



const PendingAction: React.FC<PendingActionProps> = ({ title, percentage }) => (
  <div className="flex justify-between items-center">
    <div>
      <p className="text-gray-500">{title}</p>
    </div>
    <div className="text-green-500">Adds {percentage}</div>
    <button className="text-blue-500">Add Details</button>
  </div>
);

const ProfileSections: React.FC<ProfileSectionsProps> = ({ cv, cvFile, sectors, educationLevels, experience, jobSeekerProfile }) => {
  return (
    <div className="space-y-6 mt-6 bg-white rounded-md">   

      {/* Profile Completeness Indicator */}
      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Profile Completeness</h3>
            <p className="text-gray-500">Updated today</p>
          </div>
          <div className="text-lg font-bold text-gray-500">18% Profile Complete</div>
        </div>
        <div className="mt-4 space-y-2">
          <PendingAction 
            title="Upload Photo" 
            percentage="4%" 
            />
          <PendingAction 
            title="Profile Summary" 
            percentage="1%"
            />
          <PendingAction 
            title="Education" 
            percentage="7%" 
            />
        </div>
      </div>

      {/* Profile Sections */}
      <Section 
        title="CV Headline" 
        placeholder="Give an introductory title to your profile to be viewed by Employers" 
        />
      <Section title="Key Skills" placeholder="Add your skills" />
      <Section title="Professional Details" placeholder="Add professional details and increase your chances of getting shortlisted by employers" />
      <Section title="Employment Details" placeholder="Add Employment details if you are already working / have worked before in an organization" />
      <Section title="IT Skills/Certifications" placeholder="Add IT Skills/Certifications" />
      <Section title="Education Details" placeholder="Your education details help us suggest you more suitable job opportunities" />
      <Section title="Profile Summary" placeholder="Outline the key highlights of your career to employers" />
      <Section title="Personal Details" placeholder="Add personal details and increase your visibility amongst employers" />
      <UploadCV cv={cv} cvFile={cvFile} />
    </div>
  );
};



export default ProfileSections;
