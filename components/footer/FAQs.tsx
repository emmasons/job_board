import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchInput } from "../find-candidates/SearchInput";

const FAQs: React.FC = () => {
  return (
    <div className="bg-slate-50 pb-8">
      <div className="rounded-bl-3xl bg-primary/50 py-12 text-white">
        <h2 className="mx-auto max-w-4xl p-4  text-4xl font-semibold  ">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto max-w-4xl text-sm font-light">
          One stop guide to all your queries related to your job search on
          JobsConnect.
        </p>
      </div>
      <div className="m-auto my-4 flex w-full max-w-4xl items-center space-x-2 rounded-md bg-white p-4 shadow-md">
        <h3 className="text-xl font-semibold">Having doubts? </h3>
        <div className="w-2/3">
          <SearchInput />
          {/* <Input type="email" placeholder="Search..." /> */}
          {/* <Button type="submit">Search</Button> */}
        </div>
      </div>
      <div className="container mx-auto  max-w-4xl bg-white p-8 text-base shadow-lg">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <span className="flex-1 text-left">1. What is Jobs Connect?</span>
            </AccordionTrigger>
            <AccordionContent>
              Jobs Connect is a leading job placement company specializing in
              providing professional job placement services to job seekers and
              employers in Gulf countries, including UAE, Saudi Arabia, Kuwait,
              Oman, and Qatar. Our experienced job placement team is dedicated
              to delivering top-rated job placement solutions and expert job
              placement advice.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                2. How can Jobs Connect help me find a job in the Gulf
                countries?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              Jobs Connect utilizes innovative job placement techniques and best
              job placement practices to match job seekers with suitable
              employment opportunities in the Gulf region. Our certified job
              placement specialists and skilled job placement consultants work
              closely with you to understand your career goals and provide
              custom job placement services tailored to your needs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                3. What types of jobs are available through Jobs Connect?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              We offer a wide range of job placement opportunities across
              various industries, including healthcare, engineering, IT,
              finance, hospitality, and more. Our comprehensive job placement
              solutions ensure that we cater to diverse career preferences and
              skill sets.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                4. How do I register with Jobs Connect?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              To register with Jobs Connect, visit our website and fill out the
              registration form with your personal information, employment
              history, and job preferences. Our team of job placement
              professionals will review your application and contact you with
              suitable job opportunities.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                5. What makes Jobs Connect different from other job placement
                companies?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              Jobs Connect stands out due to our commitment to job placement
              service excellence and our focus on client-focused job placement
              services. We employ reliable job placement providers and utilize
              job placement innovation to deliver quality job placement
              solutions. Our affordable job placement services and trusted job
              placement partner status make us the premier job placement
              solutions provider in the Gulf region.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                6. How does Jobs Connect ensure the quality of job placements?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              We follow best job placement practices and leverage our job
              placement expertise to ensure high-quality placements. Our job
              placement project management and thorough job placement consulting
              process help us deliver top-rated job placement services that meet
              the needs of both job seekers and employers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                7. Is there a fee for using Jobs Connect services?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              Our fees vary depending on the specific services required. We
              offer affordable job placement services and provide a clear
              breakdown of any costs involved. Contact us for more detailed
              information about our pricing structure.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                8. Can Jobs Connect help with relocation to Gulf countries?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              Yes, Jobs Connect offers job placement support and assistance with
              relocation. Our team provides expert job placement advice and
              helps you navigate the process of moving to Gulf countries such as
              UAE, Saudi Arabia, Kuwait, Oman, and Qatar.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                9. How do I contact Jobs Connect for further assistance?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              You can contact Jobs Connect through the following:
              <ul className="list-disc pl-5">
                <li>Email: hello@infinitetalent.co.ke</li>
                <li>Phone: +971 50 398 4645</li>
                <li>Address: Dubai</li>
              </ul>
              Our customer service team is available to assist you with any
              questions or concerns regarding our job placement services.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                10. What should I do if I forgot my Jobs Connect account
                password?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              If you have forgotten your password, go to the login page on our
              website and click on the &quot;Forgot Password&quot; link. Follow
              the instructions to reset your password. If you encounter any
              issues, please contact our support team for assistance.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-11">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                11. How does Jobs Connect handle my personal information?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              Jobs Connect is committed to protecting your privacy. We collect,
              use, and safeguard your personal information in accordance with
              our Privacy Policy. Please review our Privacy Policy to understand
              how we manage your data.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-12">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                12. Can employers also register with Jobs Connect?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              Yes, employers looking to hire talented professionals can register
              with Jobs Connect. We provide comprehensive job placement
              solutions for employers, including job placement strategy,
              development, and support. Contact us to learn more about our
              employer services.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
