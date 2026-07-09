export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  categoryId: string;
  image: File | null;
}