"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";
import { useRouter } from "next/navigation";

interface Template {
  id: number;
  name: string;
  preview: string;
  content: React.ReactNode;
}

const templates: Template[] = [
  {
    id: 1,
    name: "Nursing",
    preview: "/templates/professional.png",
    content: (
      <div>
        <h2>Professional Template</h2>
        <p>This template is designed for a professional look.</p>
      </div>
    ),
  },
  {
    id: 2,
    name: "Modern",
    preview: "/templates/modern.png",
    content: (
      <div>
        <h2>Modern Template</h2>
        <p>This template is designed for a modern look.</p>
      </div>
    ),
  },
  {
    id: 3,
    name: "Driver",
    preview: "/templates/driver.png",
    content: (
      <div className="p-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Max Leewood</h1>
            <p className="text-gray-600 uppercase text-sm">Driver</p>
          </div>

          {/* Contact Details */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 justify-between w-full">
              <span>leewood.max@gmail.com</span>
              <span>•</span>
              <span>
                4200 W Latham Street, Phoenix, AZ 85009, United States
              </span>
              <span>•</span>
              <span>(602) 319-1212</span>
            </div>
          </div>

          {/* Letter Content */}
          <div className="space-y-6 text-left text-[0.9rem]">
            <div className="space-y-1">
              <p>To: Mr. Harman</p>
              <p>Zone18</p>
            </div>

            <div className="space-y-4">
              <p>Dear Mr. Harman,</p>

              <p>
                Ever since my childhood paper round, delivering packages
                accurately has been something that I have taken a pride in.
                Three years driving delivery vans for ExPress with 99.4% on-time
                delivery stats and 98.7% customer satisfaction ratings has
                therefore been hugely enjoyable.
              </p>

              <p>
                After moving to Boston, I am seeking a new driver role, and I am
                excited to potentially become part of the Zone18 delivery
                family. If good customers hear that a delivery person is at
                their door, they automatically think Zone18. It would be an
                honor to represent you.
              </p>

              <p>
                I possess a full and clean class A and B CDL licence and after
                taking a defensive driving course on my return from military
                service seven years ago, I am of the belief that you can never
                be too careful on the roads. I am now an instructor on an
                advanced driving course and always seek to level up my skills.
                Driving in the Boston winter is a challenge for anyone.
              </p>

              <p>
                Our customers expect a seamless experience with their delivery
                driver, and I can bring the following customer excellence to my
                potential new role at Zone18:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Mastered the intricacies of route planning for safer and
                  faster delivery schedules.
                </li>
                <li>
                  Consistently in the top 5% of drivers for customer
                  satisfaction and delivery accuracy.
                </li>
                <li>
                  Supporter of technology in delivery process - I make the most
                  of it where possible.
                </li>
              </ul>

              <p>
                I enjoy my delivery role because I am adding to the lives of
                other people, saving them time and money and giving them one
                less thing to worry about. I am a consummate professional and
                have a long list of glowing customer references that I am able
                to share.
              </p>

              <p>
                An interview for the role in Boston would be the ideal start to
                my life in the city.
              </p>
            </div>

            <div className="mt-8">
              <p>Best regards,</p>
              <p>Max Leewood</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    name: "Professional Nurse",
    preview: "/templates/nurse.png",
    content: (
      <div className="overflow-auto mx-auto p-8">
        <div className="space-y-6 flex gap-4">
          <div className="basis-1/3 space-y-4 border-r-2 pr-4 border-slate-600">
            <div className="font-bold text-2xl tracking-wider uppercase flex flex-col items-end">
              <p>PEDRO</p>
              <p>DUARTE</p>
              <p className="text-sm font-normal uppercase mt-2">NURSE</p>
            </div>
            <div className="text-sm flex flex-col items-end">
              <div>To</div>
              <div>Dr. Rowntree</div>
              <div>Mount Bisai</div>
            </div>

            <div className="text-sm flex flex-col items-end">
              <div>From</div>
              <div>Pedro Duarte</div>
              <div>Nurse</div>
              <div>infiniteduarte2021@gmail.com</div>
            </div>
          </div>
          <div className="basis-2/3 text-left space-y-4 text-[0.9rem]">
            <p>Dear Dr. Rowntree,</p>
            <p>
              I write to express an interest in your accelerated nurse midwifery
              programme for recently-qualified CNMs. During my seven-year
              nursing career, I have always sought to learn from the best, and
              there is no better place than at Mount Bisai.
            </p>

            <p>
              A broad range of experience from prenatal to delivery and
              postpartum care ensures that I can make a difference in terms of
              caring for my patients' needs. I have worked with obstetricians on
              150+ complicated cases and while I have a firm grounding in
              high-risk conditions, I am keen to take on more theory and
              practice at Mount Sinai. I was commended for lowest rates of
              C-sections amongst my graduate cohort and I believe that my
              empathetic interpersonal skills have been vital in offering the
              highest level of care.
            </p>

            <p>
              Education is an important aspect of the birthing journey and I
              strive to seize every opportunity to advise around nutrition,
              exercise, rest and general wellness. Every day matters.
            </p>

            <div className="mt-8">
              <div>Yours sincerely,</div>
              <div>Jackie Elise</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    name: "Science Teacher",
    preview: "/templates/science-teacher.png",
    content: (
      <div className="p-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">Grace Mckenna</h1>
            <p className="text-gray-600">Science Teacher</p>
          </div>

          {/* Contact Info */}
          <div className="flex justify-between text-sm text-gray-600 border-b pb-4">
            <div className="flex justify-between basis-1/2">
              <p className="font-bold">ADDRESS</p>
              <div className="text-left">
                <p>271 E 37th St, Brooklyn, NY 11233,</p>
                <p>United States</p>
              </div>
            </div>
            <div className="flex flex-col justify-between basis-1/2">
              <div className="flex gap-4">
                <p className="font-bold">PHONE</p>
                <p>(718) 874-3155</p>
              </div>
              <div className="flex gap-4">
                <p className="font-bold">EMAIL</p>
                <p>Grace_mckenna@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Letter Content */}
          <div className="space-y-6 flex gap-4 text-left">
            <div className="space-y-1 text-sm basis-1/3">
              <p>TO</p>
              <p>Mr. Wilson</p>
              <p>Jefferson High School</p>
            </div>

            <div className="space-y-4 text-[0.9rem] basis-2/3">
              <p className="mb-4">Dear Principal Wilson,</p>

              <div className="space-y-4 text-[0.95rem] text-gray-800">
                <p>
                  Newton's first law of motion states that an object will stay
                  at rest until a force acts upon it.
                </p>

                <p>
                  Two decades of seeing 500+ science students graduate from Ivy
                  League universities tells me that my "force" is indeed helping
                  to develop the scientific minds of tomorrow. I hope to bring
                  this experience to the advertised science position at
                  Jefferson High School.
                </p>

                <p>
                  As the subject lead for a district of 18 schools, I
                  facilitated the creation of learning materials and oversaw an
                  improvement of graduation rates by 10% across the district
                  over a four-year period. In my school, the graduation rate
                  averaged 99%. I believe in the power of learning through
                  experiments rather than theory – showing beats telling every
                  time. Innovative approaches often bring new discoveries.
                </p>

                <p>
                  I have been active in creating online lessons for my students
                  and believe that blended learning is the future of education.
                  We might not be with our students as they are doing their
                  homework, but we can send them a recorded online video to
                  explain things. Being able to rewind a video is an amazing way
                  to check understanding.
                </p>

                <p>
                  Jefferson HS values are close to my heart, and it was actually
                  one of your current faculty who suggested that I apply for the
                  role. I look forward to the opportunity of learning more about
                  your staff and students and hope that I might be able to
                  contribute to their success. In the school experiment, every
                  curious young mind matters.
                </p>
              </div>

              <div className="mt-8 space-y-1">
                <p>Yours sincerely,</p>
                <p>Grace McKenna</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const Page = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  const router = useRouter();

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    router.push(`/create-cover-letter/templates/${template.id}`);
  };

  return (
    <div className="p-6 flex-1 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Choose a Template</h1>

      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          968: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
      >
        {templates.map((template) => (
          <SwiperSlide key={template.id}>
            <div
              className={`relative cursor-pointer rounded-lg transition-all h-full bg-slate-50 w-full ${
                selectedTemplate?.id === template.id
                  ? "border-blue-500 scale-105"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="h-full overflow-y-auto">{template.content}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedTemplate && (
        <div className="mt-6">
          <p className="text-lg">
            Selected template:{" "}
            <span className="font-medium">{selectedTemplate.name}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
