"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import qs from "query-string";
import PublicationDateSearchForm from "./PublicationDateSearchForm";
import useQueryParams from "@/hooks/useQueryParams";

type Props = {};
const PublicationDateSearch = (props: Props) => {
  const { query, getParam } = useQueryParams();
  const publicationDateFilter = getParam("publicationDateFilter");

  const router = useRouter();
  const pathname = usePathname();

  const [publicationDate, setPublicationDate] = useState(publicationDateFilter);
  const dataHandler = (data) => {
    setPublicationDate(data.publicationDate);
  };

  useEffect(() => {
    query["publicationDateFilter"] = publicationDate;

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

    if (publicationDate) router.push(url);
  }, [pathname, router, publicationDate, query]);

  return (
    <div>
      <PublicationDateSearchForm
        publicationDate={publicationDate}
        dataHandler={dataHandler}
      />
    </div>
  );
};

export default PublicationDateSearch;
