"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  decreaseStock,
  destroyProduct,
  getProducts,
  increaseStock,
} from "@/services/Product/product.service";

import { Product } from "@/types/product";

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<Meta | null>(null);

  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const fetchProducts = async (
    page: number = 1,
    searchValue: string = search,
  ) => {
    try {
      setLoading(true);

      const response = await getProducts(page, searchValue);

      setProducts(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, search);
  }, [search]);

  const handlePageChange = async (page: number) => {
    await fetchProducts(page, search);
  };

  const increaseStockHandler = async (productId: number) => {
    try {
      const updatedProduct = await increaseStock(productId);

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === updatedProduct.id
            ? updatedProduct
            : product,
        ),
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to increase stock");
    }
  };

  const decreaseStockHandler = async (productId: number) => {
    try {
      const updatedProduct = await decreaseStock(productId);

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === updatedProduct.id
            ? updatedProduct
            : product,
        ),
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to decrease stock");
    }
  };

  const deleteProductHandler = async (productId: number) => {
    try {
      const response = await destroyProduct(productId);

      if (response?.status !== 200) {
        throw new Error("Delete failed");
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== productId,
        ),
      );

      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return {
    products,
    loading,
    meta,
    handlePageChange,
    increaseStockHandler,
    decreaseStockHandler,
    deleteProductHandler,
  };
}