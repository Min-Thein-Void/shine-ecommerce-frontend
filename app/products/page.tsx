import ProductGrid from "@/component-of-product/ProductGrid";
import ProductHeader from "@/component-of-product/ProductHeader";
import ProductsPaginationWrapper from "@/component-of-product/ProductsPaginationWrapper";
import { getProductsWithQuery } from "@/services/Product/product.service";

type ProductsFilterProps = {
  searchParams: Promise<{
    search?: string;
    categoryId?: string;
    price?: string;
    page?: string;
    limit?: string;
  }>;
};

export default async function Page({ searchParams }: ProductsFilterProps) {
  const { search, categoryId, price, page } = await searchParams;

  const response = await getProductsWithQuery({
    search,
    categoryId,
    price,
    page,
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Header */}
      <ProductHeader />

      {/* Products */}
      <ProductGrid products={response.data} />
      <ProductsPaginationWrapper
        currentPage={response.meta.page}
        totalPages={response.meta.totalPages}
      />
    </div>
  );
}
