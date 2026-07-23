"use client";
import ProductInfo from "@/component-of-product/ProductInfo";
import Reviews from "@/component-of-reviews/Reviews";
import WriteReview from "@/component-of-reviews/WriteReview";
import { fetchProductReviewById } from "@/services/Review/review.service";
import { Product } from "@/types/products";
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
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Product Detail */}
      <ProductInfo product={product} />

      {/* Reviews */}
      <Reviews reviews={reviews} />

      {/* Write Review */}
      <WriteReview
        productId={product.id}
        onSuccess={() => fetchProductReviewHandler(product.id)}
      />
    </div>
  );
};

export default ProductDetailClient;
