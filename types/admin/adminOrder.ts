export interface Product {
  id: number;
  name: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: Product;
}

export interface User {
  id: number;
  name: string | null;
  email: string;
}

export interface Order {
  id: number;
  total: number;
  phone: string;
  address: string;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  user: User;
  items: OrderItem[];
}