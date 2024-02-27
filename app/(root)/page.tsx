import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-10 py-5 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <h2 className="text-2xl font-semibold text-primary">
            Infinite Talent Limited Job Board
          </h2>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
