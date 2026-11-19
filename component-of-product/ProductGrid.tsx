import { Product } from "@/types/product";
import Link from "next/link";

type ProductGridProps = {
  products: Product[];
};

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => {
        const averageRating =
          product.reviews && product.reviews.length > 0
            ? (
                product.reviews.reduce(
                  (sum, review) => sum + Number(review.rating),
                  0,
                ) / product.reviews.length
              ).toFixed(1)
            : null;

        return (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60 sm:rounded-2xl"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-slate-50">
              {product.image ? (
                <img
                  src={`http://localhost:3100/uploads/${product.image}`}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-slate-400">
                  No Image
                </div>
              )}

              {/* Category */}
              <div className="absolute left-1.5 top-1.5 sm:left-3 sm:top-3">
                <span className="block max-w-22.5 truncate rounded-md border border-slate-100 bg-white/95 px-1.5 py-1 text-[9px] font-semibold text-slate-600 shadow-sm backdrop-blur sm:max-w-32.5 sm:rounded-lg sm:px-2.5 sm:text-xs">
                  {product.category?.name || "Uncategorized"}
                </span>
              </div>

              {/* Stock Badge */}
              {product.stock === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/30">
                  <span className="rounded-full bg-white px-2 py-1 text-[9px] font-bold text-slate-700 shadow-sm sm:px-3 sm:text-xs">
                    SOLD OUT
                  </span>
                </div>
              )}
            </div>

            {/* Product Content */}
            <div className="space-y-2 p-2 sm:space-y-3 sm:p-4">
              {/* Name & Description */}
              <div className="min-w-0">
                <h2 className="truncate text-[11px] font-bold text-slate-800 sm:text-base">
                  {product.name}
                </h2>

                <p className="mt-1 hidden line-clamp-2 text-xs leading-5 text-slate-500 sm:block">
                  {product.description || "No description available."}
                </p>
              </div>

              {/* Rating */}
              <div className="flex min-w-0 items-center gap-1">
                {averageRating ? (
                  <>
                    <span className="text-[10px] text-amber-500 sm:text-sm">
                      ★
                    </span>
                    <span className="text-[10px] font-semibold text-slate-700 sm:text-xs">
                      {averageRating}
                    </span>
                    <span className="hidden text-xs text-slate-400 sm:inline">
                      ({product.reviews?.length})
                    </span>
                  </>
                ) : (
                  <span className="truncate text-[9px] text-slate-400 sm:text-xs">
                    No reviews
                  </span>
                )}
              </div>

              {/* Stock */}
              <div>
                <span
                  className={`inline-block max-w-full truncate rounded-full px-1.5 py-1 text-[8px] font-semibold sm:px-2.5 sm:text-[10px] ${
                    product.stock > 10
                      ? "bg-emerald-50 text-emerald-700"
                      : product.stock > 0
                        ? "bg-amber-50 text-amber-700"
                        : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>

              {/* Price */}
              <div className="border-t border-slate-100 pt-2 sm:pt-3">
                <p className="truncate text-[10px] font-extrabold text-blue-700 sm:text-lg">
                  {product.price.toLocaleString()}
                  <span className="ml-0.5 text-[8px] font-semibold text-slate-500 sm:ml-1 sm:text-xs">
                    MMK
                  </span>
                </p>

                <div className="mt-2 hidden sm:block">
                  <span className="block rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-semibold text-white transition group-hover:bg-blue-700">
                    View Product
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductGrid;
