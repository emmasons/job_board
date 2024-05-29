import Hero from "@/components/index/Hero";
import JobsByCountry from "@/components/index/JobsByCountry";
import News from "@/components/index/News";
import Partners from "@/components/index/Partners";
import PopularSearches from "@/components/index/PopularSearches";
import Services from "@/components/index/Services";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <main>
      <Hero />
      <MaxWidthWrapper className="py-24">
        <Services />
      </MaxWidthWrapper>
      <MaxWidthWrapper className="py-24">
        <Partners />
      </MaxWidthWrapper>
      <MaxWidthWrapper className="py-24">
        <JobsByCountry />
      </MaxWidthWrapper>
      <MaxWidthWrapper className="py-24">
        <News />
      </MaxWidthWrapper>
      <MaxWidthWrapper className="py-24">
        <PopularSearches />
      </MaxWidthWrapper>
    </main>
  );
}
