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
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-100 bg-gray-50">
          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            Image
          </th>

          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            Product
          </th>

          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            Category
          </th>

          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            Price
          </th>

          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            Stock
          </th>

          <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
            Actions
          </th>
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
  );
}