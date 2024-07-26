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
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";


// Example image import, replace with the actual image paths
// import leadershipImage from 'index/cv-services/board_production_ckeditor_uploads_images_cvwriting.jpg';

const ProfessionalCvWriting: React.FC = () => {
  return (
    <div className="">
      {/* Leadership Development Section */}
      <div className="m-auto w-10/12">
        <div className="mb-8 py-12">
          <h2 className="mb-4 py-2 text-center text-5xl">
            Professional CV writing
          </h2>
          <p className="mb-16 text-center text-gray-600">
            At Jobs Connect, we understand the importance of a well-crafted CV,
            and we’re here to help you present your best self to potential
            employers.
          </p>
          <div className="flex flex-wrap gap-16 rounded-2xl bg-amber-50 p-4 md:p-12 lg:flex-nowrap">
            <div className="w-full max-w-2xl">
              <p className="mt-4 py-4 text-2xl text-gray-800">
                Jobs Connect Your Gateway to <br /> A Successful Career in the
                Gulf
              </p>

              <Image
                src="/index/cv-services/board_production_ckeditor_uploads_images_cvwriting.jpg"
                alt="Leadership Development"
                height={860}
                width={820}
                className="rounded-3xl shadow-md"
              />
            </div>
            <div className="w-full max-w-lg rounded-md bg-white p-4 shadow-md  md:p-9">
              <h3 className="mb-3 p-2 text-xl">
                Why Choose <br /> Jobs Connect's <br /> Professional CV Writing
                Service
              </h3>
              <ul className="mb-5 list-none space-y-2  text-gray-800">
                <li className="flex items-center gap-4">
                  {" "}
                  <span className="text-primary">
                    <Check />
                  </span>
                  Crafted by Experienced Career Experts.
                </li>
                <li className="flex items-center gap-4">
                  {" "}
                  <span className="text-primary">
                    <Check />
                  </span>
                  Highlighting Your Key Skills and Achievements.
                </li>
                <li className="flex items-center gap-4">
                  {" "}
                  <span className="text-primary">
                    <Check />
                  </span>
                  Building a Compelling Professional Narrative.
                </li>
                <li className="flex items-center gap-4">
                  {" "}
                  <span className="text-primary">
                    <Check />
                  </span>
                  Ensuring Your CV Stands Out to Employers.
                </li>
                <li className="flex items-center gap-4">
                  {" "}
                  <span className="text-primary">
                    <Check />
                  </span>
                  Tailoring Content for Your Target Job Market.
                </li>
              </ul>
              <Link
                href="#contact"
                
                className=" rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        {/* Statistics Section */}
        <h2 className="text-center text-3xl">
          How do I get my Professional CV
        </h2>
        <div className="mb-8 flex flex-wrap justify-around bg-white p-2 py-8 text-center">
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
              Your feedback is essential to us, and we make necessary revisions
              to ensure the final CV meets your expectations
            </p>
          </div>
          <div className="w-full p-4 md:w-1/4">
            <h3 className="flex justify-center text-blue-600">
              <Goal className="h-16 w-12" />
            </h3>
            <p className="text-xl font-semibold">Finalization</p>
            <p className="text-gray-600">
              Once you’re satisfied with the content and design, we finalize
              your CV and provide you with the editable file
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Plan Section */}
      <div className="m-auto flex w-full flex-wrap justify-center gap-12 rounded-lg bg-amber-50 py-12">
        <div className="max-w-xl px-6">
          <h2 className="mb-4 font-sans text-4xl">
            Reach Out For <br /> Support!
          </h2>
          <p className="mb-4 text-sm">
            Don’t let an unpolished CV hold you back from your dream job. With
            Jobs Connect’s Professional CV Writing Service, you can stand out
            from the crowd and make a lasting impression on recruiters.
          </p>
          <ul className="list-none space-y-2 text-base">
            <li className="flex items-center gap-4">
              {" "}
              <span className="text-cyan-600">
                <Check />
              </span>
              24/7 Support
            </li>
            <li className="flex items-center gap-4">
              {" "}
              <span className="text-cyan-600">
                <Check />
              </span>
              Professional Expertise
            </li>
            <li className="flex items-center gap-4">
              {" "}
              <span className="text-cyan-600">
                <Check />
              </span>
              Time And Resource Savings
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap justify-center gap-7 md:flex-nowrap">
          <Card className="mb-8 w-full max-w-80 rounded-lg bg-white shadow-md">
            <CardHeader className="">
              <h3 className="text-xl">Gold</h3>
              <span className="flex items-center">
                <p className="text-3xl font-semibold text-primary">$279.00</p>
                <p className="text-sm text-gray-600">/ per CV</p>
              </span>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
                <li>In-depth consultation</li>
                <li>Personalized CV tailored to your career goals</li>
                <li>Professional layout and design</li>
                <li>Cover letter included</li>
                <li>Unlimited revisions within 30 days</li>
                <li>Dedicated career expert</li>
                <li>Satisfaction guarantee</li>
              </ul>
            </CardContent>
            <CardFooter className="text-center">
              <button className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-700">
                Choose Plan
              </button>
            </CardFooter>
          </Card>

          <Card className="mb-8 w-full max-w-80 rounded-lg bg-white shadow-md">
            <CardHeader className="">
              <h3 className="text-xl">Platinum</h3>
              <span className="flex items-center">
                <p className="text-3xl font-semibold text-gray-700">$379.00</p>
                <p className="text-sm text-gray-600">/ per CV</p>
              </span>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-800">
                <li>Comprehensive consultation</li>
                <li>
                  Customized CV tailored to your industry and career goals
                </li>
                <li>Professional layout and design</li>
                <li>Cover letter and LinkedIn profile update included</li>
                <li>Unlimited revisions within 60 days</li>
                <li>Personalized career advice and guidance</li>
                <li>Dedicated career expert</li>
                <li>Satisfaction guarantee</li>
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

      {/* Free Consultation Section */}

      <div className="m-auto rounded-lg bg-white  py-16 md:w-10/12">
        <div className="flex flex-wrap justify-around">
          <div className="w-full p-4 md:w-1/2">
            <h2 className="mb-4 font-sans text-4xl">
              Free Consultation – Enhance Your Career with Professional CV
              Writing Services
            </h2>
            <p className="mb-8 text-gray-600">
              Unlock your career potential with our free consultation. Our
              expert team will evaluate your current CV, offer personalized
              writing services, and help you craft a standout CV that catches
              the eye of employers. Book your consultation now and take the
              first step towards landing your dream job.
            </p>
            <ul className="mb-8 list-disc space-y-2 pl-5 text-gray-600">
              <li>Confirmation of appointment details</li>
              <li>Review of current CV and background information</li>
              <li>
                Consultation to discuss career goals and CV Consultation to
                discuss technology solutionsrequirements
              </li>
              <li>
                Assessment of strengths and experiences for tailored CV writing
              </li>
              <li>Drafting and presentation of the new CV</li>
              <li>Revisions and finalization of the CV</li>
              <li>
                Follow-up to ensure satisfaction and provide additional support
              </li>
            </ul>
            <div className="text-gray-600">
              <p className="flex gap-4 py-2 text-sm">
                <Mail className="h-4" />
                info@infinitetalent.co.ke
              </p>
              <p className="flex gap-4 py-2 text-sm">
                <Phone className="h-4" />
                +254 723 343 813
              </p>
              <p className="flex gap-4 py-2 text-sm">
                <MapPin className="h-4" />
                Muthaiga Square, Thika Nairobi, Kenya
              </p>
            </div>
          </div>
          <div id="contact" className="w-full max-w-96 p-4">
            <h2 className="mb-4 text-xl ">Schedule A Free Consultation</h2>
            <form className="rounded-lg bg-gray-50 p-6 text-sm shadow-md">
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input type="text" className="w-full rounded-lg border p-2" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input type="text" className="w-full rounded-lg border p-2" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Company Email</label>
                <input type="email" className="w-full rounded-lg border p-2" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Current job Title</label>
                <input type="text" className="w-full rounded-lg border p-2" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Career level</label>
                <select className="w-full rounded-lg border p-2">
                  <option>Student/Internship</option>
                  <option>Entry level</option>
                  <option>Mid Career</option>
                  <option>Management</option>
                  <option>Director/Head</option>
                  <option>Senior Executive</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Message</label>
                <textarea className="w-full rounded-lg border p-2"></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCvWriting;
