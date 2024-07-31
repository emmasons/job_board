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
          At JobsConnect, we value your privacy and are committed to protecting
          your personal information. This Privacy Policy outlines how we
          collect, use, and safeguard your information when you use our
          platform.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">Information Collection</h2>
        <p className="mb-4">
          We collect personal information that you voluntarily provide to us
          when you register on the platform, express interest in obtaining
          information about us or our products and services, participate in
          activities on the platform, or contact us.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">Use of Information</h2>
        <p className="mb-4">
          The personal information we collect is used to provide and improve our
          services, communicate with you, process transactions, and enhance your
          experience on our platform. We may also use your information for
          marketing purposes with your consent.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">Information Sharing</h2>
        <p className="mb-4">
          We do not share your personal information with third parties except as
          necessary to provide our services, comply with the law, or protect our
          rights. We may share anonymized data with partners for analytics and
          research purposes.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">Security</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access, loss,
          or misuse. However, please be aware that no method of transmission
          over the Internet or method of electronic storage is completely
          secure.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal
          information at any time. You can also object to the processing of your
          personal information or request that we restrict the processing of
          your personal information.
        </p>

        <p className="mb-4">
          If you have any questions or concerns about our Privacy Policy, please
          contact us at privacy@jobsconnect.com.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
