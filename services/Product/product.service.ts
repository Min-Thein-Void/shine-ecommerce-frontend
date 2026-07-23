import { ProductFormData } from "@/types/productFormData";
import { ProductResponse } from "@/types/ProductResponse";

// Backend က Product List ကို Filter နဲ့ Pagination ပါပြီးယူမယ့် Function
export async function getProductsWithQuery(filters: {
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

// Backend ka products data tay ko u tar
export async function getProducts(page: number = 1) {
  try {
    const res = await fetch(`http://localhost:3100/product?page=${page}`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

// Backend ka product (only one by ID) ko u tar
export async function getProduct(productId: number | undefined) {
  try {
    const res = await fetch(`http://localhost:3100/product/${productId}`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

// Product create lote tae api
export async function createProduct(productData: ProductFormData) {
  const data = buildFormData(productData);
  const res = await fetch("http://localhost:3100/product/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: data,
  });
  return res;
}

// Product Edit api
export async function editProduct(
  id: number | undefined,
  productData: ProductFormData,
) {
  const data = buildFormData(productData);

  const res = await fetch(`http://localhost:3100/product/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: data,
  });

  return res;
}

//product create lote yin lo tae formData
export function buildFormData(formData: ProductFormData) {
  const data = new FormData();

  data.append("name", formData.name);
  data.append("description", formData.description);
  data.append("price", formData.price);
  data.append("categoryId", formData.categoryId);
  data.append("stock", formData.stock);

  if (formData.image) {
    data.append("image", formData.image);
  }
  return data;
}

//stock toe mal
export async function increaseStock(productId: number) {
  try {
    const res = await fetch(
      `http://localhost:3100/product/${productId}/increase-stock`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          stockCount: 1,
        }),
      },
    );

    const updatedProduct = await res.json();
    console.log(updatedProduct);

    if (!res.ok) {
      throw new Error(updatedProduct.message);
    }

    return updatedProduct;
  } catch (err: any) {
    console.log(err.message);
  }
}

export async function decreaseStock(productId: number) {
  try {
    const res = await fetch(
      `http://localhost:3100/product/${productId}/decrease-stock`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          stockCount: 1,
        }),
      },
    );

    const updatedProduct = await res.json();

    if (!res.ok) {
      throw new Error(updatedProduct.message);
    }

    return updatedProduct;
  } catch (err: any) {
    console.log(err.message);
  }
}

export async function destroyProduct(productId: number) {
  const res = await fetch(`http://localhost:3100/product/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  console.log(res.ok);
  console.log(res.status);

  if (!res.ok) {
    const error = await res.json();
    console.log(error);
    alert("Product delete failed...");
    return;
  }

  return res;
}

export async function getDeletedProducts() {
  try {
    const res = await fetch("http://localhost:3100/product/recycle-bin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function restoreProductById(productId: number) {
  try {
    const res = await fetch(
      `http://localhost:3100/product/${productId}/restore`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (!res.ok) {
      alert("fail to restore product");
    }
    return res;
  } catch (error) {
    console.log(error);
  }
}
