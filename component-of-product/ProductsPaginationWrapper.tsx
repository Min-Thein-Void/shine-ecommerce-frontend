"use client"; // ဒီ component ကို Client Side မှာ run မယ် (browser ထဲမှာ run မယ်)

import { useRouter, useSearchParams } from "next/navigation"; // URL ပြောင်းဖို့နဲ့ URL query parameters ဖတ်ဖို့ Next.js hooks
import ProductsPagePagination from "./ProductsPagePagination"; // UI Pagination component ကို import လုပ်မယ်

// Parent component ကနေလက်ခံမယ့် props type
type Props = {
  currentPage: number; // လက်ရှိရောက်နေတဲ့ page number
  totalPages: number; // စုစုပေါင်း page အရေအတွက်
};

// Pagination Logic ကို ထိန်းတဲ့ Wrapper Component
function ProductsPaginationWrapper({ currentPage, totalPages }: Props) {

  // URL ပြောင်းဖို့ router object ယူမယ်
  const router = useRouter();

  // လက်ရှိ URL ထဲက query parameters တွေယူမယ်
  const searchParams = useSearchParams();

  // User က page ပြောင်းတဲ့အချိန် run မယ့် function
  const handlePageChange = (page: number) => {

    // လက်ရှိ URL query တွေကို copy ကူးယူမယ်
    // ဥပမာ
    // ?search=iphone&categoryId=2&page=1
    const params = new URLSearchParams(searchParams);

    // page query ကို အသစ်ပြောင်းမယ်
    // ဥပမာ page=3
    params.set("page", String(page));

    // URL ကို update လုပ်မယ်
    // Browser URL ပြောင်းသွားပြီး Server Component က data အသစ် fetch ပြန်လုပ်မယ်
    router.push(`?${params.toString()}`);
  };

  // Pagination UI Component ကို render လုပ်မယ်
  return (
    <ProductsPagePagination

      // လက်ရှိ page number ပို့မယ်
      currentPage={currentPage}

      // စုစုပေါင်း page အရေအတွက်ပို့မယ်
      totalPages={totalPages}

      // Page ပြောင်းတဲ့ function ကို child component ဆီပို့မယ်
      onPageChange={handlePageChange}
    />
  );
}

// တခြား file တွေက import သုံးနိုင်အောင် export လုပ်မယ်
export default ProductsPaginationWrapper;



// User
//  │
//  │ Click Page 3
//  ▼
// ProductsPagePagination (UI Only)
//  │
//  │ onPageChange(3)
//  ▼
// ProductsPaginationWrapper
//  │
//  │ URL update
//  ▼
// router.push("?page=3")
//  │
//  ▼
// Next.js
//  │
//  ▼
// Server Component Re-render
//  │
//  ▼
// GET /product?page=3
//  │
//  ▼
// NestJS Backend
//  │
//  ▼
// Prisma
//  │
//  ▼
// Return Page 3 Products
//  │
//  ▼
// Products Page Update