import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-slate-50 pb-8">
      <div className="rounded-bl-3xl bg-primary/50">
        <h2 className="mx-auto max-w-3xl p-4 py-12 text-4xl font-semibold text-white ">
          Terms and Conditions
        </h2>
      </div>
      <div className="container mx-auto  max-w-3xl bg-white p-8 text-sm shadow-lg">
        <p className="mb-4">
          Welcome to Jobs Connect. These Terms and Conditions govern your use of
          our website and job placement services. By accessing or using our
          services, you agree to comply with and be bound by these Terms and
          Conditions. Please read them carefully.
        </p>

        <h2 className="mb-4 text-lg font-semibold">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing Jobs Connect’s website and using our job placement
          services, you accept and agree to these Terms and Conditions. If you
          do not agree, please do not use our website or services.
        </p>

        <h2 className="mb-4 text-lg font-semibold">2. Services Provided</h2>
        <p className="mb-4">
          Jobs Connect offers professional job placement services, including:
          <ul className="list-disc pl-5">
            <li>
              Job Placement Solutions for job seekers and employers in Gulf
              countries such as UAE, Saudi Arabia, Kuwait, Oman, and Qatar.
            </li>
            <li>Expert job placement advice and consulting.</li>
            <li>Custom job placement services tailored to individual needs.</li>
          </ul>
        </p>

        <h2 className="mb-4 text-lg font-semibold">3. User Responsibilities</h2>
        <p className="mb-4">
          As a user of Jobs Connect, you agree to:
          <ul className="list-disc pl-5">
            <li>
              Provide accurate and complete information when using our services.
               Use our services only for lawful purposes.
            </li>
            <li>
              Not engage in any activity that could harm Jobs Connect or other
              users.
            </li>
            <li>Maintain the confidentiality of your account information.</li>
          </ul>
        </p>

        <h2 className="mb-4 text-lg font-semibold">4. Intellectual Property</h2>
        <p className="mb-4">
          All content on the Jobs Connect website, including text, graphics,
          logos, and software, is the property of Jobs Connect and protected by
          intellectual property laws. You may not use, reproduce, or distribute
          any content without our prior written permission.
        </p>

        <h2 className="mb-4 text-lg font-semibold">
          5. Limitation of Liability
        </h2>
        <p className="mb-4">
          Jobs Connect strives to provide reliable job placement services but
          does not guarantee the accuracy, completeness, or timeliness of the
          information provided. We are not liable for any damages arising from
          the use or inability to use our services.
        </p>
        <h2 className="mb-4 text-lg font-semibold">6. Privacy Policy</h2>
        <p className="mb-4">
          Your use of Jobs Connect is also governed by our Privacy Policy, which
          outlines how we collect, use, and protect your personal information.
          Please review our Privacy Policy to understand our data practices.
        </p>
        <h2 className="mb-4 text-lg font-semibold">
          7. Termination of Services
        </h2>
        <p className="mb-4">
          Jobs Connect reserves the right to terminate or suspend your access to
          our services at any time, without notice, for any conduct that we
          believe violates these Terms and Conditions or is harmful to other
          users or our business interests.
        </p>
        <h2 className="mb-4 text-lg font-semibold">
          8. Changes to Terms and Conditions
        </h2>
        <p className="mb-4">
          Jobs Connect may update these Terms and Conditions from time to time.
          We will notify you of any significant changes by posting the new Terms
          and Conditions on our website and updating the effective date at the
          top of this page. Your continued use of our services after such
          changes constitutes your acceptance of the new Terms and Conditions.
        </p>

        <p className="mb-4">
          By using our website and services, you acknowledge that you have read,
          understood, and agree to be bound by these Terms and Conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
