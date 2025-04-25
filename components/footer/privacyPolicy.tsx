import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-slate-100 pb-12">
      <div className="bg-primary/50 rounded-bl-3xl shadow-md">
        <h1 className="text-center text-white text-4xl font-bold py-16 px-4">
          Privacy Policy
        </h1>
      </div>

      <div className="mx-auto max-w-4xl px-6 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
          <p className="mb-6 text-slate-700 text-lg leading-relaxed">
            Welcome to <strong>talentra.io</strong>. We are committed to protecting your privacy
            and ensuring your personal data is handled securely and transparently.
            This policy explains how we collect, use, and protect your information
            when you visit our website or use our recruitment services focused on European job markets.
          </p>

          <Section title="1. Information Collection">
            <p className="mb-3">We collect data you voluntarily provide, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email, phone number, and contact details.</li>
              <li><strong>Employment Information:</strong> Resume, job preferences, work history, and education.</li>
              <li><strong>Technical Information:</strong> IP address, browser type, OS, and cookies-related data.</li>
            </ul>
          </Section>

          <Section title="2. Use of Information">
            <p className="mb-3">We use your data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Match Jobs:</strong> Connect you to relevant jobs across Europe (Germany, Netherlands, Sweden, Norway, France, etc.).</li>
              <li><strong>Enhance Services:</strong> Improve our platform and user experience.</li>
              <li><strong>Ensure Compliance:</strong> Meet legal obligations and protect rights.</li>
            </ul>
          </Section>

          <Section title="3. Disclosure of Information">
            <p className="mb-3">Your data may be shared with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Employers & Partners:</strong> Verified entities assisting with job placement.</li>
              <li><strong>Service Providers:</strong> Vendors offering infrastructure, analytics, or marketing support.</li>
              <li><strong>Authorities:</strong> As required by law or legal requests.</li>
            </ul>
          </Section>

          <Section title="4. Data Security">
            <p className="mb-3">Our security practices include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Encryption:</strong> Secure technologies to protect data.</li>
              <li><strong>Access Control:</strong> Data access restricted to authorized personnel.</li>
              <li><strong>Auditing:</strong> Ongoing security assessments and best practices.</li>
            </ul>
          </Section>

          <Section title="5. Your Rights">
            <p className="mb-3">You may exercise the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request corrections or updates</li>
              <li>Request deletion of data (subject to legal limits)</li>
              <li>Object to data processing</li>
              <li>Request data portability</li>
            </ul>
          </Section>

          <Section title="6. Cookies and Tracking">
            <p>
              We use cookies to personalize your experience and analyze traffic.
              You can manage cookie settings in your browser.
            </p>
          </Section>

          <Section title="7. Changes to This Policy">
            <p>
              We may update this Privacy Policy periodically. Changes will be posted here.
              Continued use of our services indicates your agreement to these updates.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold text-primary mb-4 border-l-4 border-primary pl-3">
      {title}
    </h3>
    <div className="text-slate-700 text-base leading-relaxed">{children}</div>
  </div>
);


export default PrivacyPolicy;
