export const fetchProductReviewById = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3100/reviews/product/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await res.json();

      return data;
    } catch (err) {
      console.error(err);
    }
  };