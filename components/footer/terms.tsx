import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-slate-50 pb-8">
      <div className="rounded-bl-3xl bg-primary/50">
        <h2 className="mx-auto max-w-3xl p-4 py-12 text-4xl font-semibold text-white ">
          Terms and Conditions
        </h2>
      </div>
      <div className="container text-sm  mx-auto max-w-3xl bg-white p-8 shadow-lg">
        <p className="mb-4">
          Welcome to JobsConnect. These terms and conditions outline the rules
          and regulations for the use of our platform. By accessing this
          website, we assume you accept these terms and conditions in full. Do
          not continue to use JobsConnect if you do not accept all of the terms
          and conditions stated on this page.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">Usage License</h2>
        <p className="mb-4">
          Unless otherwise stated, JobsConnect and/or its licensors own the
          intellectual property rights for all material on JobsConnect. All
          intellectual property rights are reserved. You may view and/or print
          pages from https://jobsconnect.com for your own personal use subject
          to restrictions set in these terms and conditions.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">User Responsibilities</h2>
        <p className="mb-4">
          By using our platform, you agree to use it only for lawful purposes
          and in a way that does not infringe the rights of, restrict, or
          inhibit anyone else's use and enjoyment of the platform. Prohibited
          behavior includes harassing or causing distress or inconvenience to
          any other user, transmitting obscene or offensive content, or
          disrupting the normal flow of dialogue within our platform.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">
          Limitations of Liability
        </h2>
        <p className="mb-4">
          JobsConnect will not be liable for any damages arising out of or in
          connection with the use of our platform. This includes, without
          limitation, direct loss, loss of business or profits (whether or not
          the loss of such profits was foreseeable, arose in the normal course
          of things, or you have advised JobsConnect of the possibility of such
          potential loss), damage caused to your computer, computer software,
          systems, and programs, and the data thereon or any other direct or
          indirect, consequential, and incidental damages.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">Revisions and Errata</h2>
        <p className="mb-4">
          The materials appearing on JobsConnect's website could include
          technical, typographical, or photographic errors. JobsConnect does not
          warrant that any of the materials on its website are accurate,
          complete, or current. JobsConnect may make changes to the materials
          contained on its website at any time without notice.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">Governing Law</h2>
        <p className="mb-4">
          These terms and conditions are governed by and construed in accordance
          with the laws of the Gulf region and you irrevocably submit to the
          exclusive jurisdiction of the courts in that location.
        </p>

        <p className="mb-4">
          If you have any questions or concerns about our Terms and Conditions,
          please contact us at terms@jobsconnect.com.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
