"use client";
import qs from "query-string";
import { useRouter, usePathname } from "next/navigation";
import useQueryParams from "@/hooks/useQueryParams";
import { XCircle } from "lucide-react";
import { useState } from "react";

type Props = {};

const RemoveSearchParam = (props: Props) => {
  const { query, removeParam } = useQueryParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleRemoveParam = (key) => {
    removeParam(key);
    const newQuery = { ...query };
    delete newQuery[key];

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: newQuery,
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  };

  return (
    <div className="flex gap-2 overflow-x-auto">
      {Object.entries(query).map(([key, value]) => (
        <div key={key} className="bg-orange-100 p-1">
          <span className="flex items-center gap-2">
            {value}
            <button
              onClick={() => handleRemoveParam(key)}
              className="hover:text-red-600"
            >
              <XCircle className="h-4 w-4" />
            </button>
          </span>
        </div>
      ))}
    </div>
  );
};

export default RemoveSearchParam;
