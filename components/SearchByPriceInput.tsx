"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

function SearchByPriceInput() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set("price", e.target.value);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative w-full sm:w-80 lg:w-72">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0-6v2m0 16v2m10-10h-2M4 12H2"
        />
      </svg>

      <input
        type="number"
        defaultValue={searchParams.get("price") ?? ""}
        onChange={handleChange}
        placeholder="Maximum price..."
        className="
        h-11
        w-full
        rounded-xl
        border
        border-gray-200
        bg-white
        pl-11
        pr-4
        text-sm
        text-gray-700
        placeholder:text-gray-400
        shadow-sm
        transition-all
        duration-200
        [appearance:textfield]
        focus:border-black
        focus:outline-none
        focus:ring-4
        focus:ring-gray-100
        [&::-webkit-inner-spin-button]:appearance-none
        [&::-webkit-outer-spin-button]:appearance-none
      "
      />
    </div>
  );
}

export default SearchByPriceInput;
