"use client";

import { useRouter, useSearchParams } from "next/navigation";

function SearchInput() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set("search", e.target.value);

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative w-full sm:w-80 lg:w-96">
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
          d="M21 21l-4.35-4.35M16.65 10.825a5.825 5.825 0 11-11.65 0 5.825 5.825 0 0111.65 0z"
        />
      </svg>

      <input
        defaultValue={searchParams.get("search") ?? ""}
        onChange={handleChange}
        placeholder="Search products..."
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
        focus:border-black
        focus:outline-none
        focus:ring-4
        focus:ring-gray-100
      "
      />
    </div>
  );
}

export default SearchInput;
