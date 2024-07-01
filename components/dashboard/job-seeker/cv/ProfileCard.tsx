// A component ot serve as a container for the profile info

import ProfileHeader from "./ProfileHeader";
import ProfileProgress from "./ProfileProgress";
import ProfileSections from "./ProfileSections";
import { User, CV, Sector, EducationLevel, Experience, JobSeekerProfile } from  "@/types";

interface ProfileCardProps{
    user: User;
    cv: CV;
    cvFile: any;
    sectors: Sector[];
    educationLevels: EducationLevel[];
    experience: Experience[];
    jobSeekerProfile: JobSeekerProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, cv, cvFile, sectors, educationLevels, experience, jobSeekerProfile }) => {
    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
            <ProfileHeader user={user}/>
            <ProfileProgress/>
            <ProfileSections
                cv={cv}
                cvFile={cvFile}
                sectors={sectors}
                educationLevels={educationLevels}
                experience={experience}
                jobSeekerProfile={jobSeekerProfile}
            />
        </div>
    );
};

export default ProfileCard;