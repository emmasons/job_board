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
    name: "Creative",
    preview: "/templates/creative.png",
    content: (
      <div>
        <h2>Creative Template</h2>
        <p>This template is designed for a creative look.</p>
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
        className="mySwiper h-[600px]"
      >
        {templates.map((template) => (
          <SwiperSlide key={template.id}>
            <div
              className={`relative cursor-pointer rounded-lg transition-all h-full overflow-hidden bg-slate-50 w-full flex items-center ${
                selectedTemplate?.id === template.id
                  ? "border-blue-500 scale-105"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="relative">{template.content}</div>
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
