"use client";

import { FC, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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

  const pathname = usePathname();

  const handleNext = () => {
    router.push(`${pathname}/?page=${Number(page) + 1}&pageSize=${pageSize}`);
  };
  const handlePrev = () => {
    router.push(`${pathname}/?page=${Number(page) - 1}&pageSize=${pageSize}`);
  };

  return (
    <div className="flex w-full items-center justify-end gap-2">
      <Button
        variant="ghost"
        className="h-12 w-12 rounded-full bg-slate-200"
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
        className="h-12 w-12 rounded-full bg-primary text-white"
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
