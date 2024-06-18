import Hero from "@/components/index/Hero";
import JobsByCountry from "@/components/index/JobsByCountry";
import News from "@/components/index/News";
import Partners from "@/components/index/Partners";
import PopularJobs from "@/components/index/PopularJobs";
import PopularSearches from "@/components/index/PopularSearches";
import Services from "@/components/index/Services";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <main>
      <Hero />
      <MaxWidthWrapper className="py-2">
        <PopularJobs />
      </MaxWidthWrapper>
      <MaxWidthWrapper className="py-24">
        <Services />
      </MaxWidthWrapper>
      <div className="bg-slate-100">
        <MaxWidthWrapper className="py-24">
          <Partners />
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper className="py-24">
        <JobsByCountry />
      </MaxWidthWrapper>
      <div className="bg-sky-50">
        <MaxWidthWrapper className="py-24">
          <News />
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper className="py-24">
        <PopularSearches />
      </MaxWidthWrapper>
    </main>
  );
}
