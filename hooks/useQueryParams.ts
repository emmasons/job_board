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

  return { getParam, setParam, query };
};

export default useQueryParams;
