"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumb() {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((item) => item !== ""); // Filter out empty strings
  const breadCrumbs = pathArray.map((item, index) => {
    let label = item;
    label = label.replace(/-/g, " "); // Replace '-' with whitespace
    const link = `/${pathArray.slice(0, index + 1).join("/")}/`;
    return { label, link };
  });

  return (
    <div className="bg-red">
      {/* <p>Current pathname: {pathname}</p> */}
      <ul className="flex md:gap-2">
        <li className="flex items-center whitespace-normal break-words text-sm">
          <Link
            href="/"
            className="capitalize hover:text-slate-600 hover:underline"
          >
            Home
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 md:mx-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </li>

        {breadCrumbs.map((crumb, index) => (
          <li
            key={crumb.link}
            className="flex items-center whitespace-normal break-words text-sm"
          >
            {index !== breadCrumbs.length - 1 && (
              <Link
                href={crumb.link}
                className={cn(
                  "capitalize",
                  index === 0 ? "hover:text-slate-600 hover:underline" : "",
                )}
              >
                {crumb.label}
              </Link>
            )}
            {index === breadCrumbs.length - 1 && (
              <span className="capitalize">{crumb.label}</span>
            )}
            {index !== breadCrumbs.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:mx-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
