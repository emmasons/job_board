"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const slideContent = [
  {
    title: "Amsterdam",
    description: "This is a very long description",
    bgImage: "/index/carousel/bg1.jpeg",
  },
  {
    title: "Berlin",
    description: "This is a very long description",
    bgImage: "/index/carousel/bg2.jpg",
  },
  {
    title: "Copenhagen",
    description: "This is a very long description",
    bgImage: "/index/carousel/bg3.jpg",
  },
  {
    title: "Dublin",
    description: "This is a very long description",
    bgImage: "/index/carousel/bg4.jpg",
  },
];

export default function Hero() {
  return (
    <div className="h-[70vh] bg-slate-100">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {slideContent.map((slide, index) => (
          <SwiperSlide key={`slide-${slide.title}-${index + 1}`}>
            <div
              style={{ backgroundImage: `url(${slide.bgImage})` }}
              className="h-full w-full bg-cover bg-center bg-no-repeat"
            >
              <div className="flex h-full w-full flex-col items-center justify-center bg-[rgba(0,0,0,0.5)] ps-16 text-left text-white">
                <div className="">
                  <h1 className="flex flex-col text-4xl font-bold">
                    {slide.title}
                  </h1>
                  <p className="font-bold">
                    {slide.description} - {index + 1}
                  </p>
                  <Link
                    href="#"
                    className="hover:scale-x-105 inline-flex transform items-center bg-primary px-3 py-2 font-bold transition-transform"
                  >
                    Action {index + 1} <ChevronRight />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
