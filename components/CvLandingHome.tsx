import Image from "next/image";
import Link from "next/link";
import PageIllustration from "@/components/page-illustration";
import Avatar01 from "@/public/templates/modern.jpg";
import Avatar02 from "@/public/templates/compact.jpg";
import Avatar03 from "@/public/templates/hybrid.jpg";
import Avatar04 from "@/public/templates/elegant.jpg";
import Avatar05 from "@/public/templates/creative.jpg";

export default function HeroHome() {
  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y "
            >
              <div className="-mx-0.5 flex justify-center -space-x-3">
                <Image
                  className="box-content rounded border-2 border-gray-50"
                  src={Avatar01}
                  width={70}
                  height={50}
                  alt="Modern"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar02}
                  width={70}
                  height={50}
                  alt="Compact"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar03}
                  width={70}
                  height={50}
                  alt="Hybrid"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar04}
                  width={70}
                  height={50}
                  alt="Elegant"
                />
                <Image
                  className="box-content rounded border-2 border-gray-50"
                  src={Avatar05}
                  width={70}
                  height={50}
                  alt="Creative"
                />
              </div>
            </div>
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Create a Job-Winning CV <br className="max-lg:hidden" />
              Instantly with AI
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Talentra.io helps you build stunning, personalized CVs in minutes using the power of AI. Choose from modern templates, input your details, and let us craft a CV that gets you hired faster.
              </p>
              <div className="relative before:absolute">
                 <Link href="/generate-cv" passHref>
                 <button
                  className="px-4 py-2 bg-primary/70 text-white rounded hover:bg-primary/80 transition"
                >
                  → Create Now
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
