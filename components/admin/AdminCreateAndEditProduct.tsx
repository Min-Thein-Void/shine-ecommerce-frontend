"use client";
import AdminProductForm from "./AdminProductForm";
import { Product } from "@/types/product";

interface AdminCreateAndEditProductProps {
  editingProduct: Product | null;
}

function AdminCreateAndEditProduct({
  editingProduct,
}: AdminCreateAndEditProductProps) {
  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {editingProduct ? "Edit Product" : "Create Product"}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {editingProduct
            ? "Update product information and inventory details."
            : "Add a new product to your store catalog."}
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
        <AdminProductForm editingProduct={editingProduct} />
      </div>
    </div>
  );
}

export default AdminCreateAndEditProduct;
