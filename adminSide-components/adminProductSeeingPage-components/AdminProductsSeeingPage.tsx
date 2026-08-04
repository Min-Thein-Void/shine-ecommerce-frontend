"use client";

import { Dispatch, SetStateAction } from "react";

import { AdminPage } from "@/types/admin";
import { Product } from "@/types/product";

import ProductsPagePagination from "../../component-of-product/ProductsPagePagination";
import { useAdminProducts } from "@/hooks/useAdminProducts";
import ProductLoading from "./ProductLoading";
import ProductTable from "./ProductTable";
import AdminProductHeader from "./AdminProductHeader";

interface AdminProductsSeeingPageProps {
  setEditingProduct: Dispatch<SetStateAction<Product | null>>;

  setActivePage: Dispatch<SetStateAction<AdminPage>>;
}

export default function AdminProductsSeeingPage({
  setEditingProduct,
  setActivePage,
}: AdminProductsSeeingPageProps) {
  const {
    products,
    loading,
    meta,
    handlePageChange,
    increaseStockHandler,
    decreaseStockHandler,
    deleteProductHandler,
  } = useAdminProducts();

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setActivePage("create");
  };

  return (
    <div>
      <AdminProductHeader total={products.length} />

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
            <ProductLoading />
          ) : (
            <ProductTable
              products={products}
              onIncreaseStock={increaseStockHandler}
              onDecreaseStock={decreaseStockHandler}
              onEdit={handleEditProduct}
              onDelete={deleteProductHandler}
            />
          )}

          {!loading && meta && (
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
