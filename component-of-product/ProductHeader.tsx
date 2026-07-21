import CategoriesList from "@/components/CategoriesList";
import SearchByPriceInput from "@/components/SearchByPriceInput";
import SearchInput from "@/components/SearchInput";

function ProductHeader() {
  return (
    <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Products
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Discover our latest collections.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput />
        <SearchByPriceInput />
        <CategoriesList />
      </div>
    </div>
  );
}

export default ProductHeader;
