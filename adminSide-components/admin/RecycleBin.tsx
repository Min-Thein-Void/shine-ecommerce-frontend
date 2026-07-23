"use client";

import { useEffect, useState } from "react";
import {
  getDeletedProducts,
  restoreProductById,
} from "@/services/Product/product.service";
import { Product } from "@/types/product";
import { RotateCcw, Trash2 } from "lucide-react";

function RecycleBin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeletedProducts = async () => {
    setLoading(true);

    const data = await getDeletedProducts();

    setProducts(data ?? []);

    setLoading(false);
  };

  useEffect(() => {
    fetchDeletedProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">Loading recycle bin...</div>
    );
  }

  const restoreProductHandler = async (id: number) => {
    const isConfirmed: boolean = confirm(
      "Are you sure want to restore product?",
    );
    if (!isConfirmed) {
      return;
    }
    const res = await restoreProductById(id);
    if (res?.ok) {
      alert("Product restore successful...");
      const data = await getDeletedProducts();
      setProducts(data);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Recycle Bin
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Restore deleted products or permanently remove them.
          </p>
        </div>

        <div
          className="
          rounded-full
          border
          border-red-200
          bg-red-50
          px-5
          py-2
          text-sm
          font-semibold
          text-red-600
        "
        >
          Deleted Products: {products.length}
        </div>
      </div>

      {/* Table */}
      <div
        className="
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white
        shadow-sm
      "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Image
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Price
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="
                  transition
                  hover:bg-gray-50
                "
                >
                  {/* Image */}
                  <td className="px-6 py-5">
                    {product.image ? (
                      <img
                        src={`http://localhost:3100/uploads/${product.image}`}
                        alt={product.name}
                        className="
                        h-16
                        w-16
                        rounded-2xl
                        object-cover
                      "
                      />
                    ) : (
                      <div
                        className="
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gray-100
                        text-xs
                        text-gray-400
                      "
                      >
                        No Image
                      </div>
                    )}
                  </td>

                  {/* Product */}
                  <td className="px-6 py-5">
                    <p className="font-semibold text-gray-900">
                      {product.name}
                    </p>

                    <p
                      className="
                      mt-1
                      max-w-md
                      truncate
                      text-sm
                      text-gray-500
                    "
                    >
                      {product.description || "No description"}
                    </p>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-5">
                    <span
                      className="
                      rounded-full
                      bg-gray-100
                      px-4
                      py-1.5
                      text-sm
                      font-semibold
                      text-gray-700
                    "
                    >
                      {product.price.toLocaleString()} MMK
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-3">
                      {/* Restore */}
                      <button
                        onClick={() => restoreProductHandler(product.id)}
                        title="Restore product"
                        className="
                        rounded-xl
                        border
                        border-green-200
                        bg-green-50
                        p-2.5
                        text-green-600
                        transition
                        hover:bg-green-100
                        active:scale-95
                      "
                      >
                        <RotateCcw size={18} />
                      </button>

                      {/* Permanent Delete */}
                      <button
                        title="Delete permanently"
                        className="
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        p-2.5
                        text-red-600
                        transition
                        hover:bg-red-100
                        active:scale-95
                      "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty */}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <div className="text-5xl">🗑️</div>

                    <h3 className="mt-4 font-semibold text-gray-900">
                      Recycle Bin is Empty
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Deleted products will appear here.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RecycleBin;
