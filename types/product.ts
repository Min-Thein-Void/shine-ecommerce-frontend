import { Category } from "./category";

export type ProductImage = {
  id: number;
  image: string;
  productId: number;
};

export type Review = {
  id: number;
  rating: number;
  comment?: string;
};

export type Product = {
  id: number;
  name: string;
  description: string | null;
  image: string | null;

  images?: ProductImage[];

  price: number;
  stock: number;

  categoryId: number;

  category: Category | null;

  reviews?: Review[];

  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;
};
