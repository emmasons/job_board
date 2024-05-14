import { getAllCandidates } from "@/actions/get-all-candidates";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const candidates = await getAllCandidates();
  console.log(candidates, '**');
  return (
    <div>
      {candidates?.map((candidate) => (
        <div key={candidate.id}>{candidate.name}</div>
      ))}
      {candidates && candidates.length === 0 && <div>No candidates found</div>}
    </div>
  );
};

export default page;
