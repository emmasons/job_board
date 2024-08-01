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
          Welcome to Jobs Connect, your premier job placement expert
          specializing in connecting talented professionals with top
          opportunities in the Gulf countries, including UAE, Saudi Arabia,
          Kuwait, Oman, and Qatar. As a leading job placement company, we are
          dedicated to providing professional job placement services that cater
          to the unique needs of both job seekers and employers.
        </p>

        <h2 className="mb-4 text-lg font-semibold">Our Offerings</h2>
        <p className="mb-4">
          At Jobs Connect, our comprehensive job placement solutions cover a
          wide range of industries, ensuring that we meet the diverse needs of
          our clients. Whether you are seeking expert job placement advice,
          custom job placement services, or comprehensive job placement support,
          Jobs Connect is here to help.
        </p>

        <p>
          We pride ourselves on being a trusted job placement partner, offering
          top-rated job placement services that are both affordable and of the
          highest quality. Our commitment to job placement service excellence is
          evident in our client-focused approach, ensuring that both employers
          and job seekers receive the best possible outcomes. As a premier job
          placement solutions provider, Jobs Connect is dedicated to driving job
          placement innovation and development. We utilize cutting-edge job
          placement strategies and project management techniques to ensure the
          success of our placements. Our team is always available to provide
          personalized support and consulting, making the job placement process
          seamless and efficient. Join us at Jobs Connect and experience the
          difference of working with a leading job placement company. Let us
          help you navigate the job market in the Gulf countries with confidence
          and ease.
        </p>
      </div>
    </div>
  );
};

export default About;
