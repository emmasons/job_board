import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-primary">Coming soon</h1>
      <div className="text-lg font-bold text-primary">
        Stay tuned for more exciting features
      </div>
    </div>
  );
};

export default page;
