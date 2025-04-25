import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-slate-50 pb-12">
      {/* Header Banner */}
      <div className="rounded-bl-[3rem] bg-primary/50 shadow-lg">
        <h1 className="mx-auto max-w-4xl px-6 py-16 text-4xl font-bold text-white text-center">
          Terms and Conditions
        </h1>
      </div>

      {/* Content Container */}
      <div className="container mx-auto max-w-4xl mt-8 rounded-xl bg-white p-8 text-base leading-relaxed shadow-xl">
        <p className="mb-6">
          Welcome to <strong>talentra</strong>. These Terms and Conditions govern your use of our website and job placement services. By accessing or using our services, you agree to comply with and be bound by these Terms. Please read them carefully.
        </p>

        <h2 className="mb-3 mt-6 text-xl font-semibold text-primary">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing <strong>talentra</strong> and using our services, you accept and agree to these Terms. If you do not agree, please do not use our website or services.
        </p>

        <h2 className="mb-3 mt-6 text-xl font-semibold text-primary">2. Services Provided</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Job placement solutions for job seekers and employers targeting European countries such as Germany, Netherlands, France, Sweden, and more.</li>
          <li>Professional career advice and consultation.</li>
          <li>Custom job-matching services tailored to user preferences and qualifications.</li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold text-primary">3. User Responsibilities</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Provide truthful and accurate information during registration and use.</li>
          <li>Use the platform only for lawful job search or recruitment purposes.</li>
          <li>Maintain confidentiality of your login and personal information.</li>
        </ul>

        <h2 className="mb-3 mt-6 text-xl font-semibold text-primary">4. Intellectual Property</h2>
        <p className="mb-4">
          All content on the <strong>talentra</strong> website, including logos, designs, text, and software, is owned by <strong>talentra</strong> and protected by applicable copyright and intellectual property laws. You may not reuse, reproduce, or republish content without permission.
        </p>

        <h2 className="mb-3 mt-6 text-xl font-semibold text-primary">5. Limitation of Liability</h2>
        <p className="mb-4">
          While we strive to provide accurate and timely information, <strong>talentra</strong> is not liable for any loss or damage arising from the use of our website or services.
        </p>

        <h2 className="mb-3 mt-6 text-xl font-semibold text-primary">6. Privacy Policy</h2>
        <p className="mb-4">
          Your use of <strong>talentra</strong> is subject to our <span className="text-blue-600 underline">Privacy Policy</span>, which outlines how we collect and manage your data. Please review it carefully.
        </p>

        <h2 className="mb-3 mt-6 text-xl font-semibold text-primary">7. Termination of Services</h2>
        <p className="mb-4">
          We reserve the right to terminate or restrict your access to our services at any time, with or without cause, if we believe you have violated our Terms or engaged in harmful conduct.
        </p>

        <h2 className="mb-3 mt-6 text-xl font-semibold text-primary">8. Changes to Terms</h2>
        <p className="mb-6">
          <strong>talentra</strong> may update these Terms at any time. We will notify users of major updates via our website. Continued use after such changes constitutes acceptance of the new terms.
        </p>

        <p className="mt-8 text-center font-medium text-gray-700">
          By using our services, you acknowledge that you’ve read, understood, and agreed to these Terms and Conditions.
        </p>
      </div>
    </div>
  );
};


export default TermsAndConditions;
