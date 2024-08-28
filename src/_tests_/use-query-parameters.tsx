import { useState } from "react";
import useQueryParameters from "@/dist/index";

export default function Component() {
  const [filters, setFilters] = useState({
    name: "",
    age: "",
  });

  useQueryParameters(
    {
      name: filters.name,
      age: filters.age,
    },
    {
      name: (val) => setFilters((prev) => ({ ...prev, name: val })),
      age: (val) => {
        // Only set the age if it's a number that's coming in from the URL

        if (!isNaN(parseInt(val))) {
          setFilters((prev) => ({ ...prev, age: val }));
        }
      },
    }
  );

  return null;
}
