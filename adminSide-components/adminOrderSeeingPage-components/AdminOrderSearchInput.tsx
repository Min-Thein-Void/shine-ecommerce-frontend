"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function AdminOrderSearchInput() {
  const [keyword, setKeyword] = useState<string>("");

  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    setKeyword(searchParams.get("search") ?? "");
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (keyword.trim()) {
        params.set("search", keyword);
      } else {
        params.delete("search");
      }

      router.replace(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [keyword]);

  return (
    <>
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by name, phone, address . . ."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-gray-800 shadow-sm outline-none transition-all duration-200 placeholder:font-normal placeholder:text-gray-400 hover:border-gray-300 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
        />
      </div>
    </>
  );
}

export default AdminOrderSearchInput;
