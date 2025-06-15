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
    <section
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #0F75B9 0%, #1E88E5 50%, #42A5F5 100%)`,
      }}
    >
      {/* Floating decorative circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-20 w-4 h-4 bg-white bg-opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-32 w-6 h-6 bg-white bg-opacity-20 rounded-full animate-bounce"></div>
        <div className="absolute top-48 left-64 w-3 h-3 bg-white bg-opacity-40 rounded-full"></div>
        <div className="absolute top-16 right-10 w-5 h-5 bg-white bg-opacity-25 rounded-full"></div>
        <div className="absolute bottom-24 right-32 w-4 h-4 bg-white bg-opacity-35 rounded-full animate-ping"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div className="text-white text-center md:text-left">
            

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Build the Perfect Cover Letter <br className="hidden lg:inline" />
              in Minutes with AI
            </h1>

            {/* Description */}
            <p className="text-lg text-white text-opacity-90 max-w-xl mx-auto md:mx-0 mb-10">
              Let Talentra.io craft a powerful cover letter tailored to your job goals. Our AI uses proven strategies and elegant templates to deliver personalized letters that stand out.
            </p>

            {/* CTA */}
            <div>
              <Link href="/generate-cover-letter" passHref>
                <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
                  → Build My Cover Letter
                </button>
              </Link>
            </div>
          </div>

          {/* Right - Decorative Image */}
          <div className="flex justify-center md:justify-end">
            <div className="transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <Image
                src="/templates/polish.jpg"
                alt="AI Cover Letter Example"
                width={400}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <PageIllustration />
    </section>
  );
}
