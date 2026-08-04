import SearchInput from "@/component-of-search&filter/SearchInput";

interface ProductsHeaderProps {
  total: number
}

export default function AdminProductHeader({
  total
}: ProductsHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Products
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your store inventory and product information.
        </p>
      </div>

      <SearchInput />

      <div className="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm font-semibold text-gray-700">
        Total Products:{" "}
        <span className="text-black">
          {total}
        </span>
      </div>
    </div>
  );
}