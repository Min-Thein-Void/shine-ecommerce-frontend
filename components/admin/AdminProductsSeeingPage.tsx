"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Minus, Pencil, Plus, Trash2 } from "lucide-react";
import {
  decreaseStock,
  destroyProduct,
  getProducts,
  increaseStock,
} from "@/services/product.service";
import { Product } from "@/types/product";
import { AdminPage } from "@/types/admin";

interface AdminProductsSeeingPageProps {
  setEditingProduct: Dispatch<SetStateAction<Product | null>>;
  setActivePage: Dispatch<SetStateAction<AdminPage>>;
}

export default function AdminProductsSeeingPage({
  setEditingProduct,
  setActivePage,
}: AdminProductsSeeingPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const getProductsHandler = async () => {
    setLoading(true);
    const data = await getProducts();
    if (!data) {
      setLoading(false);
    }
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    getProductsHandler();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20">Loading products...</div>;
  }

  const increaseStockHandler = async (productId: number) => {
    const updatedProduct = await increaseStock(productId);
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  };

  const decreaseStockHandler = async (productId: number) => {
    const updatedProduct = await decreaseStock(productId);
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  };

  const editProductHandler = (product: Product) => {
    setEditingProduct(product);
    setActivePage("create");
  };

  const deleteProductHandler = async (id: number) => {
    const isConfirmed = confirm(
      "Are you sure you want to delete this product?",
    );

    if (!isConfirmed) {
      return;
    }
    const res = await destroyProduct(id);
    if (res?.status === 200) {
      alert("Product Delete Successful...");
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>

        <span className="rounded-lg bg-orange-100 px-4 py-2 font-medium text-orange-700">
          Total : {products.length}
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-4 text-left">Image</th>
              <th className="px-5 py-4 text-left">Name</th>
              <th className="px-5 py-4 text-left">Category</th>
              <th className="px-5 py-4 text-left">Price</th>
              <th className="px-5 py-4 text-left">Stock</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="px-5 py-4">
                  {product.image ? (
                    <img
                      src={`http://localhost:3100/uploads/${product.image}`}
                      alt={product.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200 text-sm text-gray-500">
                      No Image
                    </div>
                  )}
                </td>

                <td className="px-5 py-4">
                  <div>
                    <p className="font-semibold">{product.name}</p>

                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">{product?.category?.name ?? "-"}</td>

                <td className="px-5 py-4 font-semibold">${product.price}</td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseStockHandler(product.id)}
                      className="rounded-md bg-gray-200 p-2 transition hover:bg-gray-300"
                    >
                      <Minus size={16} />
                    </button>

                    <span
                      className={`min-w-12.5 rounded-full px-3 py-1 text-center text-sm font-medium ${
                        product.stock <= 5
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {product.stock}
                    </span>

                    <button
                      onClick={() => increaseStockHandler(product.id)}
                      className="rounded-md bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => editProductHandler(product)}
                      className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteProductHandler(product.id)}
                      className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!products.length && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-gray-500">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
