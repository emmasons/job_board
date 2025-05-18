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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { templates } from "../../../../components/cover-letter/cover-letter-templates";

const Page = () => {
  return (
    <div className="p-6 flex-1 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Choose a Template</h1>

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
              className={`relative cursor-pointer rounded-lg transition-all h-full bg-slate-50 w-full border-gray-200 hover:border-blue-300`}
              // onClick={() => handleTemplateSelect(template)}
            >
              <div className="h-full overflow-y-auto relative flex items-center">
                {template.content}
                <Link
                  href={"/create-cover-letter/templates" + `/${template.id}`}
                  className="text-sm text-gray-500 hover:text-gray-600 hover:underline absolute top-1/2 right-1/2"
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
    </div>
  );
};

export default Page;
