import SignupMessage from "@/components/auth/SignupMessage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-full justify-center bg-[url('/auth/ladylogin.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-full w-full flex-1 bg-[rgba(64,64,64,0.5)] p-8 flex items-center">
        <MaxWidthWrapper className="items-stretch justify-between gap-8 max-md:space-y-8 md:flex">
          <div className="basis-1/2 flex items-center">
            <SignupMessage />
          </div>
          <div className="flex basis-1/2 flex-col">
            {children}
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default AuthLayout;
