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
    <div className="relative w-full sm:w-64">
      <select
        value={searchParams.get("categoryId") ?? ""}
        onChange={handleChange}
        className="
        h-11
        w-full
        appearance-none
        rounded-xl
        border
        border-gray-200
        bg-white
        px-4
        pr-10
        text-sm
        font-medium
        text-gray-700
        shadow-sm
        transition-all
        duration-200
        focus:border-black
        focus:outline-none
        focus:ring-4
        focus:ring-gray-100
        cursor-pointer
      "
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

export default CategoriesList;
