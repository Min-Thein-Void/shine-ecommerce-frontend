"use client"; // ဒီ component ကို browser(client side) မှာ run မယ်

// Next.js router နဲ့ URL query parameter တွေကို အသုံးပြုဖို့ import
import { useRouter, useSearchParams } from "next/navigation";

// React Hooks တွေ import
import { useEffect, useState } from "react";

function SearchInput() {

  // URL ကို ပြောင်းဖို့ router object
  const router = useRouter();

  // လက်ရှိ URL ထဲက query parameters (ဥပမာ ?search=iphone)
  const searchParams = useSearchParams();

  // Input ထဲမှာ ရိုက်နေတဲ့ value ကို သိမ်းထားမယ့် state
  // URL မှာ search ရှိရင် အဲ့ဒီ value ကိုယူ
  // မရှိရင် empty string ("") နဲ့စမယ်
  const [keyword, setKeyword] = useState(
    searchParams.get("search") ?? ""
  );

  // ===================================================
  // URL ပြောင်းသွားတဲ့အချိန် Input value ကို sync လုပ်ပေးမယ်
  // ===================================================
  useEffect(() => {

    // URL ထဲက search value ကို input ထဲပြန်ထည့်
    // Browser Back / Forward နှိပ်တဲ့အချိန်လည်း အလုပ်လုပ်တယ်
    setKeyword(searchParams.get("search") ?? "");

  }, [searchParams]);



  // ===================================================
  // Debounce Search
  // User စာရိုက်ပြီး 500ms ရပ်မှ Search လုပ်မယ်
  // ===================================================
  useEffect(() => {

    // Timer တစ်ခုစမယ်
    const timeout = setTimeout(() => {

      // လက်ရှိ URL query ကို copy ယူ
      const params = new URLSearchParams(searchParams);

      // User ရိုက်ထားတာ empty မဟုတ်ရင်
      if (keyword.trim()) {

        // URL ထဲ search=value ထည့်
        // ဥပမာ
        // ?search=iphone
        params.set("search", keyword);

      } else {

        // Input ကိုဖျက်လိုက်ရင်
        // search parameter ကို URL ထဲက ဖျက်ပစ်
        params.delete("search");
      }

      // URL ကို update လုပ်
      // replace သုံးထားတာကြောင့် browser history မများဘူး
      router.replace(`?${params.toString()}`);

    }, 500); // User ရိုက်ပြီး 500 milliseconds စောင့်

    // User က 500ms မပြည့်ခင် ထပ်ရိုက်ရင်
    // အရင် timer ကို cancel လုပ်
    return () => clearTimeout(timeout);

  }, [keyword]); // keyword ပြောင်းတိုင်း ဒီ effect ပြန် run



  return (
    <div className="relative w-full sm:w-80 lg:w-96">

      {/* Search Icon */}
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

      {/* Search Input */}
      <input

        // Input value ကို keyword state နဲ့ချိတ်ထား
        value={keyword}

        // User ရိုက်တိုင်း keyword state ကို update
        // URL မပြောင်းသေး
        // debounce effect ကပဲ URL ကို update လုပ်မယ်
        onChange={(e) => setKeyword(e.target.value)}

        placeholder="Search for products..."

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


// User စာရိုက်
//         │
//         ▼
// onChange
//         │
//         ▼
// keyword state ပြောင်း
//         │
//         ▼
// useEffect([keyword]) အလုပ်လုပ်
//         │
//         ▼
// 500ms စောင့်
//         │
//    ┌────┴─────┐
//    │User ထပ်ရိုက်?│
//    └────┬─────┘
//         │ Yes
//         ▼
// clearTimeout()
// Timer အသစ်စ
//         │
//         ▼
// User ရပ်သွား
//         │
//         ▼
// router.replace("?search=...")
//         │
//         ▼
// Products Page က searchParams အသစ်ရ
//         │
//         ▼
// Backend Fetch
//         │
//         ▼
// Filtered Products ပြန်ပြ