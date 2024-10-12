import { Logo } from "@/components/navbar/Logo";

const SignupMessage = () => {
  return (
    <div className="flex w-auto md:w-1/3 flex-col justify-center text-white">
      <span className="inline-flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white ">
        <Logo />
      </span>
      <div className="mb-8">
        <h1 className="text-[2rem] font-bold">
          Join 40,000+ companies hiring on jobsconnect.com
        </h1>
        <p className="text-xl">No credit card required.</p>
      </div>
      <h2 className="text-2xl">Our hiring platform helps you to:</h2>
      <ul className="mt-2 list-inside list-disc space-y-2">
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
