"use client";

import { useEffect, useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { createProduct, editProduct } from "@/services/product.service";
import { Product } from "@/types/product";

export function useProduct(editingProduct: Product | null) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    stock: "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const isEditMode: boolean = editingProduct !== null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEditMode) {
      const res = await createProduct(formData);
      if (!res.ok) {
        alert("Create Product Failed");
        return;
      }
      alert("Product Created");
    }

    if (isEditMode) {
      const res = await editProduct(editingProduct?.id, formData);
      if (!res.ok) {
        alert("Update Product Failed");
        return;
      }
      alert("Product Updated");
    }
  };

  useEffect(() => {
    if (!editingProduct) return;

    setFormData({
      name: editingProduct.name,
      description: editingProduct.description,
      price: editingProduct.price.toString(),
      categoryId: editingProduct.categoryId.toString(),
      stock: editingProduct.stock.toString(),
      image: null,
    });
  }, [editingProduct]);

  const { categories } = useCategories();

  return {
    formData,
    handleChange,
    handleImageChange,
    handleSubmit,
    categories,
  };
}
