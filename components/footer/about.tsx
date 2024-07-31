import React from "react";

const About: React.FC = () => {
  return (
    <div className="bg-slate-50 pb-8">
      <div className="rounded-bl-3xl bg-primary/50">
        <h2 className="mx-auto max-w-3xl p-4 py-12 text-4xl font-semibold text-white ">
          About-Us
        </h2>
      </div>
      <div className="container mx-auto  max-w-3xl bg-white p-8 text-base shadow-lg">
        <p className="mb-4">
          JobsConnect is an online platform designed to connect quality talent
          with employers across the Gulf region. Our mission is to bridge the
          gap between job seekers and employers, facilitating quick, effective,
          and cost-efficient communication. Since our launch, we have become one
          of the fastest-growing job sites in the Gulf, attracting thousands of
          visitors daily from UAE, Saudi Arabia, Bahrain, Kuwait, Oman, Qatar,
          and more.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">Our Offerings</h2>
        <p className="mb-4">
          JobsConnect provides job seekers with a variety of services to enhance
          their job search experience. Users can browse through listed jobs,
          apply online, and register to be contacted by recruiters for relevant
          opportunities. For employers, we offer a comprehensive suite of
          products including Resume Database Access, Job Postings, and Response
          Management Tools. Our platform boasts a diverse database of CVs
          spanning industries such as Construction, Banking, Oil & Gas, IT
          (Software and Hardware), Hospitality, Healthcare, Education, Telecom,
          Petrochemicals, Logistics, and more.
        </p>

        <p>
          At JobsConnect, we continually assess the needs of our users and
          leverage technology to develop solutions that optimize job search and
          recruitment processes. Join us and experience the future of job
          searching and talent acquisition in the Gulf region.
        </p>
      </div>
    </div>
  );
};

export default About;
