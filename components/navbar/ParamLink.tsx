"use client";
import qs from "query-string";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter, usePathname } from "next/navigation";
type Props = {
  value: string;
  searchParamLabel: string;
  displayText: string;
};

const ParamLink = ({ value, searchParamLabel, displayText }: Props) => {
  const { query } = useQueryParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    query[searchParamLabel] = value;

    const searchParamsObject = Object.entries(query).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: searchParamsObject,
      },
      { skipEmptyString: true, skipNull: true },
    );

    window.location.href = url;
  };
  return (
    <div
      onClick={handleClick}
      className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
    >
      {displayText}
    </div>
  );
};

export default ParamLink;
