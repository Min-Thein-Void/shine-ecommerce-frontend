import { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  categoryId: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
}