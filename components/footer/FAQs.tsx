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
    <div className="bg-slate-50 pb-12">
      <div className="rounded-bl-3xl bg-primary/50  py-14 text-white text-center">
        <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
        <p className="mt-2 text-sm font-light">
          Everything you need to know about finding visa-sponsored jobs on Talentra.io.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-6 mb-4 p-4 flex items-center space-x-3 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-700">Got a question?</h3>
        <div className="w-2/3">
          <SearchInput />
        </div>
      </div>

      <div className="container mx-auto max-w-4xl bg-white p-8 rounded-xl shadow-lg text-gray-700">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              1. What is Talentra.io?
            </AccordionTrigger>
            <AccordionContent>
              Talentra.io is a global job board specializing in connecting
              professionals to verified, visa-sponsored job opportunities
              worldwide. We bridge the gap between global talent and employers
              offering work visa support.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              2. What types of jobs can I find on Talentra.io?
            </AccordionTrigger>
            <AccordionContent>
              We feature a wide range of job openings in industries like tech,
              healthcare, engineering, construction, logistics, hospitality,
              education, and more — all with visa sponsorship.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              3. Do all jobs on Talentra.io come with visa sponsorship?
            </AccordionTrigger>
            <AccordionContent>
              Yes. Every job listing on Talentra.io is screened to ensure that
              it offers genuine visa sponsorship to international applicants.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              4. How do I apply for a job through Talentra.io?
            </AccordionTrigger>
            <AccordionContent>
              Simply create a free account, complete your profile, upload your
              CV, and start applying to jobs. You can also set up alerts to be
              notified of new roles in your field.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              5. Is there any fee to use Talentra.io?
            </AccordionTrigger>
            <AccordionContent>
              No, Talentra.io is free for job seekers. We believe in creating
              equal opportunities without financial barriers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>
              6. Can I get help with CV and interview preparation?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely! We offer resources and guidance to help you craft
              professional resumes and prepare for interviews with international
              employers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>
              7. Does Talentra.io assist with relocation?
            </AccordionTrigger>
            <AccordionContent>
              Yes. We provide helpful relocation tips, guides on visa processes,
              and connect you with resources that ease your transition abroad.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>
              8. How do I contact Talentra.io?
            </AccordionTrigger>
            <AccordionContent>
              You can reach us through:
              <ul className="list-disc pl-5 mt-2">
                <li>Email: notify@talentra.io</li>
                <li>Phone: +971 50 709 2468</li>
                <li>Location: Dubai, UAE</li>
              </ul>
              Our support team is here to assist you Monday to Friday.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger>
              9. Is Talentra.io safe and secure?
            </AccordionTrigger>
            <AccordionContent>
              Yes. We follow strict data protection policies and ensure your
              personal information is never shared without your consent. Please
              refer to our Privacy Policy for more details.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>
              10. Can employers register on Talentra.io?
            </AccordionTrigger>
            <AccordionContent>
              Definitely. Talentra.io is also a platform for global employers
              seeking verified, international talent. Contact us to learn more
              about our employer solutions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;
