import Image from "next/image";
import Link from "next/link";
import Stripes from "@/public/images/stripes-dark.svg";

export default function VisaLandingCta({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gray-900"
          data-aos="zoom-y-out"
        >
          {/* Glow */}
          <div
            className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
            aria-hidden="true"
          >
            <div className="h-56 w-[480px] rounded-full border-[20px] border-blue-500 blur-3xl" />
          </div>

          {/* Stripes illustration */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform"
            aria-hidden="true"
          >
            <Image
              className="max-w-none"
              src={Stripes}
              width={768}
              height={432}
              alt="Stripes"
            />
          </div>

          <div className="px-4 py-12 md:px-12 md:py-20">
            <h2 className="mb-6 text-2xl font-bold text-gray-200 md:mb-12 md:text-4xl">
              Instantly Check Your Visa Eligibility with AI
            </h2>
            <p className="mb-8 text-lg text-gray-400 md:text-xl">
              Find out if you're eligible for top visa programs like Canada, UK, and Australia — no paperwork needed.
            </p>
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                <button
                onClick={onOpenModal}
                className="px-4 py-2 bg-primary/70 text-white rounded hover:bg-primary/80 transition"
                >
                → Check My Eligibility
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
