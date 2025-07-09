import Image from "next/image";
import PlanetImg from "@/public/images/planet.png";
import PlanetOverlayImg from "@/public/images/planet-overlay.svg";
import TagImg01 from "@/public/images/usa.jpg";
import TagImg02 from "@/public/images/canada.jpg";
import TagImg03 from "@/public/images/uk.jpg";
import TagImg04 from "@/public/images/australia.jpg";

export default function VisaLandingInfo() {
  return (
    <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
            <h2 className="text-3xl font-bold text-gray-200 md:text-4xl">
              Instantly Check Your Visa Eligibility with AI
            </h2>
          </div>

          {/* Planet */}
          <div className="pb-16 md:pb-20" data-aos="zoom-y-out">
            <div className="text-center">
              <div className="relative inline-flex rounded-full before:absolute before:inset-0 before:-z-10 before:scale-[.85] before:animate-[pulse_4s_cubic-bezier(.4,0,.6,1)_infinite] before:bg-linear-to-b before:from-blue-900 before:to-sky-700/50 before:blur-3xl after:absolute after:inset-0 after:rounded-[inherit] after:[background:radial-gradient(closest-side,var(--color-blue-500),transparent)]">
                <Image
                  className="rounded-full bg-gray-900"
                  src={PlanetImg}
                  width={400}
                  height={400}
                  alt="Visa World"
                />
                <div className="pointer-events-none" aria-hidden="true">
                  <Image
                    className="absolute -right-64 -top-20 z-10 max-w-none"
                    src={PlanetOverlayImg}
                    width={789}
                    height={755}
                    alt="Visa decoration"
                  />
                  <div>
                    <Image
                      className="absolute -left-28 top-16 z-10 animate-[float_4s_ease-in-out_infinite_both] opacity-80"
                      src={TagImg01}
                      width={253}
                      height={56}
                      alt="USA"
                    />
                    <Image
                      className="absolute left-56 top-7 z-10 animate-[float_4s_ease-in-out_infinite_1s_both] opacity-30"
                      src={TagImg02}
                      width={241}
                      height={56}
                      alt="Canada"
                    />
                    <Image
                      className="absolute -left-20 bottom-24 z-10 animate-[float_4s_ease-in-out_infinite_2s_both] opacity-25"
                      src={TagImg03}
                      width={243}
                      height={56}
                      alt="UK"
                    />
                    <Image
                      className="absolute bottom-32 left-64 z-10 animate-[float_4s_ease-in-out_infinite_3s_both] opacity-80"
                      src={TagImg04}
                      width={251}
                      height={56}
                      alt="Australia"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 *:relative *:p-6 md:*:p-10">
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <span>AI-Based Evaluation</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Instantly evaluate your visa eligibility based on key criteria like age, profession, education, and experience.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <span>Supports Top Destinations</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Check your chances for countries like the USA, Canada, UK, Germany, and Australia in seconds.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <span>Visa Type Suggestions</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Get suggestions on the best visa categories to apply for based on your background and goals.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <span>Real-Time Results</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                No more waiting—get instant insights and guidance tailored to your input.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <span>Easy to Use</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Simple, user-friendly interface designed for applicants of all levels, no legal jargon involved.
              </p>
            </article>
            <article>
              <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-200">
                <span>Free & Confidential</span>
              </h3>
              <p className="text-[15px] text-gray-400">
                Use the checker at no cost. Your data remains private and secure at all times.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
