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
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-12">
        {/* 🖼️ Image */}
        <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
          {product.image ? (
            <img
              src={`http://localhost:3100/uploads/${product.image}`}
              alt={product.name}
              className="w-full h-[420px] object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-[420px] bg-gray-200 flex items-center justify-center rounded-xl">
              No Image
            </div>
          )}
        </div>

        {/* 📦 Info */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Category */}
            <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
              {product.category?.name || "Uncategorized"}
            </span>

            {/* Name */}
            <h1 className="text-3xl font-bold mt-3">{product.name}</h1>

            {/* Rating */}
            {avgRating && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500">⭐ {avgRating}</span>
                <span className="text-sm text-gray-400">
                  ({product.reviews.length} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <p className="text-3xl text-blue-600 font-bold mt-4">
              ${product.price}
            </p>

            {/* Stock Badge */}
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                product.stock > 0
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of Stock"}
            </span>

            {/* Description */}
            <p className="text-gray-600 mt-5 leading-relaxed">
              {product.description || "No description available."}
            </p>
          </div>

          {/* 🛒 Actions */}
          <div className="mt-8 space-y-4">
            {/* Buttons */}
            <div className="flex gap-4">
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
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ⭐ Reviews */}
      <div className="mt-14">
        <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>

        {reviews?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {reviews.map((review: any) => (
              <div
                key={review.id}
                className="bg-white border rounded-xl p-4 shadow-sm hover:shadow transition"
              >
                <div className="flex space-x-1 items-center">
                  <p className="text-xl text-blue-500">{review.user?.name}</p>
                  <div className="opacity-55">
                    {review.rating === 1 && (
                      <p className="text-yellow-500 font-medium">⭐</p>
                    )}
                    {review.rating === 2 && (
                      <p className="text-yellow-500 font-medium">⭐⭐</p>
                    )}
                    {review.rating === 3 && (
                      <p className="text-yellow-500 font-medium">⭐⭐⭐</p>
                    )}
                    {review.rating === 4 && (
                      <p className="text-yellow-500 font-medium">⭐⭐⭐⭐</p>
                    )}
                    {review.rating === 5 && (
                      <p className="text-yellow-500 font-medium">⭐⭐⭐⭐⭐</p>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mt-2 capitalize">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No reviews yet.</p>
        )}
      </div>
      {/* ✍️ Write Review */}
      <div className="mt-10 bg-white border rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold text-lg mb-3">Write a Review</h3>

        {/* ⭐ Rating Select */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createReview(Number(product.id));
          }}
        >
          {/* ⭐ Rating */}
          <div className="mb-3">
            <label className="block text-sm mb-1">Rating</label>
            <select
              onChange={(e) => {
                const value = e.target.value;
                setRating(value ? Number(value) : null);
              }}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select rating</option>
              <option value="5">⭐⭐⭐⭐⭐ (5)</option>
              <option value="4">⭐⭐⭐⭐ (4)</option>
              <option value="3">⭐⭐⭐ (3)</option>
              <option value="2">⭐⭐ (2)</option>
              <option value="1">⭐ (1)</option>
            </select>
          </div>

          {/* 💬 Comment */}
          <div className="mb-4">
            <label className="block text-sm mb-1">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 h-24"
            />
          </div>

          {/* 🚀 Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            {loading ? "Posting..." : "Post Review"}
          </button>
          <p className="text-amber-700">{message}</p>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailClient;
