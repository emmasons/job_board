import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-slate-50 pb-8">
      <div className="rounded-bl-3xl bg-primary/50">
        <h2 className="mx-auto max-w-3xl p-4 py-12 text-4xl font-semibold text-white ">
          Our Privacy Policy
        </h2>
      </div>
      <div className="container  mx-auto max-w-3xl bg-white p-8 shadow-lg">
        <p className="mb-4">
          Welcome to Jobs Connect. We are committed to protecting your privacy
          and ensuring that your personal information is handled in a safe and
          responsible manner. This Privacy Policy outlines how we collect, use,
          disclose, and safeguard your information when you visit our website or
          use our job placement services.
        </p>

        <h2 className="mb-4 text-lg font-semibold">
          1. Information Collection
        </h2>
        <p className="mb-4">
          We collect information that you voluntarily provide to us, including:
          <ul className="list-disc pl-5">
            <li>
              Personal Information: Name, email address, phone number, and any
              other contact details.
            </li>
            <li>
              Employment Information: Resume, job preferences, employment
              history, educational background.
            </li>
            <li>
              Technical Information: IP address, browser type, operating system,
              and other technical information collected through cookies and
              similar technologies.
            </li>
          </ul>
        </p>

        <h2 className="mb-4 text-lg font-semibold">2. Use of Information</h2>
        <p className="mb-4">
          Jobs Connect uses your information for the following purposes:
          <ul className="list-disc pl-5">
            <li>
              Job Placement Services: To provide professional job placement
              services, match you with potential employers, and facilitate
              employment opportunities in Gulf countries such as UAE, Saudi
              Arabia, Kuwait, Oman, and Qatar.
            </li>
            <li>
              Improvement of Services: To analyze and improve our website,
              services, and user experience through innovative job placement
              techniques.
            </li>
            <li>
              Compliance: To comply with legal obligations and protect our
              rights.
            </li>
          </ul>
        </p>

        <h2 className="mb-4 text-lg font-semibold">
          3. Disclosure of Your Information
        </h2>
        <p className="mb-4">
          We may share your information with:
          <ul className="list-disc pl-5">
            <li>
              Employers and Partners: Potential employers and business partners
              for job placement solutions.
            </li>
            <li>
              Service Providers: Third-party vendors who perform services on our
              behalf, such as data analysis, marketing support, and technical
              assistance.
            </li>
            <li>
              Legal Requirements: When required by law, regulation, or legal
              process.
            </li>
          </ul>
        </p>

        <h2 className="mb-4 text-lg font-semibold">4. Data Security</h2>
        <p className="mb-4">
          We implement best job placement practices and take reasonable measures
          to protect your information from unauthorized access, use, or
          disclosure. Our security measures include:
          <ul className="list-disc pl-5">
            <li>
              Data Encryption: Protecting your personal information through
              encryption technologies.
            </li>
            <li>
              Access Controls: Restricting access to your information to
              authorized personnel only.
            </li>
            <li>
              Regular Audits: Conducting regular security audits and
              assessments.
            </li>
          </ul>
        </p>

        <h2 className="mb-4 text-lg font-semibold">5. Your Rights</h2>
        <p className="mb-4">
          You have the right to:
          <ul className="list-disc pl-5">
            <li>
              Access: Request access to the personal information we hold about
              you.
            </li>
            <li>
              Correction: Request corrections to any inaccuracies in your
              information.
            </li>
            <li>
              Deletion: Request the deletion of your personal information,
              subject to certain legal exceptions.
            </li>
            <li>
              Objection: Object to the processing of your information under
              certain circumstances.
            </li>
            <li>
              Data Portability: Request a copy of your information in a
              structured, commonly used format.
            </li>
          </ul>
        </p>
        <h2 className="mb-4 text-lg font-semibold">
          6. Cookies and Tracking Technologies
        </h2>
        <p className="mb-4">
          Our website uses cookies and similar tracking technologies to enhance
          your browsing experience and provide personalized job placement
          services. You can control the use of cookies through your browser
          settings.
        </p>
        <h2 className="mb-4 text-lg font-semibold">
          7. Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          Jobs Connect reserves the right to update this Privacy Policy as
          needed. We will notify you of any significant changes by posting the
          new policy on our website and updating the effective date at the top
          of this page. By using our website and services, you consent to the
          terms of this Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
