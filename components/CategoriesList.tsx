"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";

function CategoriesList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { categories } = useCategories();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      params.set("categoryId", e.target.value);
    } else {
      params.delete("categoryId");
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <select
      value={searchParams.get("categoryId") ?? ""}
      onChange={handleChange}
      className="border rounded px-3 py-2"
    >
      <option value="">All Categories</option>

      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

export default CategoriesList;
