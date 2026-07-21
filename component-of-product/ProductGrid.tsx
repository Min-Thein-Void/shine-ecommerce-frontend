import { Product } from "@/types/products";
import Link from "next/link";

type ProductGridProps = {
  products: Product[];
};

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl"
          >
            {/* Image */}
            <div className="relative overflow-hidden bg-gray-100">
              {product.image ? (
                <img
                  src={`http://localhost:3100/uploads/${product.image}`}
                  alt={product.name}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-64 items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur">
                  {product.category?.name || "Uncategorized"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 p-5">
              <div>
                <h2 className="line-clamp-1 text-lg font-semibold text-gray-900">
                  {product.name}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                  {product.description || "No description available."}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between">
                {averageRating ? (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm font-medium text-gray-700">
                      {averageRating}
                    </span>
                    <span className="text-sm text-gray-400">
                      ({product?.reviews?.length})
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">No reviews yet</span>
                )}

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    product.stock > 10
                      ? "bg-green-100 text-green-700"
                      : product.stock > 0
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-2xl font-bold text-gray-900">
                  {product.price.toLocaleString()} MMK
                </span>

                <span className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition group-hover:bg-gray-800">
                  View
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductGrid;
