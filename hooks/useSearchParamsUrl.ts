import { useEffect, useState } from "react";
import qs from "query-string";

export const useSearchParamsUrl = (query: object) => {
  const [queryObject, setQueryObject] = useState(query);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const searchParamsObject = Object.entries(query).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );

    const urlPath = qs.stringifyUrl(
      {
        url: "",
        query: searchParamsObject,
      },
      { skipEmptyString: true, skipNull: true },
    );
    setUrl(urlPath);
  }, [query]);

  const updateQuery = (key: string, value: string) => {
    setQueryObject({ ...queryObject, [key]: value });
  };

  return { url, updateQuery };
};
