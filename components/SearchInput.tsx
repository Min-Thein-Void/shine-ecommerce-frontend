"use client";

import { useRouter,useSearchParams } from "next/navigation";

function SearchInput() {
  const router = useRouter();

  const searchParams = useSearchParams(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set("search", e.target.value);

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <input
        defaultValue={searchParams.get("search") ?? ""}
        onChange={handleChange}
        placeholder=" search the products..."
        className="w-96 h-8 border-2 border-amber-200 focus:outline-none text-blue-500 p-0.5 rounded-xl"
      />
    </>
  );
}

export default SearchInput;
