import { getJobById } from "@/actions/get-job-by-id";
import React from "react";

import PageWrapper from "./PageWrapper";

type Props = {
  params: {
    jobId: string;
  };
};

const page = async (props: Props) => {
  const job = await getJobById(props.params.jobId);
  return <PageWrapper job={job} jobId={props.params.jobId} />;
};

export default page;
