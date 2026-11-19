import { Review } from "@/types/product";

interface ReviewsProps {
  reviews: Review[];
}

function Reviews({ reviews }: ReviewsProps) {
  return (
    <section className="mt-12 sm:mt-16">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Customer Reviews
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          See what customers think about this product.
        </p>
      </div>

      {reviews?.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:gap-5 mb-2">
          {reviews.map((review: any) => (
            <div
              key={review.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:border-blue-100 hover:shadow-md sm:p-5"
            >
              {/* Customer & Rating */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                    {review.user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-800">
                      {review.user?.name || "Customer"}
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Verified customer
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600">
                  {"★".repeat(Number(review.rating))}
                  <span className="ml-1 text-amber-700">{review.rating}/5</span>
                </span>
              </div>

              {/* Comment */}
              <div className="mt-4 border-t border-slate-100 pt-4">
                <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center mb-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-xl text-slate-400">
            ★
          </div>

          <h3 className="mt-3 text-sm font-semibold text-slate-700">
            No reviews yet
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Be the first to share your experience with this product.
          </p>
        </div>
      )}
    </section>
  );
}

export default Reviews;
