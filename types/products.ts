export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
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

  price: number;
  stock: number;

  categoryId: number;

  category: Category | null;

  reviews?: Review[];

  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;
};
