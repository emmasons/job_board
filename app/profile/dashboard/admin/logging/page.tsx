import UploadProdLogsToCloud from "@/components/dashboard/admin/logging/UploadProdLogsToCloud";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <div className="w-full rounded-md p-4 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          <h1>Logging</h1>
        </div>
        <div className="w-full rounded-md p-4 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          <UploadProdLogsToCloud />
        </div>
      </div>
    </div>
  );
};

export default page;
