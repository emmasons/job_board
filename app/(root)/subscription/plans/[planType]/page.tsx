import MaxWidthWrapper from "@/components/MaxWidthWrapper";

type Props = {
  params: {
    planType: string;
  };
};

const PlanPage = ({ params }: Props) => {
  const { planType } = params;
  return <MaxWidthWrapper>{planType}</MaxWidthWrapper>;
};

export default PlanPage;
