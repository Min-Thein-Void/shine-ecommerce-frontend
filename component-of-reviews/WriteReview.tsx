"use client";

import { useState } from "react";

interface WriteReviewProps {
  productId: number;
  onSuccess: () => void;
}

function WriteReview({ productId, onSuccess }: WriteReviewProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    <section
      className="
      mt-12
      rounded-3xl
      border
      border-gray-200
      bg-white
      p-6
      shadow-sm
    "
    >
      <h3 className="text-xl font-bold text-gray-900">Write a Review</h3>

      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          createReview();
        }}
      >
        {/* Rating */}
        <div>
          <label
            className="
            mb-2
            block
            text-sm
            font-semibold
            text-gray-700
          "
          >
            Rating
          </label>

          <select
            value={rating ?? ""}
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
          <label
            className="
            mb-2
            block
            text-sm
            font-semibold
            text-gray-700
          "
          >
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
  );
}

export default WriteReview;
