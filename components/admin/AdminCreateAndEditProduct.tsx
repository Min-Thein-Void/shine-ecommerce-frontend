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
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6">
        {editingProduct ? "Edit Product Form" : "Create Product Form"}
      </h1>
      <AdminProductForm editingProduct={editingProduct} />
    </div>
  );
}

export default AdminCreateAndEditProduct;
