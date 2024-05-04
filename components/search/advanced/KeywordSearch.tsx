"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import qs from "query-string";
import KeywordForm from "./KeyWordsForm";
import useQueryParams from "@/hooks/useQueryParams";

const KeywordSearch = () => {
  const { query, getParam } = useQueryParams();

  const title = getParam("title");
  const description = getParam("description");
  const employerName = getParam("employerName");

  const [initialData, setInitialData] = useState({
    title: title || "",
    description: description || "",
    employerName: employerName || "",
  });

  const onChange = (data) => {
    setInitialData(data);
  };

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    Object.entries(initialData).forEach(([key, value]) => {
      query[key] = value;
    });

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
        url: pathname,
        query: searchParamsObject,
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  }, [pathname, router, initialData, query]);

  return (
    <div>
      <KeywordForm initialData={initialData} onChange={onChange} />
    </div>
  );
};

export default KeywordSearch;
