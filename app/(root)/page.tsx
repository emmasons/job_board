import Hero from "@/components/index/Hero";
import News from "@/components/index/News";
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
        <News />
      </MaxWidthWrapper>
    </main>
  );
}
