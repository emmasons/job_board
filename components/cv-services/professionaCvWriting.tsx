// components/Services.tsx
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  MessagesSquare,
  FileText,
  ClipboardCheck,
  Goal,
} from "lucide-react";

// Example image import, replace with the actual image paths
// import leadershipImage from 'index/cv-services/board_production_ckeditor_uploads_images_cvwriting.jpg';

const ProfessionalCvWriting: React.FC = () => {
  return (
    <div className="p-8">
      {/* Leadership Development Section */}
      <div className="mb-8 py-12">
        <h2 className="mb-4 py-2 text-center text-7xl">
          Professional CV writing
        </h2>
        <p className="mb-16 text-center text-gray-600">
          At Jobs Connect, we understand the importance of a well-crafted CV,
          and we’re here to help you present your best self to potential
          employers.
        </p>
        <div className="flex flex-wrap gap-16 rounded-2xl bg-amber-50 p-12">
          <div className="w-full md:w-1/2">
            <p className="mt-4 pb-6 text-3xl text-gray-800">
              100 Years Of History Serving The Poconos Region
            </p>

            <Image
              src="/index/cv-services/board_production_ckeditor_uploads_images_cvwriting.jpg"
              alt="Leadership Development"
              height={860}
              width={820}
              className="rounded-3xl shadow-md"
            />
          </div>
          <div className="w-full max-w-lg rounded-md bg-white p-9 shadow-md md:w-1/2">
            <h3 className="mb-6 p-2 text-4xl">
              Unlock Your <br /> Career Potential <br /> Today!
            </h3>
            <ul className="list-none space-y-2 pl-5 text-lg text-gray-600">
              <li className="flex items-center gap-4">
                {" "}
                <Check />
                Crafted by Experienced Career Experts.
              </li>
              <li className="flex items-center gap-4">
                {" "}
                <Check />
                Highlighting Your Key Skills and Achievements.
              </li>
              <li className="flex items-center gap-4">
                {" "}
                <Check />
                Building a Compelling Professional Narrative.
              </li>
              <li className="flex items-center gap-4">
                {" "}
                <Check />
                Ensuring Your CV Stands Out to Employers.
              </li>
              <li className="flex items-center gap-4">
                {" "}
                <Check />
                Tailoring Content for Your Target Job Market.
              </li>
            </ul>
            <button className="mt-6 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-700">
              Our Services
            </button>
          </div>
        </div>
      </div>
      {/* Statistics Section */}
      <h2 className="text-center text-3xl">How do I get my Professional CV</h2>
      <div className="mb-8 flex flex-wrap justify-around bg-white p-8 text-center">
        <div className="w-full p-4 md:w-1/4">
          <span className="flex justify-center text-blue-600">
            <MessagesSquare className="h-16 w-12" />
          </span>
          <p className="text-xl font-semibold">Initial Consultation</p>
          <p className="text-gray-600">
            We start with a detailed consultation to understand your career
            goals, work history, and strengths.
          </p>
        </div>
        <div className="w-full p-4 md:w-1/4">
          <h3 className="flex justify-center text-4xl font-bold text-blue-600">
            <FileText className="h-16 w-12" />
          </h3>
          <p className="text-xl font-semibold">CV Drafting</p>
          <p className="text-gray-600">
            Based on the consultation, our expert writers draft your CV,
            focusing on clarity, impact, and relevance.
          </p>
        </div>
        <div className="w-full p-4 md:w-1/4">
          <h3 className="flex justify-center text-blue-600">
            <ClipboardCheck className="h-16 w-12" />
          </h3>
          <p className="text-xl font-semibold">Review and Feedback</p>
          <p className="text-gray-600">
            Your feedback is essential to us, and we make necessary revisions to
            ensure the final CV meets your expectations
          </p>
        </div>
        <div className="w-full p-4 md:w-1/4">
          <h3 className="flex justify-center text-blue-600">
            <Goal className="h-16 w-12" />
          </h3>
          <p className="text-xl font-semibold">Finalization</p>
          <p className="text-gray-600">
            Once you’re satisfied with the content and design, we finalize your
            CV and provide you with the editable file
          </p>
        </div>
      </div>

      {/* Pricing Plan Section */}
      <div className="rounded-lg ">
        <h2 className="mb-4 text-3xl font-bold">Pricing Plan</h2>
        <p className="mb-8 text-gray-600">
          Tracing the Path of Our Legacy and Growth
        </p>
        <div className="flex flex-wrap justify-around gap-3">
          <Card className="mb-8 w-full rounded-lg bg-white shadow-md md:max-w-96">
            <CardHeader className="text-center">
              <h3 className="text-2xl font-bold">Silver</h3>
              <p className="text-2xl font-bold text-gray-700">$599.00</p>
              <p className="text-gray-600">/ per month</p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-gray-600">
                <li>20 keywords</li>
                <li>2,000 monthly website visitors</li>
                <li>4 blogs / month</li>
                <li>3 quality backlinks / month</li>
                <li>Dedicated expert team</li>
                <li>Monitoring & reporting</li>
              </ul>
            </CardContent>
            <CardFooter className="text-center">
              <button className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-700">
                Choose Plan
              </button>
            </CardFooter>
          </Card>

          <Card className="mb-8 w-full rounded-lg bg-white shadow-md md:max-w-96">
            <CardHeader className="text-center">
              <h3 className="text-2xl font-bold">Gold</h3>
              <p className="text-2xl font-bold text-gray-700">$1149.00</p>
              <p className="text-gray-600">/ per month</p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-gray-600">
                <li>60 keywords</li>
                <li>6,000 monthly website visitors</li>
                <li>8 blogs / month</li>
                <li>10 quality backlinks / month</li>
                <li>Dedicated expert team</li>
                <li>Monitoring & reporting</li>
              </ul>
            </CardContent>
            <CardFooter className="text-center">
              <button className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-700">
                Choose Plan
              </button>
            </CardFooter>
          </Card>

          <Card className="mb-8 w-full rounded-lg bg-white shadow-md md:max-w-96">
            <CardHeader className="text-center">
              <h3 className="text-2xl font-bold">Platinum</h3>
              <p className="text-2xl font-bold text-gray-700">$4379.00</p>
              <p className="text-gray-600">/ per month</p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-gray-600">
                <li>150 keywords</li>
                <li>20,000 monthly website visitors</li>
                <li>15 blogs / month</li>
                <li>20 quality backlinks / month</li>
                <li>Dedicated expert team</li>
                <li>Monitoring & reporting</li>
              </ul>
            </CardContent>
            <CardFooter className="text-center">
              <button className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-700">
                Choose Plan
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCvWriting;
