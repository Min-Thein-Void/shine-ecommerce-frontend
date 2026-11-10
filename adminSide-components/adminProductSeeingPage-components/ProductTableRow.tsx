
import { Product } from "@/types/product";

import ProductStockControl from "./ProductStockControl";
import ProductActions from "./ProductAction";

interface ProductTableRowProps {
  product: Product;
  onIncreaseStock: (id: number) => void;
  onDecreaseStock: (id: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  mobileActionsOnly?: boolean;
}

export default function ProductTableRow({
  product,
  onIncreaseStock,
  onDecreaseStock,
  onEdit,
  onDelete,
  mobileActionsOnly = false,
}: ProductTableRowProps) {
  const stockControl = (
    <ProductStockControl
      stock={product.stock}
      onIncrease={() => onIncreaseStock(product.id)}
      onDecrease={() => onDecreaseStock(product.id)}
    />
  );

  const actions = (
    <ProductActions
      onEdit={() => onEdit(product)}
      onDelete={() => onDelete(product.id)}
    />
  );

  // Mobile card: render controls only, not a table row.
  if (mobileActionsOnly) {
    return (
      <div className="space-y-3">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs font-medium text-gray-500">
            Manage Stock
          </span>

          <div className="min-w-0">{stockControl}</div>
        </div>

        <div className="flex min-w-0 flex-col gap-2 border-t border-gray-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs font-medium text-gray-500">
            Product Actions
          </span>

          <div className="min-w-0">{actions}</div>
        </div>
      </div>
    );
  }

  // Desktop table row.
  return (
    <tr className="transition hover:bg-gray-50">
      {/* Image */}
      <td className="px-4 py-5 xl:px-6">
        {product.image ? (
          <img
            src={`http://localhost:3100/uploads/${product.image}`}
            alt={product.name}
            className="h-16 w-16 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-xs text-gray-400">
            No Image
          </div>
        )}
      </td>

      {/* Product */}
      <td className="max-w-xs px-4 py-5 xl:px-6">
        <p className="font-semibold text-gray-900">
          {product.name}
        </p>

        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
          {product.description || "No description"}
        </p>
      </td>

      {/* Category */}
      <td className="px-4 py-5 xl:px-6">
        <span className="whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {product.category?.name ?? "Unknown"}
        </span>
      </td>

      {/* Price */}
      <td className="whitespace-nowrap px-4 py-5 xl:px-6">
        <span className="font-bold text-gray-900">
          {product.price.toLocaleString()} MMK
        </span>
      </td>

      {/* Stock */}
      <td className="px-4 py-5 xl:px-6">
        {stockControl}
      </td>

      {/* Actions */}
      <td className="px-4 py-5 text-center xl:px-6">
        {actions}
      </td>
    </tr>
  );
}
