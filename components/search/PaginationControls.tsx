"use client";

import { FC, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronRightCircle,
  Loader2,
} from "lucide-react";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  totalPages,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const pageSize = searchParams.get("pageSize") ?? "5";
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    router.push(`/search/?page=${Number(page) + 1}&pageSize=${pageSize}`);
  };
  const handlePrev = () => {
    router.push(`/search/?page=${Number(page) - 1}&pageSize=${pageSize}`);
  };

  return (
    <div className="flex items-center gap-2 w-full justify-end">
      <Button
        variant="ghost"
        className="bg-slate-200 p-1 px-4 py-1 "
        disabled={!hasPrevPage}
        onClick={() => {
          handlePrev();
        }}
      >
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <ChevronLeft className="h-6 w-6" />
        )}
      </Button>

      <div>
        {page} / {totalPages}
      </div>

      <Button
        className="bg-primary px-4 py-1 text-white"
        disabled={!hasNextPage}
        onClick={() => {
          handleNext();
        }}
      >
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <ChevronRight className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default PaginationControls;
