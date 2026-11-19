"use client";
import ProductInfo from "@/component-of-product/ProductInfo";
import Reviews from "@/component-of-reviews/Reviews";
import WriteReview from "@/component-of-reviews/WriteReview";
import { fetchProductReviewById } from "@/services/Review/review.service";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

interface ProductDetailClientProps {
  product: Product;
}

const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchProductReviewHandler = async (id: number) => {
    const data = await fetchProductReviewById(id);
    setReviews(data);
  };

  useEffect(() => {
    fetchProductReviewHandler(Number(product.id));
  }, [product.id]);

  return (
    <div className="min-h-screen bg-slate-50/70">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:py-12">
        {/* Product Detail */}
        <ProductInfo product={product} />

        {/* Reviews */}
        <div className="mt-12 border-t border-slate-200 pt-10 sm:mt-16 sm:pt-12">
          <Reviews reviews={reviews} />
        </div>

        {/* Write Review */}
        <WriteReview
          productId={product.id}
          reviews={reviews}
          onSuccess={() => fetchProductReviewHandler(product.id)}
        />
      </div>
    </div>
  );
};

export default ProductDetailClient;
