"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";
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
import ProductsPagePagination from "../ProductsPagePagination";

interface AdminProductsSeeingPageProps {
  setEditingProduct: Dispatch<SetStateAction<Product | null>>;
  setActivePage: Dispatch<SetStateAction<AdminPage>>;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminProductsSeeingPage({
  setEditingProduct,
  setActivePage,
}: AdminProductsSeeingPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<Meta | null>(null);

  // Product list ကို Backend ကနေယူတဲ့ function
  // page မပို့ရင် default အနေနဲ့ Page 1 ကိုယူမယ်
  const getProductsHandler = async (page: number = 1) => {
    // Loading စတင်မယ်
    setLoading(true);

    // Backend ကို Page Number ပို့ပြီး Product Data ယူမယ်
    const response = await getProducts(page);

    // Response ထဲက Product List ကို ခွဲထုတ်မယ်
    const productsData: Product[] = response.data;

    // Product Data မရှိရင် Loading ပိတ်မယ်
    if (!productsData) {
      setLoading(false);
    }

    // Pagination Information (page, totalPages...) ကို State ထဲသိမ်းမယ်
    setMeta(response.meta);

    // Product List ကို State ထဲသိမ်းမယ်
    // UI က ဒီ State ကိုကြည့်ပြီး Product Table ကို Render လုပ်မယ်
    setProducts(productsData);

    // Data ရပြီးလို့ Loading ပိတ်မယ်
    setLoading(false);
  };

  // Pagination Component က Page Number အသစ်ပို့လာတဲ့အချိန် Run မယ့် Function
  const handlePageChange = async (page: number) => {
    // User ရွေးတဲ့ Page Number နဲ့ Product အသစ်တွေ Backend ကနေပြန်ယူမယ်
    await getProductsHandler(page);
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

  // const deleteProductHandler = async (id: number) => {
  //   const isConfirmed = confirm(
  //     "Are you sure you want to delete this product?",
  //   );

  //   if (!isConfirmed) {
  //     return;
  //   }
  //   const res = await destroyProduct(id);
  //   if (res?.status === 200) {
  //     alert("Product Delete Successful...");
  //     setProducts((prev) => prev.filter((product) => product.id !== id));
  //   }
  // };

  const deleteProductHandler = async (id: number) => {
    const res = await destroyProduct(id);

    if (res?.status === 200) {
      setProducts((prev) => prev.filter((product) => product.id !== id));

      toast.success("Product deleted successfully");
    } else {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Products
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your store inventory and product information.
          </p>
        </div>

        <div className="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm font-semibold text-gray-700">
          Total Products: <span className="text-black">{products.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Image
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Stock
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="transition hover:bg-gray-50">
                  {/* Image */}
                  <td className="px-6 py-5">
                    {product.image ? (
                      <img
                        src={`http://localhost:3100/uploads/${product.image}`}
                        alt={product.name}
                        className="h-16 w-16 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </td>

                  {/* Product */}
                  <td className="max-w-xs px-6 py-5">
                    <p className="font-semibold text-gray-900">
                      {product.name}
                    </p>

                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                      {product.description || "No description"}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-5">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {product?.category?.name ?? "Unknown"}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-5">
                    <span className="font-bold text-gray-900">
                      {product.price.toLocaleString()} MMK
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseStockHandler(product.id)}
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 active:scale-95"
                      >
                        <Minus size={16} />
                      </button>

                      <span
                        className={`min-w-12 rounded-full px-3 py-1 text-center text-sm font-semibold ${
                          product.stock <= 5
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.stock}
                      </span>

                      <button
                        onClick={() => increaseStockHandler(product.id)}
                        className="rounded-lg bg-black p-2 text-white transition hover:bg-gray-800 active:scale-95"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => editProductHandler(product)}
                        className="rounded-xl border border-gray-200 p-2.5 text-gray-700 transition hover:bg-gray-100 active:scale-95"
                      >
                        <Pencil size={17} />
                      </button>

                      <AlertDialog>
                        <AlertDialogTrigger
                          className="
                            rounded-xl
                            border
                            border-red-200
                            p-2.5
                            text-red-600
                            transition
                            hover:bg-red-50
                            active:scale-95
                          "
                        >
                          <Trash2 size={17} />
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Product?</AlertDialogTitle>

                            <AlertDialogDescription>
                              This product will be moved to recycle bin. You can
                              restore it later.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>

                            <AlertDialogAction
                              onClick={() => deleteProductHandler(product.id)}
                              className="
                                bg-red-600
                                hover:bg-red-700
                              "
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}

              {!products.length && (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-400">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {meta && (
            <ProductsPagePagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
