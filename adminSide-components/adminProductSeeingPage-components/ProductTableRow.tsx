import { Product } from "@/types/product";

import ProductStockControl from "./ProductStockControl";
import ProductActions from "./ProductAction";

interface ProductTableRowProps {
  product: Product;
  onIncreaseStock: (id: number) => void;
  onDecreaseStock: (id: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductTableRow({
  product,
  onIncreaseStock,
  onDecreaseStock,
  onEdit,
  onDelete,
}: ProductTableRowProps) {
  return (
    <tr className="transition hover:bg-gray-50">
      {/* Image */}
      <td className="px-6 py-5">
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
      <td className="max-w-xs px-6 py-5">
        <p className="font-semibold text-gray-900">
          {product.name}
        </p>

        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
          {product.description || "No description"}
        </p>
      </td>

      {/* Category */}
      <td className="px-6 py-5">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {product.category?.name ?? "Unknown"}
        </span>
      </td>

      {/* Price */}
      <td className="px-6 py-5">
        <span className="font-bold text-gray-900">
          {product.price.toLocaleString()} MMK
        </span>
      </td>

      {/* Stock */}
      <td className="px-6 py-5">
        <ProductStockControl
          stock={product.stock}
          onIncrease={() => onIncreaseStock(product.id)}
          onDecrease={() => onDecreaseStock(product.id)}
        />
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <ProductActions
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product.id)}
        />
      </td>
    </tr>
  );
}