import { Logo } from "@/components/navbar/Logo";

const SignupMessage = () => {
  return (
    <div className="flex w-auto flex-col justify-center text-white">
      <span className="inline-flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white ">
        <Logo />
      </span>
      <div className="mb-8">
        <h1 className="text-[2rem] font-bold max-md:text-[1.5rem]">
          Join 40,000+ companies hiring on talentra.io
        </h1>
        <p className="text-sm">No credit card required.</p>
      </div>
      <h2 className="text-xl font-semibold max-md:text-[1rem]">
        Our hiring platform helps you to:
      </h2>
      <ul className="mt-2 list-inside list-disc space-y-2 max-md:space-y-1 max-md:text-sm">
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
