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
    <div className="flex items-center gap-3">
      <button
        onClick={onDecrease}
        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 active:scale-95"
      >
        <Minus size={16} />
      </button>

      <span
        className={`min-w-12 rounded-full px-3 py-1 text-center text-sm font-semibold ${
          stock <= 5
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-700"
        }`}
      >
        {stock}
      </span>

      <button
        onClick={onIncrease}
        className="rounded-lg bg-black p-2 text-white transition hover:bg-gray-800 active:scale-95"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}