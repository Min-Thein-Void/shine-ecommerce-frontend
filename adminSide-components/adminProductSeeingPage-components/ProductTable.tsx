
import { Package, Tag, Boxes } from "lucide-react";
import { Product } from "@/types/product";
import ProductTableRow from "./ProductTableRow";

interface ProductsTableProps {
  products: Product[];
  onIncreaseStock: (id: number) => void;
  onDecreaseStock: (id: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductsTable({
  products,
  onIncreaseStock,
  onDecreaseStock,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  return (
    <div className="min-w-0 w-full">
      {/* Mobile: Product Cards */}
      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 lg:hidden">
        {products.map((product) => (
          <article
            key={product.id}
            className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="flex items-start gap-3 p-4">
              {/* Product Image */}
              <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                {product.image ? (
                  <img
                    src={`http://localhost:3100/uploads/${product.image}`}
                    alt={product.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <Package className="size-8 text-gray-300" />
                )}
              </div>

              {/* Product Information */}
              <div className="min-w-0 flex-1">
                <h3 className="break-words text-sm font-semibold text-gray-900">
                  {product.name}
                </h3>

                <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                  <Tag size={13} className="shrink-0" />
                  <span className="break-words">
                    {product.category?.name ?? "Uncategorized"}
                  </span>
                </p>

                <p className="mt-2 text-base font-bold text-gray-900">
                  {product.price.toLocaleString()}{" "}
                  <span className="text-xs font-medium text-gray-500">
                    MMK
                  </span>
                </p>
              </div>
            </div>

            {/* Stock Information */}
            <div className="flex items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/70 px-4 py-3">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <Boxes size={16} />
                Stock
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  product.stock <= 0
                    ? "bg-red-50 text-red-600"
                    : product.stock <= 5
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {product.stock} units
              </span>
            </div>

            {/* Existing Actions */}
            <div className="min-w-0 p-2">
              <ProductTableRow
                product={product}
                onIncreaseStock={onIncreaseStock}
                onDecreaseStock={onDecreaseStock}
                onEdit={onEdit}
                onDelete={onDelete}
                mobileActionsOnly
              />
            </div>
          </article>
        ))}

        {!products.length && (
          <div className="col-span-full rounded-xl border border-dashed border-gray-300 px-4 py-12 text-center text-sm text-gray-400">
            No products found
          </div>
        )}
      </div>

      {/* Tablet and Desktop: Table */}
      <div className="hidden w-full overflow-x-auto lg:block">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {[
                "Image",
                "Product",
                "Category",
                "Price",
                "Stock",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className={`whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 xl:px-6 ${
                    heading === "Actions" ? "text-center" : "text-left"
                  }`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                onIncreaseStock={onIncreaseStock}
                onDecreaseStock={onDecreaseStock}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {!products.length && (
              <tr>
                <td
                  colSpan={6}
                  className="py-16 text-center text-gray-400"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
