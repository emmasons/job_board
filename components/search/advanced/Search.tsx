"use client";
import { Button } from "@/components/ui/button";
import { useSearchParamsUrl } from "@/hooks/useSearchParamsUrl";
import useQueryParams from "@/hooks/useQueryParams";
import Link from "next/link";

const Search = () => {
  const { query } = useQueryParams();
  const { url } = useSearchParamsUrl(query);

  console.log(url, "url");

  return (
    <div>
      <Button type="submit">
        <Link href={`/search${url}`}>Search</Link>
      </Button>
    </div>
  );
};

export default Search;
