import { PaymentForm } from "@/components/paypal/PaymentForm";
import { getCurrentSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getJobById } from "@/actions/get-job-by-id";
import { env } from "@/lib/env";

interface Params {
  params: {
    jobId: string;
  };
}

const getCreds = async () => {
  const response = await fetch(
    `${env.BASE_DOMAIN}/api/payments/paypal/token/`,
    {
      cache: "no-store",
    },
  );
  const data = await response.json();
  const { token } = data;

  return {
    clientToken: token,
    clientID: env.PAYPAL_CLIENT_ID,
  };
};

export default async function page({ params }: Params) {
  const creds = await getCreds();
  const { clientToken, clientID } = creds;
  const user = await getCurrentSessionUser();
  if (!user) {
    return redirect("/");
  }
  const job = await getJobById(params.jobId);
  return (
    <>
      {creds ? (
        <PaymentForm
          clientToken={clientToken}
          clientID={clientID}
          jobId={params.jobId}
          jobTitle={job.title}
        />
      ) : (
        <p className="text-red-500">
          Something went wrong, contact your administrator.
        </p>
      )}
    </>
  );
}
