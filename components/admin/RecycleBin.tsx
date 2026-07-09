"use client";

import { useEffect, useState } from "react";
import {
  getDeletedProducts,
  restoreProductById,
} from "@/services/product.service";
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
    <div className="min-h-full bg-slate-50">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Recycle Bin</h1>

          <p className="mt-1 text-sm text-slate-500">
            Restore deleted products or permanently remove them
          </p>
        </div>

        <span
          className="
          rounded-full 
          border 
          border-rose-200 
          bg-rose-50 
          px-5 
          py-2 
          text-sm 
          font-medium 
          text-rose-600
        "
        >
          Deleted: {products.length}
        </span>
      </div>

      {/* Table Card */}
      <div
        className="
        overflow-hidden 
        rounded-2xl 
        border 
        border-slate-200 
        bg-white 
        shadow-sm
      "
      >
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Image
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Price
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="
                border-b
                last:border-none
                transition
                hover:bg-slate-50
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
                      rounded-xl
                      border
                      border-slate-200
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
                      rounded-xl
                      bg-slate-100
                      text-xs
                      text-slate-400
                    "
                    >
                      No image
                    </div>
                  )}
                </td>

                {/* Product */}
                <td className="px-6 py-5">
                  <p className="font-semibold text-slate-800">{product.name}</p>

                  <p
                    className="
                  mt-1
                  max-w-md
                  truncate
                  text-sm
                  text-slate-500
                "
                  >
                    {product.description}
                  </p>
                </td>

                {/* Price */}
                <td className="px-6 py-5">
                  <span
                    className="
                    rounded-lg
                    bg-slate-100
                    px-3
                    py-1
                    text-sm
                    font-medium
                    text-slate-700
                  "
                  >
                    ${product.price}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => restoreProductHandler(product.id)}
                      className="
                      rounded-xl
                      border
                      border-emerald-200
                      bg-emerald-50
                      p-2.5
                      text-emerald-600
                      transition
                      hover:bg-emerald-100
                    "
                      title="Restore product"
                    >
                      <RotateCcw size={18} />
                    </button>

                    <button
                      className="
                      rounded-xl
                      border
                      border-rose-200
                      bg-rose-50
                      p-2.5
                      text-rose-500
                      transition
                      hover:bg-rose-100
                    "
                      title="Delete permanently"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="
                  py-16
                  text-center
                  text-slate-400
                "
                >
                  <div className="text-4xl mb-3">🗑️</div>
                  Recycle bin is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecycleBin;
