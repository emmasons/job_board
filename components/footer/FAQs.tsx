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
        <h3 className="text-xl font-semibold">Have any doubts? </h3>
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
              <span className="flex-1 text-left">
                How will creating a profile on JobsConnect help me? Do I need to
                create a profile if I am only interested in applying to some
                jobs?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              Creating a profile on JobsConnect allows you to apply for jobs
              more efficiently. It also makes it easier for employers to find
              and contact you for relevant opportunities. Even if you are only
              interested in applying to some jobs, having a profile will
              streamline your job application process.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                Do I need to pay any amount for registering with JobsConnect or
                applying to jobs?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              Registering with JobsConnect and creating a profile is absolutely
              free. There is no charge for creating your profile or for applying
              to jobs. Once you register with JobsConnect, you are automatically
              added to the JobsConnect CV database and can apply to unlimited
              jobs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                What should I fill as my Current Location if I shuttle between
                my home country and my current location? Or I might not be
                residing at my current location after a few weeks or months.
              </span>
            </AccordionTrigger>
            <AccordionContent>
              You should fill in the location where you are currently residing
              or the location where you will be residing for the majority of
              your job search period. You can update your profile as your
              location changes.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                What should I mention as my Nationality?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              You should mention the nationality as per your passport or legal
              documentation. This helps in compliance with job eligibility and
              visa requirements for various positions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              <span className="flex-1 text-left">
                I am not currently employed. What should I enter as my Current
                Designation and Current Employer?
              </span>
            </AccordionTrigger>
            <AccordionContent>
              If you are not currently employed, you can leave the Current
              Designation and Current Employer fields blank or mention
              'Unemployed' or 'Job Seeker'. This provides clarity to potential
              employers about your current employment status.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
