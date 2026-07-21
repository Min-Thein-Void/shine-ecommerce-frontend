import { Product } from "./products";

export type ProductResponse = {
  data: Product[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
