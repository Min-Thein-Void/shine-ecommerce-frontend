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
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Image Section */}
      <div>
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          {selectedImage ? (
            <img
              src={`http://localhost:3100/uploads/${selectedImage}`}
              alt={product.name}
              onClick={() => setIsPreviewOpen(true)}
              className="
    h-130
    w-full
    cursor-pointer
    rounded-2xl
    object-cover
    transition
    hover:scale-[1.02]
  "
            />
          ) : (
            <div className="flex h-130 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {product.images && product.images.length > 1 && (
          <div className="mt-5 flex gap-3 overflow-x-auto">
            {product.images.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img.image)}
                className="shrink-0"
              >
                <img
                  src={`http://localhost:3100/uploads/${img.image}`}
                  alt={product.name}
                  className={`
              h-20
              w-20
              rounded-xl
              object-cover
              border
              ${
                selectedImage === img.image ? "border-black" : "border-gray-200"
              }
            `}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Information */}
      <div className="flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="inline-flex rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold text-gray-700">
            {product.category?.name || "Uncategorized"}
          </span>

          {/* Name */}
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>

          {/* Rating */}
          {avgRating && (
            <div className="mt-4 flex items-center gap-3">
              <span className="rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-600">
                ⭐ {avgRating}
              </span>

              <span className="text-sm text-gray-500">
                {product.reviews?.length ?? 0} reviews
              </span>
            </div>
          )}

          {/* Price */}
          <p className="mt-8 text-4xl font-bold text-gray-900">
            {product.price.toLocaleString()} MMK
          </p>

          {/* Stock */}
          <span
            className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
              product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
          </span>

          {/* Description */}
          <p className="mt-8 leading-7 text-gray-600">
            {product.description || "No description available."}
          </p>
        </div>

        {/* Action */}
        <div className="mt-10">
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
            className="
              w-full
              rounded-2xl
              bg-black
              py-4
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-gray-800
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Add To Cart
          </button>
        </div>
      </div>
      {isPreviewOpen && selectedImage && (
        <div
          className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/80
      p-5
    "
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="
        relative
        max-h-[90vh]
        max-w-5xl
      "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="
          absolute
          right-0
          top-0
          z-10
          -translate-y-12
          text-3xl
          text-white
        "
            >
              ×
            </button>

            <img
              src={`http://localhost:3100/uploads/${selectedImage}`}
              alt={product.name}
              className="
          max-h-[85vh]
          rounded-2xl
          object-contain
        "
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
