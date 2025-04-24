"use client";
import { useState } from "react";
import Image from "next/image";
import { Check, ChevronRightIcon } from "lucide-react";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const monthlyPlans = [
    {
      title: "Basic",
      summary: "A starter package for individual use.",
      features: [
        "Up to 10GB of storage",
        "Basic support",
        "Access to community forums",
      ],
      buttonText: "Choose Basic",
      link: "/plans/basic-monthly",
    },
    {
      title: "Professional",
      summary: "For professionals looking for more capabilities.",
      features: [
        "Up to 100GB of storage",
        "Priority support",
        "Access to analytics tools",
      ],
      buttonText: "Choose Professional",
      link: "/plans/professional-monthly",
      isPopular: true,
    },
    {
      title: "Enterprise",
      summary: "Our most comprehensive plan for large teams.",
      features: [
        "Unlimited storage",
        "24/7 dedicated support",
        "Custom integrations and analytics",
      ],
      buttonText: "Choose Enterprise",
      link: "/plans/enterprise-monthly",
    },
  ];

  const yearlyPlans = [
    {
      title: "Basic",
      summary: "A starter package for individual use, billed annually.",
      features: [
        "Up to 10GB of storage",
        "Basic support",
        "Access to community forums",
      ],
      buttonText: "Choose Basic",
      link: "/plans/basic-yearly",
    },
    {
      title: "Professional",
      summary:
        "For professionals looking for more capabilities, billed annually.",
      features: [
        "Up to 100GB of storage",
        "Priority support",
        "Access to analytics tools",
      ],
      buttonText: "Choose Professional",
      link: "/plans/professional-yearly",
      isPopular: true,
    },
    {
      title: "Enterprise",
      summary: "Our most comprehensive plan for large teams, billed annually.",
      features: [
        "Unlimited storage",
        "24/7 dedicated support",
        "Custom integrations and analytics",
      ],
      buttonText: "Choose Enterprise",
      link: "/plans/enterprise-yearly",
    },
  ];

  return (
    <section className="py-12">
      <div className="">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-700">Plans for all sizes</h2>
          <p className="my-4 text-md text-slate-600">
            Simple, transparent pricing that scales with your needs.
          </p>
        </div>
        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => setIsMonthly(true)}
            className={`rounded-lg px-4 py-2 font-semibold ${isMonthly ? "bg-primary text-white" : "bg-white shadow-md"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsMonthly(false)}
            className={`rounded-lg px-4 py-2 font-semibold ${!isMonthly ? "bg-primary text-white" : "bg-white shadow-md"}`}
          >
            Yearly
          </button>
        </div>
        <div className="grid gap-10 md:grid-cols-3 bg-slate-100 p-6">
          {(isMonthly ? monthlyPlans : yearlyPlans).map((plan, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-500 ease-in-out ${plan.isPopular ? "scale-105" : ""} hover:scale-[1.06]`}
            >
              <div className="p-6">
                <h3 className="mb-2 text-lg font-bold">{plan.title}</h3>
                <p className="mb-4 text-gray-700">{plan.summary}</p>
                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <a
                    href={plan.link}
                    className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white transition-colors duration-200 ease-in-out hover:bg-[#46bba2]"
                  >
                    {plan.buttonText}
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="mt-12 text-center">
          <a
            href="/pricing"
            className="inline-flex items-center rounded-lg bg-[#46bba2] px-6 py-3 text-white transition-colors duration-200 ease-in-out hover:bg-primary"
          >
            Pricing details
            <ChevronRightIcon className="ml-2 h-5 w-5" />
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default Pricing;
