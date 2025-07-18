import { getJobById } from "@/actions/get-job-by-id";
import { db } from "@/lib/db";
import PageWrapper from "./PageWrapper";
import { createAlert, deleteAlert } from "../actions";
import { getCurrentSessionUser } from "@/lib/auth";
import { getUserAlerts } from "@/actions/get-user-alerts";

type Props = {
  params: {
    jobId: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const job = await getJobById(params.jobId);
  return {
    title: job?.title,
    description: job?.description,
  };
}

const page = async (props: Props) => {
  const job = await getJobById(props.params.jobId);
  const user = await getCurrentSessionUser();
  let alert = false;
  if (user) {
    const alerts = await getUserAlerts(user?.id);
    alert = alerts.find((alert) => alert.jobId === props.params.jobId)
      ? true
      : false;
  }

  const userSubscription = await db.subscriptionPlan.findFirst({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: 'desc', 
    },
    include: {
      plan: true, 
    },
  });


  return (
    <PageWrapper
      job={job}
      jobId={props.params.jobId}
      subscription={userSubscription}
      url={`https://talentra.io/jobs/${props.params.jobId}`}
      createAlert={createAlert}
      deleteAlert={deleteAlert}
      userId={user?.id}
      alert={alert}
    />
  );
};

export default page;
