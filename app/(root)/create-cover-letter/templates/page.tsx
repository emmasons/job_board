"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  templates,
  TemplateContent,
} from "@/components/cover-letter/cover-letter-templates";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { Logo } from "@/components/navbar/Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Sample data for preview
const sampleData: TemplateContent = {
  name: "John Smith",
  jobTitle: "Senior Developer",
  address: "123 Tech Street, Silicon Valley, CA 94025",
  email: "john.smith@email.com",
  phoneNumber: "(555) 123-4567",
  companyName: "Tech Solutions Inc.",
  hiringManager: "Mrs. Jane Wilson",
  coverLetter: `
  
    <p className="text-[0.7rem]">I am writing to express my strong interest in the Senior Developer position at Tech Solutions Inc. With over 8 years of experience in software development and a proven track record of delivering high-quality solutions, I believe I would be a valuable addition to your team.</p>
    
    <p className="text-[0.7rem]">Throughout my career, I have demonstrated expertise in full-stack development, team leadership, and project management. I have successfully led teams of 5-10 developers, delivered projects on time and within budget, and implemented best practices that improved code quality and team productivity.</p>

    <p className="text-[0.7rem]">I am particularly impressed with Tech Solutions' commitment to innovation and your recent work in AI integration. I would welcome the opportunity to contribute to your future projects and help drive technological advancement.</p>
  `,
  date: new Date().toLocaleDateString(),
};

const Page = () => {
  const jobId = useSearchParams().get("jobId");

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #0F75B9 0%, #1E88E5 50%, #42A5F5 100%)`,
        }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-4 h-4 bg-white bg-opacity-30 rounded-full"></div>
          <div className="absolute top-32 right-32 w-6 h-6 bg-white bg-opacity-20 rounded-full"></div>
          <div className="absolute top-48 left-64 w-3 h-3 bg-white bg-opacity-40 rounded-full"></div>
          <div className="absolute bottom-32 left-24 w-5 h-5 bg-white bg-opacity-25 rounded-full"></div>
          <div className="absolute bottom-48 right-16 w-4 h-4 bg-white bg-opacity-35 rounded-full"></div>
        </div>

        <MaxWidthWrapper className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-white space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Best Cover Letter Templates for Your Job Search
                </h1>
                <p className="text-lg leading-relaxed max-w-md opacity-90">
                  Cover letter templates can help you write a better cover
                  letter. Use these professionally designed templates to enhance
                  your letter.
                </p>
              </div>
            </div>

            {/* Right side - Cover letter image */}
            <div className="flex justify-center lg:justify-end">
              <div className="transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/assets/cover-letter.png"
                  alt="Cover Letter Templates"
                  width={400}
                  height={500}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Templates Section */}
      <section className="bg-gray-100 py-12">
        <MaxWidthWrapper>
          <Swiper
            slidesPerView={1.5}
            centeredSlides={true}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
              },
              968: {
                slidesPerView: 1.5,
                spaceBetween: 30,
                centeredSlides: true,
              },
            }}
            className="mySwiper"
          >
            {templates.map((template) => (
              <SwiperSlide key={template.id}>
                <div
                  className={`relative cursor-pointer rounded-lg transition-all h-[800px] w-full`}
                >
                  <div className="h-full overflow-y-auto">
                    <div className="relative">
                      {template.content(sampleData)}
                    </div>
                    <Link
                      href={
                        "/create-cover-letter/templates" +
                        `/${template.id}?jobId=${jobId}`
                      }
                      className="absolute -translate-x-1/2 top-1/2"
                    >
                      <Button variant="default" className="px-4 py-2">
                        Use template
                      </Button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </MaxWidthWrapper>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* First Benefits Block */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                The Benefits of Cover Letter Templates from ResumeNerd
              </h2>
              <p className="text-gray-600 leading-relaxed">
                One of the most commonly given pieces of career advice is to do
                everything possible to make your cover letter and resume unique
                to each job application. So, with this in mind, why is it a good
                idea to use a cover letter template? First and foremost, it is
                important to remember that a cover letter template is not a
                pre-written cover letter. Instead, think of it as a skeleton
                design you can use to create an effective cover letter when you
                add your own information.
              </p>
              <p className="text-gray-600 leading-relaxed">
                There are a range of benefits that come with using ResumeNerd
                professional cover letter templates, as reflected in our{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  ResumeNerd reviews
                </a>
                . The most important benefits are:
              </p>

              <div className="bg-gray-100 p-6 rounded-lg">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-semibold">
                      Convenience and simplicity
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-semibold">
                      Access to appropriate pre-built options that can fit any
                      industry
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-semibold">
                      The ability to use matching cover letter and resume
                      templates for a complementary job application
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-semibold">
                      Accelerate the process of applying for a job
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-semibold">
                      All ResumeNerd templates are designed to pass recruiter
                      and ATS scans
                    </span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-600 leading-relaxed">
                In short, when you use a professional cover letter template you
                will find it easier to create tailored cover letters that look
                good and you will be able to write them at a quicker pace. This
                allows you to apply to more jobs while still submitting high
                quality cover letters and resumes. In fact, there are even
                creative cover letter templates for those who work in the arts
                or in creative technology roles. You can find more information
                on common cover letter formats at ResumeNerd.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-80 h-96 bg-slate-50 rounded-lg flex items-center justify-center">
                <Logo />
              </div>
            </div>
          </div>

          {/* Second Benefits Block */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                The Most Important Elements of a Cover Letter Template
              </h2>
              <p className="text-gray-600 leading-relaxed">
                While different cover letter templates will have distinct
                appearances and features, they should all contain the same basic
                structural components:
              </p>

              <div className="space-y-8">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Introduction and hook
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your header and introduction should include your full name
                    and contact information. This means your phone number, email
                    address, and perhaps professional social media details. If
                    you have LinkedIn, you can include that information in this
                    section.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    First paragraph: summary of major achievements
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Your opening paragraph should be a summary of you as a job
                    seeker and present your most relevant achievements. For
                    example, if you were applying for a new job as a high school
                    teacher you might write:
                  </p>
                  <p className="text-gray-600 leading-relaxed italic bg-gray-50 p-4 rounded">
                    "I am a highly motivated and passionate teacher who takes a
                    flexible learning approach. In my last position I
                    implemented a hands-on learning segment to lessons that
                    resulted in the grade average in my class rising by x in one
                    year."
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Second paragraph: your suitability for the company
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    When discussing why you are applying, you should mention the
                    company name and the specific job title you are applying for
                    as well as stating why you want to work with them. Once you
                    have done this you should present reasons why you think you
                    will fit in with the company culture. An example of this
                    would be:
                  </p>
                  <p className="text-gray-600 leading-relaxed italic bg-gray-50 p-4 rounded">
                    "I have long admired the student-first approach that [XYZ
                    School] takes to education, and believe that my flexible
                    approach to learning styles will enable students to reach
                    their full potential."
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Third paragraph: call to action
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    A cover letter is a very short document and should be no
                    more than one page long in most cases. This means that you
                    have a limited time frame in which to impress hiring
                    managers. End your cover letter with a call to action that
                    invites follow up contact in order to grab their attention.
                    Sign off with a formal statement such as "Sincerely Yours".
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <p className="text-gray-600 leading-relaxed">
                    When you place your information into this structure, you
                    will have a functional and complete cover letter. The
                    quality and persuasiveness of the cover letter depends on
                    the content and your writing. Use active language and tailor
                    what you say to the job description to make a good first
                    impression. Do not repeat information from your resume,
                    however.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-80 h-96 bg-slate-50 rounded-lg flex items-center justify-center">
                <Logo />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 max-w-4xl mx-auto px-6">
        <h2 className="font-medium text-3xl leading-normal md:text-5xl text-gray-900 text-center mb-20">
          Everything about a cover letter
        </h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg md:text-xl text-left">
              What is a cover letter for a job?
            </AccordionTrigger>
            <AccordionContent className="text-gray-500 leading-relaxed prose max-w-full">
              <p>
                A cover letter is part of a resume that concisely presents more
                information about you as an applicant. A good cover letter has
                several short paragraphs, shows your interest in the job and any
                relevant experience you have. As you discover how to write a
                cover letter, we have some answers to commonly asked questions.
              </p>
              <p>
                The type of cover letter you use depends on the job description,
                the company at which you are applying and your personal goals.
                As you revise your cover letter, highlight your knowledge about
                the company's mission, values and culture, and show how you fit
                into their long-term vision.
              </p>
              <p>
                An application letter is not always required for job
                applications. However, looks more professional and shows effort
                on the applicant's part. There are four types of cover letters:
              </p>
              <ol>
                <li>
                  <strong>Value proposition letter:</strong> this gives a
                  summary of why you are unique and is similar to the "tell me
                  about yourself" interview question.
                </li>
                <li>
                  <strong>Letter of interest:</strong> this type of letter shows
                  that you are interested in working for a company even if they
                  don't have current open positions, and shows why you are
                  qualified and an asset.
                </li>
                <li>
                  <strong>Referral:</strong> this format is ideal when you know
                  someone at the company who referred you to the position.
                </li>
                <li>
                  <strong>Application:</strong> the most common cover letter,
                  this provides details about relevant experience and education,
                  and allows you to delve into things that aren't appropriate in
                  a{" "}
                  <a href="#" className="underline">
                    resume
                  </a>
                  .
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg md:text-xl text-left">
              Why is a cover letter important for a job application?
            </AccordionTrigger>
            <AccordionContent className="text-gray-500 leading-relaxed prose max-w-full">
              <p>
                A cover letter is important for a job application because it
                gives more insight into your personality and qualifications than
                are listed on your resume. It's an important tool to present
                yourself as an asset to the company. A great cover letter helps
                you stand out from the competition when a hiring manager may go
                through hundreds of applications for each job.
              </p>
              <p>
                Your cover letter is the initial introduction a company has of
                you. If it's well-written and covers your most important
                strengths, it may propel you to the top of the applicant pool.
                It emphasizes your core competencies to catch the hiring
                manager's attention.
              </p>
              <p>
                A good job letter also shows personality. Because of space
                constraints, resumes can often be blunt and to the point with no
                room for the reader to get a sense of your personality.
                Therefore, your cover letter highlights the personality traits
                that make you a good candidate. These traits include things like
                being self-motivated, a good leader or organized. In your cover
                letter, elaborate on why you want to make an employment change
                and why this opportunity is for you.
              </p>
              <p>
                You can also show your passion for the industry or job. A
                well-written cover letter emphasizes your understanding of the
                company's vision and how you fit into it. A powerful letter
                shows how the company benefits from your impact.
              </p>
              <p>
                Finally, a cover letter highlights your writing ability.
                Employers value those who can articulate their thoughts in
                writing, and this shows excellent communication skills.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg md:text-xl text-left">
              How should a cover letter look in 2025?
            </AccordionTrigger>
            <AccordionContent className="text-gray-500 leading-relaxed prose max-w-full">
              <p>
                A good cover letter is both formatted and flexible. Using{" "}
                <a href="#" className="underline">
                  cover letter templates
                </a>{" "}
                can help ensure that you get the right information across to the
                hiring manager, but it's still important to adjust and tailor
                each letter to the specific job application.
              </p>
              <p>
                <strong>Heading:</strong> This section should include your name,
                physical address, phone number and email address. Furthermore,
                you can use a professional email and include links to an online
                portfolio, your professional website or relevant social media
                sites.
              </p>
              <p>
                <strong>Salutation:</strong> If you know the name of the hiring
                manager, use it for a personalized touch. If not, a generic
                "Dear Hiring Manager" can suffice.
              </p>
              <p>
                <strong>Opening Statement:</strong> The first paragraph is an
                strong opening statement about who you are, what job you want
                and when you are available. You can skip specific details like
                the company name in this section.
              </p>
              <p>
                <strong>Company Alignment:</strong> Here, dive into why you're
                drawn to the particular company and the role. Emphasize your
                passion for the industry and how you see yourself contributing
                to the organization's goals.
              </p>
              <p>
                <strong>Motivation:</strong> The third paragraph is for
                motivating why you believe you are the best candidate for the
                job. Here, mention any relevant experience you've had, and why
                you will excel in this job. While your past employment and
                education are included in your resume or{" "}
                <a href="#" className="underline">
                  CV
                </a>
                , this is the place to add one or two experiences that stand out
                and make you a good candidate.
              </p>
              <p>
                <strong>Conclusion:</strong> The final paragraph is an outro,
                and should stay simple and concise. Mention your attached
                resume, specify where and when you can be reached, and mention
                that you'd love the chance to discuss the opportunity more.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg md:text-xl text-left">
              Should I customize my cover letter for every job application?
            </AccordionTrigger>
            <AccordionContent className="text-gray-500 leading-relaxed prose max-w-full">
              <p>
                Using cover letter and resume templates is a great way to get a
                basic outline to start and takes save a lot of time as all the
                formatting is taken care for you. However, it is highly
                recommended that your cover letter should be customized and
                tailored for each specific job and role that you're applying
                for.
              </p>
              <p>
                A personal cover letter shows you've done your research on the
                company and the position and it provides you with a great
                opportunity to stand-out from the rest of the competition.
              </p>
              <p>
                There are several ways to make a cover letter more personal. One
                way is to connect your personal value to the company's values.
                This requires time and research on your part. Read the website
                and browse their social media profiles to get an idea of what is
                important to them. Some companies value the bottom line while
                others focus on their long-term effects on the world, and if you
                understand that, you can tie your personal values and work ethic
                into their goals.
              </p>
              <p>
                When possible, use the hiring manager or recruiter's name. Not
                only does this personalize your letter, it also ensures that
                your application goes to the right person.
              </p>
              <p>
                Share your professional goals. Discuss how the job directly
                impacts your career path and what you've done to create a solid
                foundation. Pinpoint how the job you're applying for matches
                your long-term goals and how you will be an asset to the
                company.
              </p>
              <p>
                As you do research to personalize your cover letter, you learn
                more about every company. This can also give you insight into
                companies that you don't want to work for, whose values don't
                align with yours.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg md:text-xl text-left">
              How do I use Jobseeker's cover letter generator?
            </AccordionTrigger>
            <AccordionContent className="text-gray-500 leading-relaxed prose max-w-full">
              <p>
                Jobseeker offers CV and{" "}
                <a href="#" className="underline">
                  resume examples
                </a>
                , as well as templates for resumes, CVs and cover letters. Our
                tool is easy to use and has several free options. Simply click
                Get Started on our website and click on create a new cover
                letter to begin.
              </p>
              <p>
                You can choose from a formal letter, or email and digital text.
                Input a photo if you choose, your personal information, email
                address and phone number. There is a spot to fill in the
                recipient, the date and subject, the introduction, your current
                job situation, what your motivation is for the job and a closing
                paragraph. These spots include drop downs that help guide you
                through the creating process.
              </p>
              <p>
                Simply fill in these spots and our tool will populate the cover
                letter. Choose from 12 different styles including Elegant,
                Professional, Modern and Simple. Adjust the font, size and color
                to create a cover letter that reflects your goals and
                personality.
              </p>
              <p>
                Jobseeker also allows you to digitally attach a signature,
                upload your resume and create a custom paragraph for any other
                information you want to add. This tool is available in a variety
                of languages and can be downloaded (in PDF format) or printed.
                You can use the same template to personalize a cover letter each
                time you apply for a new job.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg md:text-xl text-left">
              Can I format my cover letter with Jobseeker's cover letter
              generator?
            </AccordionTrigger>
            <AccordionContent className="text-gray-500 leading-relaxed prose max-w-full">
              <p>
                Our convenient tool allows you to not only choose your format,
                spacing and font, but you can also move each section to where
                you feel is appropriate. To change the order, simply hover over
                the section and click the six dots to the left of the text. Use
                the mouse to move the section where you want it.
              </p>
              <p>
                While our examples and templates are a good guideline, we
                recognize that ultimately it's your opinion that matters most.
                We recommend that your personal details, date and subject,
                recipient and introduction remain in the order we've provided,
                but ultimately you can change the order to fit the job.
              </p>
              <p>
                Our system mimics that of other word processing programs (such
                as Google Docs and Microsoft Word) to make it easy to use.
                Within the Introduction section, our system guides you to choose
                between four types of applications: open application, response
                to ad in newspaper or magazine, response to online ad, and
                other.
              </p>
              <p>
                Once you've chosen from the dropdowns in each section, the text
                automatically populates on the cover letter. Our text gives you
                a starting point, but you can edit any information to match your
                purposes. As each paragraph is added and you make edits, read
                through the information and check that your tone and writing
                style match.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-lg md:text-xl text-left">
              How can I send the cover letter after it is created?
            </AccordionTrigger>
            <AccordionContent className="text-gray-500 leading-relaxed prose max-w-full">
              <p>
                Once your cover letter is done and all applicable fields are
                filled in, you can download the document as a PDF and send it
                along with your resume or CV to the recruiter or hiring manager.
                We also offer an option to receive the cover letter as a plain
                email if that option works for you.
              </p>
              <p>
                When writing your cover letter, don't forget to attach your
                resume before you send it to the hiring manager or recruiter.
                Proofread your cover letter every time you change it, and browse
                our samples to find a professional tone with appropriate
                language.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger className="text-lg md:text-xl text-left">
              What makes Jobseeker's cover letter builder the best?
            </AccordionTrigger>
            <AccordionContent className="text-gray-500 leading-relaxed prose max-w-full">
              <p>
                When it comes to cover letter, resume and{" "}
                <a href="#" className="underline">
                  CV templates
                </a>{" "}
                and <a href="#">resume templates</a>, we have many great options
                to choose from. However, ease-of-use is where our builder shines
                above the rest. We strive to keep Jobseeker's tools updated and
                customized to match your needs. The benefits of using Jobseeker
                include the following:
              </p>
              <ul>
                <li>
                  Our user-friendly interface makes the creation process simple
                  for those with basic technology experience.
                </li>
                <li>
                  Our tool allows you to build a cover letter, CV or resume in
                  more than 20 languages.
                </li>
                <li>
                  We provide diverse options when it comes to templates, with
                  more than ten styles to choose from.
                </li>
                <li>
                  We allow you to adjust your text, font and spacing to be more
                  exciting, which helps you create an eye-catching cover letter.
                </li>
                <li>
                  With our easy formatting tool it is simple to add, remove or
                  move various sections.
                </li>
                <li>
                  When you use Jobseeker, you can match your cover letter
                  template to your CV or resume template.
                </li>
              </ul>
              <p>
                As you browse resume, cover letter and{" "}
                <a href="#" className="underline">
                  CV examples
                </a>{" "}
                on our website, you can run through our cover letter maker to
                see for yourself how easy it is to use, and how quickly we can
                help you create an eye-catching, attention-grabbing cover
                letter. Present your best professional image with a
                well-written, personalized cover letter created with the the
                Jobseeker tool.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger className="text-lg md:text-xl text-left">
              How many words should a cover letter be?
            </AccordionTrigger>
            <AccordionContent className="text-gray-500 leading-relaxed prose max-w-full">
              <p>
                The appropriate length of a cover letter can vary depending on
                the position and industry, but as a general guideline, it is
                recommended to keep it concise and focused. A well-crafted cover
                letter typically ranges from 250 to 400 words. It is important
                to remember that hiring managers often have limited time to
                review applications, so it is best to convey your qualifications
                and enthusiasm in a clear and succinct manner. Instead of
                writing lengthy paragraphs, aim to highlight your most relevant
                strengths and accomplishments, using bullet points or short
                sentences. By keeping your cover letter within this word count
                range, you can ensure that it remains engaging and impactful
                without overwhelming the reader with excessive information.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* <p className="prose mt-5">
          Do you have unanswered questions? Take a look at our{" "}
          <a
            className="inline-flex focus-visible:ring-4 focus-visible:ring-blue-200"
            href="/faq"
          >
            FAQ
            <svg
              className="w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
            >
              <path
                d="M664.463-450.001H210.001q-12.769 0-21.384-8.615-8.616-8.615-8.616-21.384t8.616-21.384q8.615-8.615 21.384-8.615h454.462L532.769-641.693q-8.923-8.923-8.807-20.884.115-11.961 8.807-21.269 9.308-9.307 21.384-9.615 12.077-.308 21.384 9l179.154 179.154q5.615 5.615 7.923 11.846 2.308 6.23 2.308 13.461t-2.308 13.461q-2.308 6.231-7.923 11.846L575.537-275.539q-8.922 8.923-21.191 8.808-12.269-.116-21.577-9.423-8.692-9.308-9-21.077-.307-11.769 9-21.076l131.694-131.694Z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </p> */}
      </section>
    </div>
  );
};

export default Page;
