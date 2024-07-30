import ResendEmailForm from "@/components/auth/ResendEmailForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const page = async () => {
  return (
    <MaxWidthWrapper className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-slate-50 p-8 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <ResendEmailForm />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
