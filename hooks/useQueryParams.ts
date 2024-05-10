import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
const useQueryParams = () => {
  const [query, setQuery] = useState({});
  const searchParams = useSearchParams();

  useEffect(() => {
    const newQuery = Object.fromEntries(searchParams.entries());
    setQuery(newQuery);
  }, [searchParams]);

  const getParam = (paramName) => {
    return searchParams.get(paramName);
  };

  const setParam = (paramName, paramValue) => {
    // set param logic
    setQuery((prevQuery) => ({
      ...prevQuery,
      [paramName]: paramValue,
    }));
  };

  const removeParam = (paramName) => {
    setQuery((prevQuery) => {
      const newQuery = { ...prevQuery };
      delete newQuery[paramName];
      return newQuery;
    });
  };

  return { getParam, setParam, query, removeParam };
};

export default useQueryParams;
