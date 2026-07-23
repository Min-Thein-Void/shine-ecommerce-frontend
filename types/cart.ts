import { Product } from "@/types/product";

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  cart: CartItem[];
  total: number;
}