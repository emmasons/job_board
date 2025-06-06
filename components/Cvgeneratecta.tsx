import Link from "next/link";

export default function CvLandingCta() {
  return (
    <section className="pb-5 md:pb-8 pt-5">
      <div >
        <div
          className="relative overflow-hidden  shadow-xl bg-gray-900 text-center md:text-left px-6 py-5 md:py-4"
          data-aos="zoom-y-out"
        >

          {/* Content */}
          <div className="md:flex md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-300 md:text-2xl mb-1">
                Land more interviews with an AI-optimized CV
              </h3>
              <p className="text-base md:text-lg text-gray-400">
                Generate a job-specific, tailored resume for a higher success rate.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <Link
                href="/generate-cv"
                className="px-5 py-2 bg-primary/70 hover:bg-primary/80 text-white rounded transition"
                >
                → Generate CV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
