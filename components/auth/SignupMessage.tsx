import { Logo } from "@/components/navbar/Logo";
import Link from "next/link";

const SignupMessage = () => {
  return (
    <div className="flex w-auto flex-col justify-center gap-4 text-white max-md:items-center">
      <Link href="/">
        <span className="inline-flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white ">
          <Logo />
        </span>
      </Link>

      <div className="mb-8">
        <h1 className="text-[2rem] font-bold max-md:text-center">
          Join 40,000+ companies hiring on jobsconnect.com
        </h1>
        <p className="text-xl max-md:text-center">No credit card required.</p>
      </div>
      <h2 className="text-2xl">Our hiring platform helps you to:</h2>
      <ul className="mt-2 list-inside list-disc space-y-2 max-md:text-[0.8rem]">
        <li>Post jobs easily across locations.</li>
        <li>Reach 10 million+ monthly visitors.</li>
        <li>Hire faster with AI-powered screening.</li>
        <li>Create professional jobs with our smart job builder.</li>
        <li>Get local and responsive customer support.</li>
      </ul>
    </div>
  );
};

export default SignupMessage;
