// components/Services.tsx
import React from 'react';
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Check } from 'lucide-react';

// Example image import, replace with the actual image paths
// import leadershipImage from 'index/cv-services/board_production_ckeditor_uploads_images_cvwriting.jpg';

const ProfessionalCvWriting: React.FC = () => {
  return (
    <div className="p-8">

      {/* Leadership Development Section */}
      <div className="py-12 mb-8">
        <h2 className="text-6xl text-center py-2 mb-4">Professional CV writing</h2>
        <p className="text-center text-gray-600 mb-16">
            At Jobs Connect, we understand the importance of a well-crafted CV, and we’re here to help you present your best self to potential employers.

 
        </p>
        <div className="flex flex-wrap p-12 gap-16 rounded-2xl bg-amber-50">
          <div className="w-full md:w-1/2">
          <p className="text-3xl pb-6 text-gray-800 mt-4">100 Years Of History Serving The Poconos Region</p>

            <Image src="/index/cv-services/board_production_ckeditor_uploads_images_cvwriting.jpg" alt="Leadership Development" height={860} width={820} className="rounded-3xl shadow-md" />
          </div>
          <div className="w-full md:w-1/2 rounded-md shadow-md p-9 max-w-lg bg-white">
            <h3 className="text-4xl p-2 mb-6">Unlock Your <br /> Career Potential <br /> Today!</h3>
            <ul className="list-none pl-5 text-lg text-gray-600 space-y-2">
              <li className='flex items-center gap-4'> <Check />Crafted by Experienced Career Experts.</li>
              <li className='flex items-center gap-4'> <Check />Highlighting Your Key Skills and Achievements.</li>
              <li className='flex items-center gap-4'> <Check />Building a Compelling Professional Narrative.</li>
              <li className='flex items-center gap-4'> <Check />Ensuring Your CV Stands Out to Employers.</li>
              <li className='flex items-center gap-4'> <Check />Tailoring Content for Your Target Job Market.</li>
            </ul>
            <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700">
              Our Services
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Plan Section */}
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Pricing Plan</h2>
        <p className="text-gray-600 mb-8">Tracing the Path of Our Legacy and Growth</p>
        <div className="flex flex-wrap justify-around">
          <Card className="w-full md:w-1/3 bg-white shadow-md rounded-lg mb-8">
            <CardHeader className="text-center">
              <h3 className="text-2xl font-bold">Silver</h3>
              <p className="text-2xl font-bold text-gray-700">$599.00</p>
              <p className="text-gray-600">/ per month</p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>20 keywords</li>
                <li>2,000 monthly website visitors</li>
                <li>4 blogs / month</li>
                <li>3 quality backlinks / month</li>
                <li>Dedicated expert team</li>
                <li>Monitoring & reporting</li>
              </ul>
            </CardContent>
            <CardFooter className="text-center">
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700">
                Choose Plan
              </button>
            </CardFooter>
          </Card>

          <Card className="w-full md:w-1/3 bg-white shadow-md rounded-lg mb-8">
            <CardHeader className="text-center">
              <h3 className="text-2xl font-bold">Gold</h3>
              <p className="text-2xl font-bold text-gray-700">$1149.00</p>
              <p className="text-gray-600">/ per month</p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>60 keywords</li>
                <li>6,000 monthly website visitors</li>
                <li>8 blogs / month</li>
                <li>10 quality backlinks / month</li>
                <li>Dedicated expert team</li>
                <li>Monitoring & reporting</li>
              </ul>
            </CardContent>
            <CardFooter className="text-center">
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700">
                Choose Plan
              </button>
            </CardFooter>
          </Card>

          <Card className="w-full md:w-1/3 bg-white shadow-md rounded-lg mb-8">
            <CardHeader className="text-center">
              <h3 className="text-2xl font-bold">Platinum</h3>
              <p className="text-2xl font-bold text-gray-700">$4379.00</p>
              <p className="text-gray-600">/ per month</p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>150 keywords</li>
                <li>20,000 monthly website visitors</li>
                <li>15 blogs / month</li>
                <li>20 quality backlinks / month</li>
                <li>Dedicated expert team</li>
                <li>Monitoring & reporting</li>
              </ul>
            </CardContent>
            <CardFooter className="text-center">
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700">
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
