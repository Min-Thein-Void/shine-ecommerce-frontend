"use client";
import { useRouter, useSearchParams } from "next/navigation";
import ProductsPagePagination from "./ProductsPagePagination";

type Props = {
  currentPage: number;
  totalPages: number;
};

function ProductsPaginationWrapper({ currentPage, totalPages }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(page));

    router.push(`?${params.toString()}`);
  };

  return (
    <ProductsPagePagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}

export default ProductsPaginationWrapper;
