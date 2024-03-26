"use client";
import { CheckboxGroupForm } from "./checkbox-group-form";
import { useSearchParams } from "next/navigation";

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
];

const FilterByCity = () => {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");

  const defaultValues = [];

  if (city) {
    const values = city.split(",");
    defaultValues.push(...values);
  }

  return (
    <div className="text-left">
      <h3 className="font-bold mb-2">Filter by City</h3>
      <CheckboxGroupForm
        items={items}
        defaultValues={defaultValues}
        searchParamLabel="city"
      />
    </div>
  );
};

export default FilterByCity;
