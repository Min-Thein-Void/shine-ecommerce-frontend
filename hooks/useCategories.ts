"use client";

import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("http://localhost:3100/category/all");
        const data = await res.json();

        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
  };
}
