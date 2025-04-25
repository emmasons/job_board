import React from "react";

const About: React.FC = () => {
  return (
    <div className="bg-slate-50 pb-12">
      <div className="rounded-bl-3xl bg-primary/50 shadow-md">
        <h2 className="mx-auto max-w-4xl px-6 py-16 text-5xl font-bold text-white drop-shadow-md">
          About Talentra.io
        </h2>
      </div>

      <div className="container mx-auto max-w-4xl bg-white -mt-12 p-8 rounded-xl shadow-xl">
        <p className="mb-6 text-gray-700 leading-relaxed text-lg">
          <strong>Talentra.io</strong> is a global job board built to empower skilled professionals
          seeking life-changing, <span className="text-primary font-semibold">visa-sponsored job opportunities</span> worldwide.
          We bridge the gap between international talent and companies ready to hire globally—offering a trusted platform where careers and dreams align.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-primary">Why Talentra.io?</h3>
        <p className="mb-6 text-gray-700 leading-relaxed">
          Whether you're a healthcare worker aiming for a role in Europe, a software engineer eyeing opportunities in North America, or a tradesperson ready to relocate to the Middle East, we make international job searching easier and more efficient. Every job listed on Talentra.io includes <span className="font-medium">visa sponsorship information upfront</span>, saving you time and uncertainty.
        </p>

        <h3 className="text-xl font-semibold mb-4 text-primary">What We Offer</h3>
        <ul className="list-disc list-inside mb-6 text-gray-700 leading-relaxed">
          <li>Verified listings from employers actively sponsoring work visas</li>
          <li>Guides and resources to help you with visa processes and relocation</li>
          <li>Custom job alerts for roles that match your skills and location preferences</li>
          <li>A streamlined application process tailored for international candidates</li>
        </ul>

        <h3 className="text-xl font-semibold mb-4 text-primary">Built for Global Talent</h3>
        <p className="mb-6 text-gray-700 leading-relaxed">
          At Talentra.io, we believe talent has no borders. That’s why we’re committed to transparency, accessibility, and providing meaningful support for those pursuing global careers. Our platform is more than just a job board—it’s a launchpad for your international journey.
        </p>

        <div className="bg-primary/10 border-l-4 border-primary px-6 py-4 rounded-md shadow-sm">
          <p className="text-primary font-medium">
            Join thousands of global job seekers who trust Talentra.io to connect them with life-changing, visa-sponsored opportunities. Your next career move is just a few clicks away.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
