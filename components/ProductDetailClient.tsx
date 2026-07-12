"use client";
import { useCartStore } from "@/globalStates/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductDetailClient = ({ product }: any) => {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  const avgRating =
    product.reviews?.length > 0
      ? (
          product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
          product.reviews.length
        ).toFixed(1)
      : null;

  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const createReview = async (productId: number) => {
    if (!rating || rating < 1 || rating > 5) {
      setMessage("Rating must be between 1 and 5");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const res = await fetch("http://localhost:3100/reviews/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ rating, comment, productId }),
      });

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to post review");
      }

      setMessage("✅ Review posted");
      await fetchProductReviewById(productId);
      setRating(null);
      setComment("");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductReviewById = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3100/reviews/product/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await res.json();

      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductReviewById(Number(product.id));
  }, [product.id]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Product Detail */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          {product.image ? (
            <img
              src={`http://localhost:3100/uploads/${product.image}`}
              alt={product.name}
              className="h-[520px] w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-[520px] items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
              No Image
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
                  {product.reviews.length} reviews
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
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"}
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
                  image: product.image,
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
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>

          <p className="mt-1 text-sm text-gray-500">
            See what customers think about this product.
          </p>
        </div>

        {reviews?.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {reviews.map((review: any) => (
              <div
                key={review.id}
                className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:shadow-md
              "
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {review.user?.name}
                  </h3>

                  <span className="text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </span>
                </div>

                <p className="mt-3 text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center text-gray-400">
            No reviews yet.
          </div>
        )}
      </section>

      {/* Write Review */}
      <section className="mt-12 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900">Write a Review</h3>

        <form
          className="mt-6 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            createReview(Number(product.id));
          }}
        >
          {/* Rating */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Rating
            </label>

            <select
              onChange={(e) => {
                const value = e.target.value;
                setRating(value ? Number(value) : null);
              }}
              className="
              h-12
              w-full
              rounded-xl
              border
              border-gray-200
              px-4
              text-sm
              focus:border-black
              focus:outline-none
              focus:ring-4
              focus:ring-gray-100
            "
            >
              <option value="">Select rating</option>
              <option value="5">⭐⭐⭐⭐⭐ (5)</option>
              <option value="4">⭐⭐⭐⭐ (4)</option>
              <option value="3">⭐⭐⭐ (3)</option>
              <option value="2">⭐⭐ (2)</option>
              <option value="1">⭐ (1)</option>
            </select>
          </div>

          {/* Comment */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Comment
            </label>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="
              h-32
              w-full
              resize-none
              rounded-xl
              border
              border-gray-200
              px-4
              py-3
              text-sm
              focus:border-black
              focus:outline-none
              focus:ring-4
              focus:ring-gray-100
            "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            rounded-xl
            bg-black
            py-3.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-gray-800
            disabled:opacity-50
          "
          >
            {loading ? "Posting..." : "Post Review"}
          </button>

          {message && <p className="text-sm text-red-500">{message}</p>}
        </form>
      </section>
    </div>
  );
};

export default ProductDetailClient;
