import { FolderOpen } from "lucide-react";

type Props = {
  dataTitle: string;
  link?: string;
};

const NoDataWrapper = ({ dataTitle }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="p-12 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
        <h2 className="text-2xl font-bold">
          <div className="gap-2 rounded-full">
            <FolderOpen className="text-pes-red h-8 w-8" />
          </div>
        </h2>
        <p className="text-pes-blue font-semibold text-muted-foreground">
          No {dataTitle} found.
        </p>
      </div>
    </div>
  );
};

export default NoDataWrapper;
