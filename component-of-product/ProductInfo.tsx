"use client";
import { useCartStore } from "@/globalStates/useCartStore";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProductInfoProps = {
  product: Product;
};

function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0]?.image || product.image,
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? (
          product.reviews.reduce((sum, review) => sum + review.rating, 0) /
          product.reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
      {/* Image Section */}
      <div className="min-w-0">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:rounded-3xl sm:p-4">
          {selectedImage ? (
            <div className="overflow-hidden rounded-xl bg-slate-50 sm:rounded-2xl">
              <img
                src={`http://localhost:3100/uploads/${selectedImage}`}
                alt={product.name}
                onClick={() => setIsPreviewOpen(true)}
                className="aspect-square w-full cursor-zoom-in object-contain transition duration-500 hover:scale-[1.02] sm:max-h-145"
              />
            </div>
          ) : (
            <div className="flex aspect-square items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-400">
              No Image Available
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {product.images && product.images.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img.image)}
                className={`shrink-0 overflow-hidden rounded-xl border-2 bg-white p-0.5 transition ${
                  selectedImage === img.image
                    ? "border-blue-600 shadow-sm shadow-blue-100"
                    : "border-slate-200 hover:border-blue-300"
                }`}
              >
                <img
                  src={`http://localhost:3100/uploads/${img.image}`}
                  alt={product.name}
                  className="h-16 w-16 rounded-lg object-cover sm:h-20 sm:w-20"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex min-w-0 flex-col justify-between">
        <div>
          {/* Category */}
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
            {product.category?.name || "Uncategorized"}
          </span>

          {/* Name */}
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {avgRating ? (
              <>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
                  <span>★</span>
                  {avgRating}
                </span>
                <span className="text-sm text-slate-500">
                  {product.reviews?.length ?? 0} reviews
                </span>
              </>
            ) : (
              <span className="text-sm text-slate-400">No reviews yet</span>
            )}
          </div>

          {/* Price */}
          <div className="mt-7 border-y border-slate-100 py-6">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Price
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-blue-700 sm:text-4xl">
              {product.price.toLocaleString()}
              <span className="ml-2 text-base font-semibold text-slate-500">
                MMK
              </span>
            </p>
          </div>

          {/* Stock */}
          <div className="mt-5">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${
                product.stock > 0
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  product.stock > 0 ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </span>
          </div>

          {/* Description */}
          <div className="mt-7">
            <h2 className="text-sm font-semibold text-slate-900">
              Product Description
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
              {product.description || "No description available."}
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <button
            disabled={product.stock === 0}
            onClick={() => {
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image ?? "",
                quantity: 1,
              });

              router.push("/cart");
            }}
            className="w-full rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            {product.stock > 0 ? "Add To Cart" : "Currently Unavailable"}
          </button>
          <p className="mt-3 text-center text-xs text-slate-400">
            Secure and easy checkout
          </p>
        </div>
      </div>

      {/* Image Preview Modal */}
      {isPreviewOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="relative flex max-h-[90vh] max-w-5xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPreviewOpen(false)}
              aria-label="Close image preview"
              className="absolute -right-2 -top-12 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25"
            >
              ×
            </button>

            <img
              src={`http://localhost:3100/uploads/${selectedImage}`}
              alt={product.name}
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
