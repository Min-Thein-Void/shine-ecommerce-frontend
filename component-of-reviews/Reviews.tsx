import { Review } from "@/types/products";

interface ReviewsProps {
  reviews: Review[];
}

function Reviews({ reviews }: ReviewsProps) {

  return (
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
  );
}

export default Reviews;
