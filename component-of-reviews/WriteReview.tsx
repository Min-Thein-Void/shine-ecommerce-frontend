"use client";

import { useAuthStore } from "@/globalStates/useAuthStore";
import { Review } from "@/types/product";
import { useState } from "react";

interface WriteReviewProps {
  productId: number;
  reviews: Review[];
  onSuccess: () => void;
}

function WriteReview({ productId, reviews, onSuccess }: WriteReviewProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);

  const user = useAuthStore((state) => state.User);

  // Check whether current user already reviewed this product
  const alreadyReviewed =
    !!user &&
    reviews?.some((review) => Number(review.user?.id) === Number(user.id));

  // Hide form if user already reviewed
  if (alreadyReviewed || hasReviewed) {
  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          ✓
        </div>

        <div>
          <h3 className="text-sm font-bold text-emerald-800 sm:text-base">
            You've already reviewed this product!
          </h3>

          <p className="mt-1 text-sm leading-6 text-emerald-700">
            Thank you for sharing your experience. We appreciate your feedback!
          </p>
        </div>
      </div>
    </section>
  );
}

  const createReview = async () => {
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

        body: JSON.stringify({
          rating,
          comment,
          productId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to post review");
      }

      setMessage("✅ Review posted");
      setHasReviewed(true);
      setRating(null);
      setComment("");

      // tell parent to refresh reviews
      onSuccess();
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
      {/* Heading */}
      <div>
        <h3 className="text-xl font-bold tracking-tight text-slate-900">
          Write a Review
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Share your experience with this product.
        </p>
      </div>

      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          createReview();
        }}
      >
        {/* Rating */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Your Rating
          </label>

          <select
            value={rating ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              setRating(value ? Number(value) : null);
            }}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          >
            <option value="">Select rating</option>
            <option value="5">⭐⭐⭐⭐⭐ (5 - Excellent)</option>
            <option value="4">⭐⭐⭐⭐ (4 - Very Good)</option>
            <option value="3">⭐⭐⭐ (3 - Good)</option>
            <option value="2">⭐⭐ (2 - Fair)</option>
            <option value="1">⭐ (1 - Poor)</option>
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Your Comment
          </label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className="min-h-32 w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Review"}
        </button>

        {/* Message */}
        {message && (
          <p className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-600">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}

export default WriteReview;
