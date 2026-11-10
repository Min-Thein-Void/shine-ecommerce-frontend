
import { Minus, Plus } from "lucide-react";

interface ProductStockControlProps {
  stock: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function ProductStockControl({
  stock,
  onIncrease,
  onDecrease,
}: ProductStockControlProps) {
  return (
    <div className="inline-flex max-w-full items-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={onDecrease}
        disabled={stock <= 0}
        aria-label="Decrease stock"
        className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:size-9"
      >
        <Minus size={16} />
      </button>

      <span
        aria-label={`Stock: ${stock}`}
        className={`min-w-12 shrink-0 rounded-full px-3 py-2 text-center text-sm font-semibold tabular-nums ${
          stock <= 5
            ? "bg-red-50 text-red-600"
            : "bg-green-50 text-green-700"
        }`}
      >
        {stock}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase stock"
        className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white transition hover:bg-gray-700 active:scale-95 sm:size-9"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
