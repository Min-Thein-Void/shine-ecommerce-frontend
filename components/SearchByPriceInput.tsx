'use client'
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
    <>
      <input
        type="number"
        defaultValue={searchParams.get("price") ?? ""}
        onChange={handleChange}
        placeholder="enter expected price range..."
        className="w-96 h-8 border-2 border-amber-200 focus:outline-none text-blue-500 p-0.5 rounded-xl"
      />
    </>
  );
}

export default SearchByPriceInput;
