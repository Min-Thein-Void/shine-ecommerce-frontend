import { ProductFormData } from "@/types/productFormData";

export async function getProducts(page : number = 1) {
  try {
    const res = await fetch( `http://localhost:3100/product?page=${page}`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: any) {
    console.log(error.message);
  }
}

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

//product create lote tae api
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
    if(!res.ok){
      alert('fail to restore product')
    }
    return res;
  } catch (error) {
    console.log(error);
  }
}
