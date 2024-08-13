"use client";

import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";

const ContactCandidateWhatsApp = ({ phoneNumber }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const message =
    "Hi, I'm interested in your profile. Can I get more information?";

  useEffect(() => {
    // Check if the user is on a mobile device after the component has mounted
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  // Construct the WhatsApp link based on the device type
  const waLink = isMobile
    ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <>
      <a
        href={waLink}
        className="inline-flex items-center gap-2 no-underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon icon="logos:whatsapp-icon" className="h-4 w-4" />
        <p className="text-sm">Send whatsapp message</p>
      </a>
    </>
  );
};

export default ContactCandidateWhatsApp;
