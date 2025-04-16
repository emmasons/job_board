"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./styles.css";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronRight, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const slideContent = [
  {
    title: "Welcome to Talentra Job Portal",
    description: "Your global portal for visa sponsorship jobs and career growth.",
    bgImage: "/index/carousel/talentra4.jpg",
    content: (
      <Button
        size="sm"
        variant="default"
        onClick={() => signIn()}
        className="btn"
      >
        <LogIn className="mr-2 h-4 w-4" /> LogIn
      </Button>
    ),
  },
  {
    title: "Discover Visa-Sponsored Job Opportunities",
    description:
      "Find job openings around the world that offer visa support—simplifying your relocation journey.",
    bgImage: "/index/carousel/talentra3.jpg",
    content: (
      <Link className="link" href="/search">
        Start your search here
        <ChevronRight className="mr-2 h-4 w-4" />
      </Link>
    ),
  },
  {
    title: "Hire Skilled, Relocation-Ready Talent",
    description: "Connect with top global candidates open to relocation and sponsorship.",
    bgImage: "/index/carousel/talentra2.jpg",
    content: (
      <Link className="link" href="/find-candidates">
        Begin your search here
        <ChevronRight className="mr-2 h-4 w-4" />
      </Link>
    ),
  },
  {
    title: "Explore Living & Working Abroad",
    description: "Get insights into life, work culture, and relocation processes in top destinations.",
    bgImage: "/index/carousel/bg4.jpg",
    content: (
      <Link className="link justify-start" href="/blog">
        Read more here
        <ChevronRight className="mr-2 h-4 w-4" />
      </Link>
    ),
  },
];

export default function Hero() {
  return (
    <div className="h-full bg-slate-100">
      <Swiper
        navigation={true}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        // coverflowEffect={{
        //   rotate: 50,
        //   stretch: 0,
        //   depth: 100,
        //   modifier: 1,
        //   slideShadows: true,
        // }}
        className="mySwiper"
      >
        {slideContent.map((slide, index) => (
          <SwiperSlide key={`slide-${slide.title}-${index + 1}`}>
            <div
              style={{ backgroundImage: `url(${slide.bgImage})` }}
              className="h-screen  w-full bg-cover bg-center bg-no-repeat"
            >
              <div className="swiper-slide-content grid h-full w-full flex-col bg-[rgba(0,0,0,0.6)] text-white">
                <div className="md:w-2/5 space-y-8 md:ml-72">
                  <div className="rounded-md px-4 text-left">
                    <h1 className="md:text-left">{slide.title}</h1>
                    <p className="text-md font-light">{slide.description}</p>
                  </div>
                  <div className="w-full flex justify-start">{slide.content}</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
