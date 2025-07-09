'use client';

import { useState } from "react";
import VisaLandingInfo from "@/components/VisaLandingInfo";
import VisaLandingTestimonial from "@/components/VisaLandingTestimonial";
import VisaLandingCta from "@/components/VisaLandingCta";
import Hero from "@/components/VisaLandingHome";
import VisaLandingModal from "@/components/VisaLandingModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="w-full flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
      <Hero onOpenModal={handleOpenModal} />
      <VisaLandingInfo />
      <VisaLandingTestimonial />
      <VisaLandingCta onOpenModal={handleOpenModal} />
      <VisaLandingModal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  );
}
