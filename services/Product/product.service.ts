import { ProductResponse } from "@/types/ProductResponse";

// Backend က Product List ကို Filter နဲ့ Pagination ပါပြီးယူမယ့် Function
export async function getProducts(filters: {
  // Product Name / Description နဲ့ Search လုပ်ဖို့
  search?: string;

  // Category အလိုက် Filter လုပ်ဖို့
  categoryId?: string;

  // Price နဲ့ Filter လုပ်ဖို့
  price?: string;

  // ဘယ် Page ကိုယူမလဲ
  page?: string;

  // Function က ProductResponse Type ကို Return ပြန်မယ်
}): Promise<ProductResponse> {
  // Backend Product API URL ကိုဖန်တီးမယ်
  const url = new URL("http://localhost:3100/product");

  // Search Value ရှိရင် URL Query ထဲကိုထည့်မယ်
  // ဥပမာ ?search=iphone
  if (filters.search) {
    url.searchParams.set("search", filters.search);
  }

  // Category ရှိရင် URL Query ထဲထည့်မယ်
  // ဥပမာ ?categoryId=2
  if (filters.categoryId) {
    url.searchParams.set("categoryId", filters.categoryId);
  }

  // Price Filter ရှိရင် URL Query ထဲထည့်မယ်
  // ဥပမာ ?price=500000
  if (filters.price) {
    url.searchParams.set("price", filters.price);
  }

  // Page Number ရှိရင် URL Query ထဲထည့်မယ်
  // ဥပမာ ?page=3
  if (filters.page) {
    url.searchParams.set("page", filters.page);
  }

  // အပေါ်က Query Parameters အားလုံးပါတဲ့ URL နဲ့
  // Backend ကို HTTP Request ပို့မယ်
  const res = await fetch(url, {
    // အမြဲ Backend က Data အသစ်ယူမယ်
    // Cache မသုံးဘူး
    cache: "no-store",
  });

  // Backend ကပြန်လာတဲ့ JSON Data ကို Return ပြန်ပေးမယ်
  return res.json();
}
